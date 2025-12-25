'use client';

import { useState } from 'react';
import { Briefcase, Clock, Target } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import type { WorkSessionData } from '@/lib/sheets';
import { calculateWorkStats, filterByDays, formatNumber } from '@/lib/dashboard/stats';

interface WorkPageClientProps {
  workSessions: WorkSessionData[];
}

export default function WorkPageClient({ workSessions }: WorkPageClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  const filteredData = filterByDays(workSessions, selectedDays);
  const stats = calculateWorkStats(filteredData);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Work Analytics</h1>
          <p className="text-[#aaaaaa]">Insights into your productivity and work patterns</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Hours"
          value={(stats.totalHours || 0).toFixed(1)}
          icon={Clock}
          subtitle={`Last ${selectedDays === 10000 ? 'all time' : selectedDays + ' days'}`}
        />

        <StatCard
          title="Avg Hours/Day"
          value={(stats.avgHoursPerDay || 0).toFixed(1)}
          icon={Briefcase}
          subtitle="Daily average"
        />

        <StatCard
          title="Total Sessions"
          value={formatNumber(stats.totalSessions || 0)}
          icon={Target}
          subtitle="Work sessions"
        />

        <StatCard
          title="Most Productive"
          value={stats.mostProductiveSubject || 'N/A'}
          icon={Briefcase}
          subtitle={
            stats.mostProductiveSubject !== 'N/A' &&
            typeof stats.subjectHours[stats.mostProductiveSubject] === 'number'
              ? `${stats.subjectHours[stats.mostProductiveSubject].toFixed(1)}h total`
              : 'No data'
          }
        />
      </div>

      {/* Charts Coming Soon */}
      <div className="p-6 border border-[#1f1f1f] rounded-lg">
        <p className="text-[#aaaaaa]">Detailed charts coming soon...</p>
        {Object.keys(stats.subjectHours || {}).length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">Hours by Subject:</h4>
            <div className="space-y-2">
              {Object.entries(stats.subjectHours)
                .sort(([, a], [, b]) => b - a)
                .map(([subject, hours]) => (
                  <div key={subject} className="flex justify-between text-sm">
                    <span className="text-[#aaaaaa]">{subject}</span>
                    <span className="text-white font-medium">{(hours || 0).toFixed(1)}h</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
