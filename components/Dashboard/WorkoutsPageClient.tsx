'use client';

import { useState } from 'react';
import { Dumbbell, Flame, Heart, Activity } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import type { WorkoutData } from '@/lib/sheets';
import { calculateWorkoutStats, filterByDays, formatNumber } from '@/lib/dashboard/stats';

interface WorkoutsPageClientProps {
  workouts: WorkoutData[];
}

export default function WorkoutsPageClient({ workouts }: WorkoutsPageClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  const filteredData = filterByDays(workouts, selectedDays);
  const stats = calculateWorkoutStats(filteredData);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workout Analytics</h1>
          <p className="text-[#aaaaaa]">Track your fitness progress and activity</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Workouts"
          value={formatNumber(stats.totalWorkouts || 0)}
          icon={Dumbbell}
          subtitle={`Last ${selectedDays === 10000 ? 'all time' : selectedDays + ' days'}`}
        />

        <StatCard
          title="Total Calories"
          value={formatNumber(stats.totalCalories || 0)}
          icon={Flame}
          subtitle="Calories burned"
        />

        <StatCard
          title="Avg Heart Rate"
          value={(stats.avgHeartRate || 0).toFixed(0)}
          icon={Heart}
          subtitle="BPM"
        />

        <StatCard
          title="Most Common"
          value={stats.mostCommonType || 'N/A'}
          icon={Activity}
          subtitle="Workout type"
        />
      </div>

      {/* Charts Coming Soon */}
      <div className="p-6 border border-[#1f1f1f] rounded-lg">
        <p className="text-[#aaaaaa]">Detailed charts coming soon...</p>
        {Object.keys(stats.typeCounts || {}).length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">Workouts by Type:</h4>
            <div className="space-y-2">
              {Object.entries(stats.typeCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-[#aaaaaa]">{type}</span>
                    <span className="text-white font-medium">{count} sessions</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
