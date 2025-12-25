'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { CHART_COLORS } from '@/lib/colors';

interface RatingDistributionChartProps {
  distribution: Record<number, number>;
}

export default function RatingDistributionChart({ distribution }: RatingDistributionChartProps) {
  const chartData = Object.entries(distribution)
    .map(([rating, count]) => ({
      name: `${rating} Star${rating === '1' ? '' : 's'}`,
      value: count,
      rating: Number(rating),
    }))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Rating Distribution</h3>
        <p className="text-sm text-[#aaaaaa]">Breakdown of daily ratings</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
          />
          <Legend
            wrapperStyle={{ color: '#aaaaaa' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
