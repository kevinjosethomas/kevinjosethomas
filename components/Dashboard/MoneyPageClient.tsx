'use client';

import { useState } from 'react';
import { DollarSign, TrendingDown, CreditCard, ShoppingBag } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import TimeSelector from '@/components/Dashboard/TimeSelector';
import type { MoneyData } from '@/lib/sheets';
import { calculateMoneyStats, filterByDays, formatCurrency, formatNumber } from '@/lib/dashboard/stats';

interface MoneyPageClientProps {
  transactions: MoneyData[];
}

export default function MoneyPageClient({ transactions }: MoneyPageClientProps) {
  const [selectedDays, setSelectedDays] = useState(30);

  const filteredData = filterByDays(transactions, selectedDays);
  const stats = calculateMoneyStats(filteredData);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Money Analytics</h1>
          <p className="text-[#aaaaaa]">Track your spending habits and financial patterns</p>
        </div>
        <TimeSelector selectedDays={selectedDays} onDaysChange={setSelectedDays} />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Spent"
          value={formatCurrency(stats.totalSpent || 0)}
          icon={DollarSign}
          subtitle={`Last ${selectedDays === 10000 ? 'all time' : selectedDays + ' days'}`}
        />

        <StatCard
          title="Avg Transaction"
          value={formatCurrency(stats.avgPerTransaction || 0)}
          icon={TrendingDown}
          subtitle="Average amount"
        />

        <StatCard
          title="Transactions"
          value={formatNumber(stats.totalTransactions || 0)}
          icon={CreditCard}
          subtitle="Total count"
        />

        <StatCard
          title="Top Category"
          value={Object.entries(stats.categorySpending || {}).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'}
          icon={ShoppingBag}
          subtitle={formatCurrency(Object.entries(stats.categorySpending || {}).sort(([, a], [, b]) => b - a)[0]?.[1] || 0)}
        />
      </div>

      {/* Charts Coming Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border border-[#1f1f1f] rounded-lg">
          <h4 className="text-white font-semibold mb-4">Top Merchants</h4>
          <div className="space-y-3">
            {(stats.topMerchants || []).slice(0, 10).map(([merchant, amount]) => (
              <div key={merchant} className="flex justify-between items-center">
                <span className="text-sm text-[#aaaaaa] truncate">{merchant}</span>
                <span className="text-sm text-white font-medium ml-4">{formatCurrency(amount)}</span>
              </div>
            ))}
            {(stats.topMerchants || []).length === 0 && (
              <p className="text-sm text-[#aaaaaa]">No data available</p>
            )}
          </div>
        </div>

        <div className="p-6 border border-[#1f1f1f] rounded-lg">
          <h4 className="text-white font-semibold mb-4">Spending by Category</h4>
          <div className="space-y-3">
            {Object.entries(stats.categorySpending || {})
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-[#aaaaaa]">{category}</span>
                  <span className="text-sm text-white font-medium">{formatCurrency(amount)}</span>
                </div>
              ))}
            {Object.keys(stats.categorySpending || {}).length === 0 && (
              <p className="text-sm text-[#aaaaaa]">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
