import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Lock, Bell, Database, Info } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import userAvatar from "@/assets/user-avatar.jpg";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — CodeQuest" },
      { name: "description", content: "Manage your account, security, notifications, and privacy on CodeQuest." },
    ],
  }),
});

const TABS = [
  { key: "account", label: "Account", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "privacy", label: "Privacy", icon: Database },
  { key: "about", label: "About", icon: Info },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("account");

  return (
    <AppShell>
      <PageHeader title="Settings" />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="rounded-2xl bg-card border border-border p-2 h-fit">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
          {tab === "account" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={userAvatar} alt="Avatar" width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold">Cyrus</h3>
                  <p className="text-sm text-muted-foreground">Student • Level 12</p>
                  <button className="mt-2 text-xs px-3 py-1.5 rounded-lg border border-border">Change photo</button>
                </div>
              </div>
              <Field label="Display name" defaultValue="Cyrus" />
              <Field label="Email" defaultValue="cyrus@codequest.dev" type="email" />
              <Field label="Username" defaultValue="cyruscodes" />
              <div className="flex justify-end">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Save changes</button>
              </div>
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-4">
              <Field label="Current password" type="password" />
              <Field label="New password" type="password" />
              <Field label="Confirm new password" type="password" />
              <Toggle label="Two-factor authentication" desc="Add an extra layer of security to your account." />
              <div className="flex justify-end">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Update password</button>
              </div>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-3">
              <Toggle label="Daily learning reminder" desc="A gentle nudge every day at your set time." defaultChecked />
              <Toggle label="Streak alerts" desc="Notify me before my streak expires." defaultChecked />
              <Toggle label="New quiz available" desc="When a new quiz drops in your tracks." />
              <Toggle label="Achievement earned" desc="Celebrate every badge you unlock." defaultChecked />
              <Toggle label="Weekly digest" desc="A summary of your progress every Sunday." />
            </div>
          )}
          {tab === "privacy" && (
            <div className="space-y-3">
              <Toggle label="Show me on the leaderboard" defaultChecked />
              <Toggle label="Public profile" desc="Let other learners see your progress." />
              <Toggle label="Personalized recommendations" defaultChecked />
              <div className="pt-4 border-t border-border">
                <button className="text-sm text-destructive font-medium">Delete my data</button>
              </div>
            </div>
          )}
          {tab === "about" && (
            <div className="space-y-3 text-sm">
              <p><strong>CodeQuest</strong> — a gamified learning platform for HTML, CSS, JavaScript, and Java.</p>
              <p className="text-muted-foreground">Version 1.0.0</p>
              <p className="text-muted-foreground">Made with ♥ for learners everywhere.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full px-3 py-2 rounded-lg bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}

function Toggle({ label, desc, defaultChecked }: { label: string; desc?: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}