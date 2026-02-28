// @ts-nocheck
// This file was auto-created and injected by v0.
// DO NOT MODIFY THIS FILE DIRECTLY.
// EDIT THE USER CONFIG IN ./next.user-config.ts INSTEAD.

import userConfigImport from './next.user-config.ts'
import { fileURLToPath } from 'url'
import path from 'path'

export default async function v0NextConfig(phase, { defaultConfig }) {
  const userConfig = typeof userConfigImport === 'function'
    ? await userConfigImport(phase, { defaultConfig })
    : userConfigImport

  return {
    ...userConfig,
    distDir: '.next',  // Explicitly set build directory for Turbopack
    devIndicators: false,
    logging: {
      fetches: {
        fullUrl: true,
        hmrRefreshes: true,
      },
    },
    experimental: {
      ...userConfig.experimental,
      transitionIndicator: true,
      browserDebugInfoInTerminal: {
        depthLimit: 100,
        edgeLimit: 100,
        showSourceLocation: true,
      },
      serverActions: {
        ...userConfig.experimental?.serverActions,
        allowedOrigins: [
          ...(userConfig.experimental?.serverActions?.allowedOrigins || []),
          '*.vusercontent.net',
        ]
      },
    },
    allowedDevOrigins: [
      ...(userConfig.allowedDevOrigins || []),
      '*.vusercontent.net',
      '*.dev-vm.vusercontent.net',
    ],
  }
}
