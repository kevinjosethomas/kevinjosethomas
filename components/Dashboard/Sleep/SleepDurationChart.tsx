'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { SleepData } from '@/lib/sheets';

interface SleepDurationChartProps {
  data: SleepData[];
}

export default function SleepDurationChart({ data }: SleepDurationChartProps) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    hours: d.time,
  }));

  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Sleep Duration Trends</h3>
        <p className="text-sm text-[#aaaaaa]">Total hours slept over time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#aaaaaa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#aaaaaa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 12]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000',
              border: '1px solid #1f1f1f',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`${value.toFixed(1)}h`, 'Sleep']}
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorHours)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
