import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
}: StatCardProps) {
  return (
    <div className="p-6 border border-[#1f1f1f] rounded-lg bg-black hover:border-white transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-[#1f1f1f]">
          <Icon size={20} className="text-white" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.positive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm text-[#aaaaaa] mb-1">{title}</p>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        {subtitle && <p className="text-xs text-[#aaaaaa]">{subtitle}</p>}
      </div>
    </div>
  );
}
