import { cacheLife } from 'next/cache';
import WorkPageClient from '@/components/Dashboard/WorkPageClient';
import { fetchWorkSessions } from '@/lib/sheets';

export default async function WorkPage() {
  'use cache';
  cacheLife('hours');

  try {
    const workSessions = await fetchWorkSessions();

    return <WorkPageClient workSessions={workSessions || []} />;
  } catch (error) {
    console.error('Work page error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Work Data</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load work data'}
          </p>
        </div>
      </div>
    );
  }
}
