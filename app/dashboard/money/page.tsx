import { cacheLife } from 'next/cache';
import MoneyPageClient from '@/components/Dashboard/MoneyPageClient';
import { fetchMoney } from '@/lib/sheets';

export default async function MoneyPage() {
  'use cache';
  cacheLife('hours');

  try {
    const transactions = await fetchMoney();

    return <MoneyPageClient transactions={transactions || []} />;
  } catch (error) {
    console.error('Money page error:', error);
    return (
      <div className="p-8">
        <div className="p-6 border border-red-500 rounded-lg bg-red-500 bg-opacity-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Money Data</h2>
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Failed to load money data'}
          </p>
        </div>
      </div>
    );
  }
}
