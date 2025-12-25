import { kv } from "@vercel/kv";

// Types for our KV storage
export interface NoteEmbedding {
  date: string;
  note: string;
  embedding: number[];
  overallScore?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// Keys structure:
// embeddings:notes - Set of all note dates
// embedding:{date} - Individual note embedding
// chat:history - List of chat messages (most recent first)

/**
 * Store a note embedding
 */
export async function storeNoteEmbedding(embedding: NoteEmbedding) {
  const key = `embedding:${embedding.date}`;

  // Store the embedding
  await kv.set(key, embedding);

  // Add to the set of all note dates for easy retrieval
  await kv.sadd("embeddings:notes", embedding.date);

  return true;
}

/**
 * Get a specific note embedding by date
 */
export async function getNoteEmbedding(
  date: string,
): Promise<NoteEmbedding | null> {
  return await kv.get<NoteEmbedding>(`embedding:${date}`);
}

/**
 * Get all note embeddings
 */
export async function getAllNoteEmbeddings(): Promise<NoteEmbedding[]> {
  const dates = await kv.smembers("embeddings:notes");

  if (!dates || dates.length === 0) {
    return [];
  }

  const embeddings = await Promise.all(
    dates.map((date) => getNoteEmbedding(date as string)),
  );

  return embeddings.filter((e): e is NoteEmbedding => e !== null);
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search for similar notes based on query embedding
 */
export async function searchSimilarNotes(
  queryEmbedding: number[],
  limit: number = 10,
  minSimilarity: number = 0.5,
): Promise<Array<NoteEmbedding & { similarity: number }>> {
  const allEmbeddings = await getAllNoteEmbeddings();

  const results = allEmbeddings
    .map((embedding) => ({
      ...embedding,
      similarity: cosineSimilarity(queryEmbedding, embedding.embedding),
    }))
    .filter((result) => result.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return results;
}

/**
 * Store a chat message
 */
export async function storeChatMessage(message: ChatMessage) {
  // Store as JSON in a list, limited to last 100 messages
  await kv.lpush("chat:history", JSON.stringify(message));
  await kv.ltrim("chat:history", 0, 99); // Keep only last 100 messages

  return true;
}

/**
 * Get chat history
 */
export async function getChatHistory(
  limit: number = 50,
): Promise<ChatMessage[]> {
  const messages = await kv.lrange("chat:history", 0, limit - 1);

  if (!messages || messages.length === 0) {
    return [];
  }

  return messages
    .map((msg) => {
      try {
        return JSON.parse(msg as string) as ChatMessage;
      } catch {
        return null;
      }
    })
    .filter((msg): msg is ChatMessage => msg !== null)
    .reverse(); // Reverse to get chronological order
}

/**
 * Clear all chat history
 */
export async function clearChatHistory() {
  await kv.del("chat:history");
  return true;
}

/**
 * Check if embeddings exist
 */
export async function hasEmbeddings(): Promise<boolean> {
  const count = await kv.scard("embeddings:notes");
  return (count ?? 0) > 0;
}

/**
 * Get embeddings count
 */
export async function getEmbeddingsCount(): Promise<number> {
  return (await kv.scard("embeddings:notes")) ?? 0;
}
