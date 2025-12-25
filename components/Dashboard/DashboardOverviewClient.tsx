'use client';

import { useState } from 'react';
import { Activity, Moon, Briefcase, Dumbbell, DollarSign, Smartphone, Star } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import DailyScoreChart from '@/components/Dashboard/DailyScoreChart';
import RatingDistributionChart from '@/components/Dashboard/RatingDistributionChart';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import type { SleepData, OverviewData, WorkSessionData, WorkoutData, MoneyData, ScreenTimeData } from '@/lib/sheets';
import {
  calculateSleepStats,
  calculateWorkStats,
  calculateWorkoutStats,
  calculateMoneyStats,
  calculateScreenTimeStats,
  calculateOverallStats,
  formatCurrency,
  formatDuration,
  filterByDays,
} from '@/lib/dashboard/stats';

interface DashboardOverviewClientProps {
  sleepData: SleepData[];
  overviewData: OverviewData[];
  workSessions: WorkSessionData[];
  workouts: WorkoutData[];
  transactions: MoneyData[];
  screenTime: ScreenTimeData[];
}

export default function DashboardOverviewClient({
  sleepData,
  overviewData,
  workSessions,
  workouts,
  transactions,
  screenTime,
}: DashboardOverviewClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  // Filter data based on selected time range
  const recentOverview = filterByDays(overviewData, selectedDays);
  const recentSleep = filterByDays(sleepData, selectedDays);
  const recentWork = filterByDays(workSessions, selectedDays);
  const recentWorkouts = filterByDays(workouts, selectedDays);
  const recentMoney = filterByDays(transactions, selectedDays);
  const recentScreen = filterByDays(screenTime, selectedDays);

  // Calculate statistics
  const overallStats = calculateOverallStats(recentOverview);
  const sleepStats = calculateSleepStats(recentSleep);
  const workStats = calculateWorkStats(recentWork);
  const workoutStats = calculateWorkoutStats(recentWorkouts);
  const moneyStats = calculateMoneyStats(recentMoney);
  const screenStats = calculateScreenTimeStats(recentScreen);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
          <p className="text-[#aaaaaa]">Your comprehensive analytics</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Average Daily Score"
          value={overallStats.avgScore.toFixed(1)}
          icon={Star}
          subtitle={`Across ${overallStats.totalDays} days`}
        />

        <StatCard
          title="Sleep Hours"
          value={sleepStats.avgHours.toFixed(1)}
          icon={Moon}
          subtitle="Average per night"
        />

        <StatCard
          title="Work Hours"
          value={(workStats.totalHours || 0).toFixed(1)}
          icon={Briefcase}
          subtitle="Total hours logged"
        />

        <StatCard
          title="Workouts"
          value={workoutStats.totalWorkouts || 0}
          icon={Dumbbell}
          subtitle={`${(workoutStats.totalCalories || 0).toFixed(0)}k calories burned`}
        />

        <StatCard
          title="Total Spending"
          value={formatCurrency(moneyStats.totalSpent || 0)}
          icon={DollarSign}
          subtitle={`${moneyStats.totalTransactions || 0} transactions`}
        />

        <StatCard
          title="Screen Time"
          value={formatDuration(screenStats.totalHours || 0)}
          icon={Smartphone}
          subtitle="Average per day"
        />

        <StatCard
          title="Most Productive"
          value={workStats.mostProductiveSubject}
          icon={Activity}
          subtitle={
            workStats.mostProductiveSubject !== 'N/A' &&
            typeof workStats.subjectHours[workStats.mostProductiveSubject] === 'number'
              ? `${workStats.subjectHours[workStats.mostProductiveSubject].toFixed(1)}h total`
              : 'No data'
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DailyScoreChart data={recentOverview} />
        <RatingDistributionChart distribution={overallStats.ratingDistribution} />
      </div>

      {/* Recent Activity */}
      <RecentActivity
        sleepData={recentSleep}
        workData={recentWork}
        workouts={recentWorkouts}
        transactions={recentMoney}
      />
    </div>
  );
}
