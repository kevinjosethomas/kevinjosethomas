'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { SleepData } from '@/lib/sheets';

interface SleepScoreChartProps {
  data: SleepData[];
}

export default function SleepScoreChart({ data }: SleepScoreChartProps) {
  const chartData = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: d.score,
  }));

  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Sleep Score Trends</h3>
        <p className="text-sm text-[#aaaaaa]">Quality ratings over time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000',
              border: '1px solid #1f1f1f',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [value.toFixed(0), 'Score']}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
