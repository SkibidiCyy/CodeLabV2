import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/achievements")({
  component: AchievementsPage,
  head: () => ({
    meta: [
      { title: "Achievements — CodeQuest" },
      { name: "description", content: "Badges and milestones you've earned on CodeQuest." },
    ],
  }),
});

const BADGES = [
  { emoji: "🎯", title: "First Steps", desc: "Complete your first lesson", earned: true },
  { emoji: "🔥", title: "On Fire", desc: "Maintain a 7-day streak", earned: true },
  { emoji: "📚", title: "Bookworm", desc: "Finish 10 lessons", earned: true },
  { emoji: "🏆", title: "Quiz Champion", desc: "Score 100% on a quiz", earned: true },
  { emoji: "☕", title: "Java Master", desc: "Complete the Java track", earned: true },
  { emoji: "🎨", title: "Style Guru", desc: "Complete the CSS track", earned: true },
  { emoji: "🚀", title: "Rocket Learner", desc: "Earn 1,000 XP in a week", earned: true },
  { emoji: "💎", title: "Diamond Coder", desc: "Reach Level 20", earned: false },
  { emoji: "🌍", title: "Web Wizard", desc: "Ship your first project", earned: false },
  { emoji: "⌨️", title: "Speed Typist", desc: "Type 80+ WPM in a game", earned: false },
  { emoji: "🐛", title: "Bug Hunter", desc: "Find 25 bugs in Spot the Bug", earned: false },
  { emoji: "🧠", title: "Grand Master", desc: "Complete every course", earned: false },
];

function AchievementsPage() {
  const earned = BADGES.filter((b) => b.earned).length;
  return (
    <AppShell>
      <PageHeader title="Achievements" badge={`${earned}/${BADGES.length}`} />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {BADGES.map((b) => (
          <div
            key={b.title}
            className={`rounded-2xl border p-5 shadow-sm text-center transition ${
              b.earned ? "bg-card border-border" : "bg-muted/40 border-border opacity-70"
            }`}
          >
            <div
              className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center text-3xl ${
                b.earned ? "bg-gradient-to-br from-amber-200 to-amber-400" : "bg-muted grayscale"
              }`}
            >
              {b.emoji}
            </div>
            <h4 className="mt-3 font-semibold">{b.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
            <span
              className={`inline-block mt-3 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                b.earned ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
              }`}
            >
              {b.earned ? "Earned" : "Locked"}
            </span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}