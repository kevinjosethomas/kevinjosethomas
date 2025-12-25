import { cacheLife } from 'next/cache';
import DashboardOverviewClient from '@/components/Dashboard/DashboardOverviewClient';
import {
  fetchBothSheets,
  fetchWorkSessions,
  fetchWorkouts,
  fetchMoney,
  fetchScreenTime,
} from '@/lib/sheets';

export default async function DashboardOverview() {
  'use cache';
  cacheLife('hours');

  try {
    // Fetch all data in parallel
    const [
      sheetsData,
      workSessions,
      workouts,
      transactions,
      screenTime,
    ] = await Promise.all([
      fetchBothSheets(),
      fetchWorkSessions(),
      fetchWorkouts(),
      fetchMoney(),
      fetchScreenTime(),
    ]);

    // Safely extract sleep and overview data
    const sleepData = sheetsData?.sleepData || [];
    const overviewData = sheetsData?.overviewData || [];

    return (
      <DashboardOverviewClient
        sleepData={sleepData}
        overviewData={overviewData}
        workSessions={workSessions || []}
        workouts={workouts || []}
        transactions={transactions || []}
        screenTime={screenTime || []}
      />
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load dashboard data'}
          </p>
          <p className="text-sm text-[#aaaaaa] mt-4">
            Check your environment variables and Google Sheets configuration.
          </p>
        </div>
      </div>
    );
  }
}
