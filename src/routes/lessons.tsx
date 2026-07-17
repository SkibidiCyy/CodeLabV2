import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Play, Lock, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/lessons")({
  component: LessonsPage,
  head: () => ({
    meta: [
      { title: "Lessons — CodeQuest" },
      { name: "description", content: "Structured HTML, CSS, and JavaScript lessons on CodeQuest." },
    ],
  }),
});

const TABS = ["HTML", "CSS", "JavaScript"] as const;
const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"] as const;

type Lesson = {
  title: string;
  desc: string;
  level: (typeof FILTERS)[number];
  status: "done" | "current" | "locked";
  minutes: number;
  tab: (typeof TABS)[number];
};

const LESSONS: Lesson[] = [
  { title: "HTML Introduction", desc: "Elements, tags, and document structure.", level: "Beginner", status: "done", minutes: 12, tab: "HTML" },
  { title: "HTML Forms", desc: "Inputs, labels, validation, and accessibility.", level: "Beginner", status: "done", minutes: 18, tab: "HTML" },
  { title: "Semantic HTML", desc: "Header, nav, main, article, and section.", level: "Intermediate", status: "current", minutes: 15, tab: "HTML" },
  { title: "HTML Tables", desc: "Rows, columns, headers, and captions.", level: "Intermediate", status: "locked", minutes: 20, tab: "HTML" },
  { title: "HTML5 APIs", desc: "Storage, geolocation, and drag-and-drop.", level: "Advanced", status: "locked", minutes: 25, tab: "HTML" },
  { title: "CSS Basics", desc: "Selectors, colors, and the box model.", level: "Beginner", status: "done", minutes: 15, tab: "CSS" },
  { title: "Flexbox Layout", desc: "Aligning items with modern flexbox.", level: "Intermediate", status: "current", minutes: 22, tab: "CSS" },
  { title: "CSS Grid", desc: "Two-dimensional grid layouts.", level: "Intermediate", status: "locked", minutes: 24, tab: "CSS" },
  { title: "Responsive Design", desc: "Media queries and fluid layouts.", level: "Advanced", status: "locked", minutes: 30, tab: "CSS" },
  { title: "JavaScript Basics", desc: "Variables, types, and operators.", level: "Beginner", status: "current", minutes: 20, tab: "JavaScript" },
  { title: "Functions & Scope", desc: "Declaring functions and lexical scope.", level: "Beginner", status: "locked", minutes: 22, tab: "JavaScript" },
  { title: "DOM Manipulation", desc: "Selecting and updating elements.", level: "Intermediate", status: "locked", minutes: 28, tab: "JavaScript" },
  { title: "Async / Await", desc: "Promises and asynchronous flow.", level: "Advanced", status: "locked", minutes: 32, tab: "JavaScript" },
];

function LessonsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("HTML");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = LESSONS.filter((l) => l.tab === tab)
    .filter((l) => filter === "All" || l.level === filter)
    .filter((l) => l.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <PageHeader title="Lessons" badge="Structured Learning" />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="relative ml-auto w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lessons..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((l) => (
          <div key={l.title} className="rounded-2xl bg-card border border-border p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  l.level === "Beginner"
                    ? "bg-emerald-100 text-emerald-700"
                    : l.level === "Intermediate"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {l.level}
              </span>
              {l.status === "done" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              {l.status === "locked" && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>
            <h4 className="mt-3 font-semibold">{l.title}</h4>
            <p className="text-sm text-muted-foreground mt-1 flex-1">{l.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{l.minutes} min</span>
              <button
                disabled={l.status === "locked"}
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Play className="h-3 w-3" /> {l.status === "done" ? "Review" : "Start"}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl bg-card border border-border p-10 text-center text-muted-foreground">
            No lessons match your filters.
          </div>
        )}
      </div>
    </AppShell>
  );
}