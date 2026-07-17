import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Trophy,
  ChevronDown,
  Users,
  Star,
  Target,
  Calendar,
  Activity,
  Award,
  ClipboardCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import heroCoder from "@/assets/hero-coder.png";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const progressData = [
  { day: "Mon", value: 22 },
  { day: "Tue", value: 38 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 63 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 82 },
];

const skills = [
  { name: "HTML", pct: 90, level: "Advanced", color: "bg-orange-500", chip: "bg-orange-100 text-orange-700", badge: "🟧" },
  { name: "CSS", pct: 65, level: "Intermediate", color: "bg-sky-500", chip: "bg-sky-100 text-sky-700", badge: "🟦" },
  { name: "JavaScript", pct: 45, level: "Beginner", color: "bg-amber-400", chip: "bg-amber-100 text-amber-700", badge: "🟨" },
  { name: "Java", pct: 78, level: "Intermediate", color: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700", badge: "☕" },
];

const activities = [
  { icon: BookOpen, text: "You completed HTML Forms lesson", time: "2h ago", tint: "bg-blue-100 text-blue-600" },
  { icon: Award, text: 'Anna Marie earned the "Java Master" badge', time: "4h ago", tint: "bg-amber-100 text-amber-600" },
  { icon: ClipboardCheck, text: "John D. got 100% on Java Quiz", time: "6h ago", tint: "bg-emerald-100 text-emerald-600" },
  { icon: Activity, text: "Mike Angelo completed Lesson 5", time: "1d ago", tint: "bg-purple-100 text-purple-600" },
];

const upcoming = [
  { title: "HTML Basics Quiz", date: "May 20, 2024", time: "10:00 AM" },
  { title: "Java Loops Quiz", date: "May 22, 2024", time: "02:00 PM" },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
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

        <nav className="px-4 mt-4 flex-1 space-y-1">
          {navItems.map((item, i) => {
            const active = i === 0;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
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

        {/* Streak card */}
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

      {/* Main */}
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

        {/* Welcome hero */}
        <section
          className="relative overflow-hidden rounded-3xl px-8 py-8 text-white"
          style={{
            background:
              "linear-gradient(120deg, var(--hero-from), var(--hero-to))",
          }}
        >
          <div className="relative z-10 grid gap-4 md:grid-cols-[1.2fr_1fr_0.9fr] items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, Cyrus! <span className="inline-block">👋</span>
              </h1>
              <p className="mt-2 text-white/85">Ready to continue your coding journey?</p>
            </div>
            <div className="flex justify-center">
              <img
                src={heroCoder}
                alt="Coding illustration"
                width={260}
                height={200}
                className="h-40 md:h-48 w-auto drop-shadow-xl"
              />
            </div>
            <div className="text-white/95">
              <div className="text-4xl leading-none font-serif">“</div>
              <p className="italic -mt-3">
                The best way to predict the future is to code it.
              </p>
              <div className="text-right text-white/70 text-sm">— CodeQuest</div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard icon={Users} tint="bg-[var(--stat-blue)] text-blue-600" label="Lessons Completed" value="24" delta="12% this week" />
          <StatCard icon={BookOpen} tint="bg-[var(--stat-green)] text-emerald-600" label="Quizzes Taken" value="18" delta="8% this week" />
          <StatCard icon={Trophy} tint="bg-[var(--stat-purple)] text-purple-600" label="Total Score" value="1,250" delta="15% this week" />
          <StatCard icon={Award} tint="bg-[var(--stat-amber)] text-amber-600" label="Badges Earned" value="7" delta="3% this week" />
        </section>

        {/* Middle row */}
        <section className="grid gap-5 lg:grid-cols-[1.15fr_1.15fr_0.8fr]">
          {/* Learning Progress */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Learning Progress</h3>
              <button className="text-xs px-3 py-1.5 border border-border rounded-lg text-muted-foreground flex items-center gap-1">
                This Week <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 90%)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(220 10% 55%)" }} />
                  <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(220 10% 55%)" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="oklch(0.58 0.20 262)" strokeWidth={3} dot={{ r: 4, fill: "#fff", stroke: "oklch(0.58 0.20 262)", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Progress */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Skill Progress</h3>
              <button className="text-xs text-primary font-medium">View All</button>
            </div>
            <div className="mt-4 space-y-4">
              {skills.map((s) => (
                <div key={s.name} className="grid grid-cols-[28px_1fr_auto] items-center gap-3">
                  <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center text-sm">{s.badge}</div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${s.chip}`}>{s.level}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Overall Learning Progress</span>
                  <span className="text-muted-foreground">70%</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm flex flex-col">
            <h3 className="font-semibold">Daily Goal</h3>
            <div className="flex-1 flex flex-col items-center justify-center py-3">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220 30% 94%)" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="oklch(0.58 0.20 262)"
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(75 / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Target className="h-5 w-5 text-primary mb-1" />
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-3">Study for 60 minutes</div>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              Continue Learning
            </button>
          </div>
        </section>

        {/* Bottom row */}
        <section className="grid gap-5 lg:grid-cols-3">
          {/* Recent Activities */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Activities</h3>
              <button className="text-xs text-primary font-medium">See All</button>
            </div>
            <div className="space-y-4">
              {activities.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${a.tint}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-sm">{a.text}</div>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Continue Learning</h3>
              <button className="text-xs text-primary font-medium">See All</button>
            </div>
            <div className="rounded-xl bg-muted/40 p-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-amber-400 flex items-center justify-center text-xl font-black text-black">
                JS
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">JavaScript Basics</div>
                <div className="text-xs text-muted-foreground">Lesson 8 of 15</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "60%" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">60%</span>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              Continue
            </button>
            <div className="mt-3 flex justify-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>

          {/* Upcoming Quizzes */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Upcoming Quizzes</h3>
              <button className="text-xs text-primary font-medium">See All</button>
            </div>
            <div className="space-y-3">
              {upcoming.map((q) => (
                <div key={q.title} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{q.title}</div>
                    <div className="text-xs text-muted-foreground">{q.date} • {q.time}</div>
                  </div>
                  <button className="text-xs font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground">Start</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  tint,
  label,
  value,
  delta,
}: {
  icon: typeof Users;
  tint: string;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-sm flex items-center gap-4">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${tint}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold leading-tight">{value}</div>
        <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
          <Star className="h-3 w-3 fill-current" /> ↑ {delta}
        </div>
      </div>
    </div>
  );
}
