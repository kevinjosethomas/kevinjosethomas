'use client';

type TimePreset = {
  label: string;
  days: number;
};

interface TimeSelectorProps {
  selectedDays: number;
  onDaysChange: (days: number) => void;
}

const presets: TimePreset[] = [
  { label: '7d', days: 7 },
  { label: '14d', days: 14 },
  { label: '1m', days: 30 },
  { label: '3m', days: 90 },
  { label: '6m', days: 180 },
  { label: '1y', days: 365 },
  { label: 'All', days: 10000 },
];

export default function TimeSelector({ selectedDays, onDaysChange }: TimeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#aaaaaa] mr-2">Time Range:</span>
      {presets.map((preset) => {
        const isActive = selectedDays === preset.days;
        return (
          <button
            key={preset.label}
            onClick={() => onDaysChange(preset.days)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              isActive
                ? 'bg-white text-black font-medium'
                : 'bg-[#1f1f1f] text-[#aaaaaa] hover:bg-[#2a2a2a] hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
