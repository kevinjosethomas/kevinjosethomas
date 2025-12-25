'use client';

import { useState } from 'react';
import { Search, Loader2, RefreshCw } from 'lucide-react';

interface SearchResult {
  date: string;
  note: string;
  similarity: number;
  overallScore?: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        console.error('Search failed:', data.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshEmbeddings = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/dashboard/search', { method: 'POST' });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert('Failed to refresh embeddings');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      alert('Failed to refresh embeddings');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Semantic Search</h1>
          <p className="text-[#aaaaaa]">Search through your daily notes using natural language</p>
        </div>
        <button
          onClick={handleRefreshEmbeddings}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh Embeddings'}
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your notes... (e.g., 'days I felt productive' or 'when did I exercise')"
            className="w-full px-4 py-4 pl-12 bg-black border border-[#1f1f1f] rounded-lg text-white placeholder:text-[#aaaaaa] focus:outline-none focus:border-white"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaaaaa]" size={20} />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-black rounded-md hover:bg-[#aaaaaa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Found {results.length} matching {results.length === 1 ? 'note' : 'notes'}
          </h2>

          {results.map((result, index) => (
            <div
              key={index}
              className="p-6 border border-[#1f1f1f] rounded-lg bg-black hover:border-white transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-[#aaaaaa] mb-1">
                    {new Date(result.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {result.overallScore && (
                    <p className="text-xs text-[#aaaaaa]">
                      Overall Score: {result.overallScore.toFixed(1)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[#1f1f1f] rounded-full">
                    <p className="text-xs text-white font-medium">
                      {(result.similarity * 100).toFixed(0)}% match
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-white leading-relaxed">{result.note}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-[#aaaaaa]">No matching notes found. Try a different search query.</p>
        </div>
      )}
    </div>
  );
}
