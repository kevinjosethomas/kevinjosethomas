'use client';

import { useState } from 'react';
import { Moon, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import SleepDurationChart from '@/components/Dashboard/Sleep/SleepDurationChart';
import SleepScoreChart from '@/components/Dashboard/Sleep/SleepScoreChart';
import SleepStagesChart from '@/components/Dashboard/Sleep/SleepStagesChart';
import type { SleepData } from '@/lib/sheets';
import { calculateSleepStats, filterByDays } from '@/lib/dashboard/stats';

interface SleepPageClientProps {
  sleepData: SleepData[];
}

export default function SleepPageClient({ sleepData }: SleepPageClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  const filteredData = filterByDays(sleepData, selectedDays);
  const stats = calculateSleepStats(filteredData);

  // Calculate average core sleep (total - rem - deep)
  const avgCore = filteredData.length > 0
    ? filteredData.reduce((sum, d) => {
        const core = d.time - d.rem - d.deep;
        return sum + (core > 0 ? (core / d.time) * 100 : 0);
      }, 0) / filteredData.length
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sleep Analytics</h1>
          <p className="text-[#aaaaaa]">Comprehensive insights into your sleep patterns</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Average Duration"
          value={`${(stats.avgDuration || 0).toFixed(1)}h`}
          icon={Moon}
          subtitle={`Across ${stats.totalNights || 0} nights`}
        />

        <StatCard
          title="Average Score"
          value={(stats.avgScore || 0).toFixed(0)}
          icon={TrendingUp}
          subtitle="Sleep quality rating"
        />

        <StatCard
          title="REM Sleep"
          value={`${(stats.avgRem || 0).toFixed(0)}%`}
          icon={PieChartIcon}
          subtitle="Average percentage"
        />

        <StatCard
          title="Deep Sleep"
          value={`${(stats.avgDeep || 0).toFixed(0)}%`}
          icon={PieChartIcon}
          subtitle="Average percentage"
        />
      </div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Duration and Score Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SleepDurationChart data={filteredData} />
          <SleepScoreChart data={filteredData} />
        </div>

        {/* Sleep Stages */}
        <SleepStagesChart
          avgRem={stats.avgRem || 0}
          avgDeep={stats.avgDeep || 0}
          avgCore={avgCore || 0}
        />
      </div>
    </div>
  );
}
