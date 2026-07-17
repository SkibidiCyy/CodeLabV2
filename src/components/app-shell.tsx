import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Trophy,
  Gamepad2,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Flame,
  Moon,
} from "lucide-react";
import type { ReactNode } from "react";
import userAvatar from "@/assets/user-avatar.jpg";

type NavItem = {
  to: "/" | "/lessons" | "/quizzes" | "/achievements" | "/games" | "/settings";
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/lessons", label: "Lessons", icon: BookOpen },
  { to: "/quizzes", label: "Quizzes", icon: ClipboardCheck },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col bg-sidebar text-sidebar-foreground sticky top-0 h-screen">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 4a8 8 0 108 14" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">CodeQuest</div>
            <div className="text-xs text-sidebar-foreground/60">Learning Platform</div>
          </div>
        </div>

        <nav className="px-4 mt-4 flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>

        <div className="mx-4 mb-4 rounded-2xl bg-sidebar-accent p-5">
          <div className="flex items-center gap-2 text-sm text-sidebar-foreground/80">
            <Flame className="h-4 w-4 text-orange-400" />
            Current Streak
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold">12</span>
            <span className="text-sm text-sidebar-foreground/70">days</span>
          </div>
          <div className="mt-2 text-xs text-sidebar-foreground/60">Keep it up!</div>
          <div className="mt-3 flex gap-1">
            {[1, 1, 1, 1, 0, 0, 0].map((v, idx) => (
              <span
                key={idx}
                className={`h-1.5 flex-1 rounded-full ${v ? "bg-primary" : "bg-sidebar-foreground/20"}`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-sidebar-border flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-sidebar-foreground/80">
            <Moon className="h-4 w-4" /> Dark Mode
          </span>
          <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
            <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-white shadow" />
          </span>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for lessons, quizzes..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="relative h-11 w-11 rounded-full bg-card border border-border flex items-center justify-center">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center gap-3 bg-card border border-border rounded-full pl-1 pr-3 py-1">
            <img
              src={userAvatar}
              alt="Cyrus"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold">Cyrus</div>
              <div className="text-xs text-muted-foreground">Student</div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

export function PageHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      {badge ? (
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground">
          {badge}
        </span>
      ) : null}
    </div>
  );
}