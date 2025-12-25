'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Moon,
  Briefcase,
  Dumbbell,
  DollarSign,
  Smartphone,
  MessageSquare,
  Search,
  LogOut,
  ArrowLeft,
} from 'lucide-react';

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Sleep', href: '/dashboard/sleep', icon: Moon },
  { name: 'Work', href: '/dashboard/work', icon: Briefcase },
  { name: 'Workouts', href: '/dashboard/workouts', icon: Dumbbell },
  { name: 'Money', href: '/dashboard/money', icon: DollarSign },
  { name: 'Screen Time', href: '/dashboard/screen-time', icon: Smartphone },
  { name: 'Search', href: '/dashboard/search', icon: Search },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/dashboard/auth', { method: 'DELETE' });
    router.push('/dashboard/login');
    router.refresh();
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-[#1f1f1f] bg-black flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#1f1f1f]">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-[#aaaaaa] mt-1">Analytics & Insights</p>
      </div>

      {/* Back to Home Link */}
      <div className="p-4 border-b border-[#1f1f1f]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[#aaaaaa] hover:text-white hover:bg-[#1f1f1f]"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-[#aaaaaa] hover:text-white hover:bg-[#1f1f1f]'
                }
              `}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#1f1f1f]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[#aaaaaa] hover:text-white hover:bg-[#1f1f1f] w-full"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
