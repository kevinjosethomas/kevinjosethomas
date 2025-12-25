import { cacheLife } from 'next/cache';
import SleepPageClient from '@/components/Dashboard/SleepPageClient';
import { fetchBothSheets } from '@/lib/sheets';

export default async function SleepPage() {
  'use cache';
  cacheLife('hours');

  try {
    const sheetsData = await fetchBothSheets();
    const sleepData = sheetsData?.sleepData || [];

    return <SleepPageClient sleepData={sleepData} />;
  } catch (error) {
    console.error('Sleep page error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Sleep Data</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load sleep data'}
          </p>
        </div>
      </div>
    );
  }
}
