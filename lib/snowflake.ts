import snowflake from 'snowflake-sdk'
import fs from 'fs'
import { connection as nextConnection } from 'next/server'

// Suppress verbose SDK logging
snowflake.configure({ logLevel: 'WARN' })

/**
 * Read the OAuth token from the file system.
 * This token is automatically rotated by Snowflake so it's always valid.
 * ONLY works on the server — fs is not available in the browser.
 */
function getToken(): string {
  const tokenPath =
    process.env.NODE_ENV === 'production'
      ? '/snowflake/session/token'
      : '.snowflake/session/token'
  return fs.readFileSync(tokenPath, 'utf-8').trim()
}

/**
 * Parse the account identifier from the SNOWFLAKE_ACCOUNT_URL env var.
 * The SDK needs an account string (e.g., "org-account"), not the full URL.
 */
function getAccount(): string {
  const url = process.env.SNOWFLAKE_ACCOUNT_URL || ''
  // URL format: https://<org>-<account>.snowflakecomputing.com
  const match = url.match(
    /https:\/\/([^.]+(?:\.[^.]+)*?)\.snowflakecomputing\.com/,
  )
  if (match) return match[1]
  return url.replace('https://', '').replace('.snowflakecomputing.com', '')
}

/**
 * Create a Snowflake connection using the SDK with OAuth authentication.
 */
function createConnection(): snowflake.Connection {
  return snowflake.createConnection({
    account: getAccount(),
    authenticator: 'OAUTH',
    token: getToken(),
    warehouse: process.env.SNOWFLAKE_WAREHOUSE || '',
  })
}

/** Promisified connect */
function connectAsync(
  conn: snowflake.Connection,
): Promise<snowflake.Connection> {
  return new Promise((resolve, reject) => {
    conn.connect((err, c) => {
      if (err) reject(new Error(`Snowflake connection error: ${err.message}`))
      else resolve(c)
    })
  })
}

/** Promisified execute — returns rows as keyed objects and column metadata */
function executeAsync(
  conn: snowflake.Connection,
  sqlText: string,
): Promise<{ rows: any[]; columns: snowflake.Column[] }> {
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText,
      complete: (err, stmt, rows) => {
        if (err) reject(new Error(`Snowflake query error: ${err.message}`))
        else resolve({ rows: rows || [], columns: stmt.getColumns() })
      },
    })
  })
}

/** Promisified destroy — cleanly tears down the connection */
function destroyAsync(conn: snowflake.Connection): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.destroy((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

/**
 * Execute a SQL query against Snowflake using the snowflake-sdk connector.
 *
 * Handles the full connection lifecycle: connect -> execute -> destroy.
 * Must be called from server-side code only (RSC, Server Actions, Route Handlers).
 *
 * The SDK returns rows as JavaScript objects with column names as keys,
 * so there's no need to map columns to values manually.
 *
 * @example
 * // Simple query
 * const data = await querySnowflake('SELECT * FROM MY_DB.MY_SCHEMA.MY_TABLE LIMIT 100')
 *
 * @example
 * // Typed query
 * interface Org { NAME: string; REVENUE: number }
 * const orgs = await querySnowflake<Org>('SELECT NAME, REVENUE FROM MY_DB.PUBLIC.ORGS')
 */
export async function querySnowflake<T = Record<string, unknown>>(
  sqlText: string,
): Promise<T[]> {
  // Prevent Next.js from pre-rendering this function.
  // The snowflake token is not available at build time.
  await nextConnection()

  const conn = createConnection()

  try {
    await connectAsync(conn)
    const { rows } = await executeAsync(conn, sqlText)
    return rows as T[]
  } finally {
    try {
      await destroyAsync(conn)
    } catch {
      // Silently handle destroy errors — connection may already be closed
    }
  }
}
