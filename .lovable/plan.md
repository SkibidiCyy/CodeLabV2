# CodeQuest-style Dashboard

Rebuild the placeholder home into a full dashboard modeled after the attached CodeQuest reference, using the existing CodeLab navigation items but restyled to match.

## Layout

Two-column app shell (`src/routes/index.tsx`):

```text
┌──────────────┬────────────────────────────────────────────┐
│  Sidebar     │  Top bar: search  ·  notifications · user  │
│  (dark navy) │  ── Welcome hero banner (blue gradient) ── │
│  Logo        │  ── 4 stat cards ──────────────────────── │
│  Nav items   │  ── Learning Progress · Skill · Daily ─── │
│  Streak card │  ── Recent · Continue · Upcoming ──────── │
│  Dark mode   │                                            │
└──────────────┴────────────────────────────────────────────┘
```

## Sidebar (matches reference styling, uses current CodeLab nav)

- Dark navy panel, `CodeQuest / Learning Platform` logo lockup at top.
- Nav items reused from current site: **Dashboard, Lessons, Quizzes, Achievements, Games, Settings, Logout**. Active item = solid blue pill with white icon+label; others muted white with lucide icons.
- Bottom "Current Streak — 12 days" card with flame icon and progress dots.
- Dark Mode toggle row at the very bottom.

## Main content (copied 1:1 from the reference)

1. Top bar: rounded search input, bell with red badge, avatar + name/role + chevron.
2. Welcome hero: blue→indigo gradient card, "Welcome back, Cyrus! 👋", subtitle, illustration placeholder on the right, quote block.
3. Four stat cards: Lessons Completed 24, Quizzes Taken 18, Total Score 1,250, Badges Earned 7 — each with pastel icon tile and green "↑ X% this week".
4. Middle row: **Learning Progress** line chart (Mon–Sun) with "This Week" selector, **Skill Progress** list (HTML/CSS/JS/Java with % bars and level chips + Overall bar), **Daily Goal** circular progress 75% with "Continue Learning" CTA.
5. Bottom row: **Recent Activities** list, **Continue Learning** card with JS lesson + progress bar + Continue button + carousel dots, **Upcoming Quizzes** list with Start buttons.

## Design tokens (added to `src/styles.css`)

Extend semantic tokens (all `oklch`) to match the reference palette:
- Sidebar: near-black navy background, muted foreground, primary blue accent.
- Primary blue for CTAs/active states; pastel tints for stat card icons (blue, green, purple, amber).
- Card radius ~1rem, soft shadow, off-white app background.
- Both light and dark palettes updated cohesively.

## Technical notes

- Single route: rewrite `src/routes/index.tsx` (keeps placeholder replacement rule).
- Update `__root.tsx` `head()` with real title/description ("CodeQuest — Learning Platform").
- Icons via existing `lucide-react`; chart via `recharts` (already used by shadcn chart). Confirm/install if missing.
- Illustration + avatar rendered as generated images saved to `src/assets/` and imported.
- No backend changes; all data hard-coded to mirror the reference.
- No routing changes beyond the index page — sidebar items are visual only for now (can be wired to real routes later if requested).
