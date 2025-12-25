'use client';

import { useState } from 'react';
import { Smartphone, Clock, Wifi, Zap } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import type { ScreenTimeData } from '@/lib/sheets';
import { calculateScreenTimeStats, filterByDays, formatDuration } from '@/lib/dashboard/stats';

interface ScreenTimePageClientProps {
  screenTime: ScreenTimeData[];
}

export default function ScreenTimePageClient({ screenTime }: ScreenTimePageClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  const filteredData = filterByDays(screenTime, selectedDays);
  const stats = calculateScreenTimeStats(filteredData);

  const topCategory = Object.entries(stats.categoryTime || {}).sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Screen Time Analytics</h1>
          <p className="text-[#aaaaaa]">Understand your digital habits and app usage</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Screen Time"
          value={formatDuration(stats.totalMinutes || 0)}
          icon={Smartphone}
          subtitle={`Last ${selectedDays === 10000 ? 'all time' : selectedDays + ' days'}`}
        />

        <StatCard
          title="Daily Average"
          value={formatDuration(stats.avgPerDay || 0)}
          icon={Clock}
          subtitle="Average per day"
        />

        <StatCard
          title="Most Used App"
          value={(stats.topApps || [])[0]?.[0] || 'N/A'}
          icon={Zap}
          subtitle={formatDuration((stats.topApps || [])[0]?.[1] || 0)}
        />

        <StatCard
          title="Top Category"
          value={topCategory?.[0] || 'N/A'}
          icon={Wifi}
          subtitle={formatDuration(topCategory?.[1] || 0)}
        />
      </div>

      {/* Charts Coming Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border border-[#1f1f1f] rounded-lg">
          <h4 className="text-white font-semibold mb-4">Top Apps</h4>
          <div className="space-y-3">
            {(stats.topApps || []).slice(0, 10).map(([app, minutes]) => (
              <div key={app} className="flex justify-between items-center">
                <span className="text-sm text-[#aaaaaa] truncate">{app}</span>
                <span className="text-sm text-white font-medium ml-4">{formatDuration(minutes)}</span>
              </div>
            ))}
            {(stats.topApps || []).length === 0 && (
              <p className="text-sm text-[#aaaaaa]">No data available</p>
            )}
          </div>
        </div>

        <div className="p-6 border border-[#1f1f1f] rounded-lg">
          <h4 className="text-white font-semibold mb-4">Time by Category</h4>
          <div className="space-y-3">
            {Object.entries(stats.categoryTime || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([category, minutes]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-[#aaaaaa]">{category}</span>
                  <span className="text-sm text-white font-medium">{formatDuration(minutes)}</span>
                </div>
              ))}
            {Object.keys(stats.categoryTime || {}).length === 0 && (
              <p className="text-sm text-[#aaaaaa]">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
