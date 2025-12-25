import { NextResponse } from 'next/server';
import { embed } from 'ai';
import {
  getAllNoteEmbeddings,
  searchSimilarNotes,
  storeNoteEmbedding,
  hasEmbeddings,
} from '@/lib/kv';
import { fetchBothSheets } from '@/lib/sheets';

// Initialize embeddings if they don't exist
async function initializeEmbeddings() {
  const exists = await hasEmbeddings();
  if (exists) return;

  console.log('Initializing note embeddings...');

  const { overviewData } = await fetchBothSheets();

  // Filter for entries with notes
  const entriesWithNotes = overviewData.filter((entry) => entry.r && entry.r.trim().length > 0);

  // Generate embeddings for each note
  for (const entry of entriesWithNotes) {
    try {
      const { embedding } = await embed({
        model: 'openai/text-embedding-3-small',
        value: entry.r,
      });

      await storeNoteEmbedding({
        date: entry.date,
        note: entry.r,
        embedding,
        overallScore: entry.overallScore,
      });

      console.log(`Embedded note for ${entry.date}`);
    } catch (error) {
      console.error(`Failed to embed note for ${entry.date}:`, error);
    }
  }

  console.log('Embeddings initialized!');
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    // Initialize embeddings if needed
    await initializeEmbeddings();

    // Generate embedding for the query
    const { embedding: queryEmbedding } = await embed({
      model: 'openai/text-embedding-3-small',
      value: query,
    });

    // Search for similar notes
    const results = await searchSimilarNotes(queryEmbedding, 10, 0.3);

    return NextResponse.json({
      query,
      results: results.map((result) => ({
        date: result.date,
        note: result.note,
        similarity: result.similarity,
        overallScore: result.overallScore,
      })),
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search notes' },
      { status: 500 }
    );
  }
}

// Endpoint to manually refresh embeddings
export async function POST() {
  try {
    console.log('Refreshing embeddings...');

    const { overviewData } = await fetchBothSheets();
    const entriesWithNotes = overviewData.filter((entry) => entry.r && entry.r.trim().length > 0);

    let updated = 0;
    for (const entry of entriesWithNotes) {
      try {
        const { embedding } = await embed({
          model: 'openai/text-embedding-3-small',
          value: entry.r,
        });

        await storeNoteEmbedding({
          date: entry.date,
          note: entry.r,
          embedding,
          overallScore: entry.overallScore,
        });

        updated++;
      } catch (error) {
        console.error(`Failed to embed note for ${entry.date}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updated} note embeddings`,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh embeddings' },
      { status: 500 }
    );
  }
}
