'use client';

import { Moon, Briefcase, Dumbbell, DollarSign } from 'lucide-react';
import type { SleepData, WorkSessionData, WorkoutData, MoneyData } from '@/lib/sheets';
import { formatCurrency, formatDuration } from '@/lib/dashboard/stats';

interface RecentActivityProps {
  sleepData: SleepData[];
  workData: WorkSessionData[];
  workouts: WorkoutData[];
  transactions: MoneyData[];
}

type ActivityItem = {
  type: 'sleep' | 'work' | 'workout' | 'transaction';
  date: string;
  description: string;
  icon: any;
  color: string;
};

export default function RecentActivity({
  sleepData,
  workData,
  workouts,
  transactions,
}: RecentActivityProps) {
  // Combine and sort all activities
  const activities: ActivityItem[] = [
    ...sleepData.slice(0, 5).map((s) => ({
      type: 'sleep' as const,
      date: s.date,
      description: `Slept ${typeof s.time === 'number' ? s.time.toFixed(1) : '0.0'}h with score ${s.score || 0}`,
      icon: Moon,
      color: '#6366f1',
    })),
    ...workData.slice(0, 5).map((w) => ({
      type: 'work' as const,
      date: w.date,
      description: `${w.name} (${w.subject}) - ${typeof w.duration === 'number' ? w.duration.toFixed(1) : '0.0'}h`,
      icon: Briefcase,
      color: '#8b5cf6',
    })),
    ...workouts.slice(0, 5).map((w) => ({
      type: 'workout' as const,
      date: w.date,
      description: `${w.type}: ${w.calories} calories`,
      icon: Dumbbell,
      color: '#ec4899',
    })),
    ...transactions.slice(0, 5).map((t) => ({
      type: 'transaction' as const,
      date: t.date,
      description: `${formatCurrency(t.amount)} at ${t.merchant}`,
      icon: DollarSign,
      color: '#10b981',
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Recent Activity</h3>
        <p className="text-sm text-[#aaaaaa]">Latest entries across all categories</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start gap-3 pb-4 border-b border-[#1f1f1f] last:border-0 last:pb-0">
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <Icon size={16} style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{activity.description}</p>
                <p className="text-xs text-[#aaaaaa] mt-1">
                  {new Date(activity.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
