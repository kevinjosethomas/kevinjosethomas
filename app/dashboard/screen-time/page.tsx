import { cacheLife } from 'next/cache';
import ScreenTimePageClient from '@/components/Dashboard/ScreenTimePageClient';
import { fetchScreenTime } from '@/lib/sheets';

export default async function ScreenTimePage() {
  'use cache';
  cacheLife('hours');

  try {
    const screenTime = await fetchScreenTime();

    return <ScreenTimePageClient screenTime={screenTime || []} />;
  } catch (error) {
    console.error('Screen time page error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Screen Time Data</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load screen time data'}
          </p>
        </div>
      </div>
    );
  }
}
