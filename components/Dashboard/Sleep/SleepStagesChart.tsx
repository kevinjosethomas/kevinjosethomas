'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { SLEEP_COLORS } from '@/lib/colors';

interface SleepStagesChartProps {
  avgRem: number;
  avgDeep: number;
  avgCore: number;
}

export default function SleepStagesChart({ avgRem, avgDeep, avgCore }: SleepStagesChartProps) {
  const chartData = [
    { name: 'REM Sleep', value: avgRem, color: SLEEP_COLORS.rem },
    { name: 'Deep Sleep', value: avgDeep, color: SLEEP_COLORS.deep },
    { name: 'Core Sleep', value: avgCore, color: SLEEP_COLORS.light },
  ];

  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Sleep Stages Breakdown</h3>
        <p className="text-sm text-[#aaaaaa]">Average distribution across sleep stages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#000',
                border: '1px solid #1f1f1f',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend
              wrapperStyle={{ color: '#aaaaaa' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Stats */}
        <div className="flex flex-col justify-center space-y-4">
          {chartData.map((stage, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-sm text-[#aaaaaa]">{stage.name}</span>
              </div>
              <span className="text-lg font-semibold text-white">
                {stage.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
