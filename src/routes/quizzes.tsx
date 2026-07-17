import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Clock, Trophy, Play, Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/quizzes")({
  component: QuizzesPage,
  head: () => ({
    meta: [
      { title: "Quizzes — CodeQuest" },
      { name: "description", content: "Test your skills with interactive coding quizzes." },
    ],
  }),
});

const QUIZZES = [
  { title: "HTML Basics", questions: 10, minutes: 10, best: 90, unlocked: true, tag: "HTML", tint: "bg-orange-100 text-orange-700" },
  { title: "HTML Forms Deep Dive", questions: 12, minutes: 12, best: 75, unlocked: true, tag: "HTML", tint: "bg-orange-100 text-orange-700" },
  { title: "CSS Selectors", questions: 15, minutes: 15, best: 60, unlocked: true, tag: "CSS", tint: "bg-sky-100 text-sky-700" },
  { title: "Flexbox Mastery", questions: 10, minutes: 12, best: 0, unlocked: true, tag: "CSS", tint: "bg-sky-100 text-sky-700" },
  { title: "JavaScript Fundamentals", questions: 15, minutes: 15, best: 45, unlocked: true, tag: "JS", tint: "bg-amber-100 text-amber-700" },
  { title: "Java Loops", questions: 10, minutes: 10, best: 0, unlocked: false, tag: "Java", tint: "bg-emerald-100 text-emerald-700" },
];

function QuizzesPage() {
  const unlocked = QUIZZES.filter((q) => q.unlocked).length;

  return (
    <AppShell>
      <PageHeader title="Quizzes" badge={`${unlocked}/${QUIZZES.length} Unlocked`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {QUIZZES.map((q) => (
          <div key={q.title} className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${q.tint}`}>
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${q.tint}`}>{q.tag}</span>
            </div>
            <h4 className="mt-3 font-semibold">{q.title}</h4>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClipboardCheck className="h-3 w-3" /> {q.questions} questions
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {q.minutes} min
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs flex items-center gap-1 text-muted-foreground">
                <Trophy className="h-3 w-3" /> Best: <strong className="text-foreground">{q.best}%</strong>
              </span>
              <button
                disabled={!q.unlocked}
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
              >
                {q.unlocked ? (
                  <>
                    <Play className="h-3 w-3" /> Start
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3" /> Locked
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}