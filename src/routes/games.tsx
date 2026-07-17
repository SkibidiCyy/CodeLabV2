import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Trophy } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/games")({
  component: GamesPage,
  head: () => ({
    meta: [
      { title: "Games — CodeQuest" },
      { name: "description", content: "Earn XP with coding mini-games: Code Sprint, Link Up, Spot the Bug, and Typing Speed." },
    ],
  }),
});

const MODES = [
  { key: "sprint", label: "🏃 Code Sprint", desc: "Race through code challenges against the clock.", best: "1,240 pts" },
  { key: "linkup", label: "🔗 Link Up", desc: "Match tags and properties with their definitions.", best: "18 chains" },
  { key: "bug", label: "🐛 Spot the Bug", desc: "Find and fix the broken line in each snippet.", best: "42 bugs" },
  { key: "typing", label: "⌨️ Typing Speed", desc: "Type real code as fast and accurately as you can.", best: "72 WPM" },
] as const;

function GamesPage() {
  const [mode, setMode] = useState<(typeof MODES)[number]["key"]>("sprint");
  const active = MODES.find((m) => m.key === mode)!;

  return (
    <AppShell>
      <PageHeader title="🎮 Games Hub" badge="Earn XP • Level Up" />

      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              mode === m.key
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border p-8 shadow-sm">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-5xl">{active.label.split(" ")[0]}</div>
          <h3 className="mt-3 text-xl font-semibold">{active.label.replace(/^\S+\s/, "")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{active.desc}</p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4 text-amber-500" /> Personal best:{" "}
            <strong className="text-foreground">{active.best}</strong>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <label className="text-left text-xs">
              <span className="text-muted-foreground">Category</span>
              <select className="mt-1 w-full px-3 py-2 rounded-lg bg-background border border-border text-sm">
                <option>All</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>JavaScript</option>
              </select>
            </label>
            <label className="text-left text-xs">
              <span className="text-muted-foreground">Duration</span>
              <select className="mt-1 w-full px-3 py-2 rounded-lg bg-background border border-border text-sm">
                <option>30s</option>
                <option>60s</option>
                <option>120s</option>
              </select>
            </label>
          </div>

          <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            <Play className="h-4 w-4" /> Start Game
          </button>
        </div>
      </div>
    </AppShell>
  );
}