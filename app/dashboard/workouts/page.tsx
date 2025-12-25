import { cacheLife } from 'next/cache';
import WorkoutsPageClient from '@/components/Dashboard/WorkoutsPageClient';
import { fetchWorkouts } from '@/lib/sheets';

export default async function WorkoutsPage() {
  'use cache';
  cacheLife('hours');

  try {
    const workouts = await fetchWorkouts();

    return <WorkoutsPageClient workouts={workouts || []} />;
  } catch (error) {
    console.error('Workouts page error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Workout Data</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load workout data'}
          </p>
        </div>
      </div>
    );
  }
}
