# Agent loop — profile of this repo

Repo values that pitwall (`/pitwall`, `/pitwall:gauge`, `/pitwall:ticket`) reads. The skills hold none of these. Sections follow the "Profile contract" in the pitwall `SKILL.md`; `/pitwall:doctor` checks them.

## repo

| | |
|---|---|
| name | prachyaporn-portfolio-interface (bilingual th/en portfolio site for an early childhood teacher — Next.js 16 static export) |
| loop state | one folder per repo, outside the checkout: Windows `%LOCALAPPDATA%\Agent-Loop\prachyaporn-portfolio-interface\state.json` · macOS `~/Library/Application Support/Agent-Loop/prachyaporn-portfolio-interface/state.json` · Linux `~/.local/state/agent-loop/prachyaporn-portfolio-interface/state.json` |
| loop checkout | `C:\personal\prachyaporn-portfolio-interface` — nobody works in it while the loop runs |

## language

| Used for | Language |
|---|---|
| user — questions, reports, tick boxes | Thai · recommended option marked `(แนะนำ)` |
| PR body / PR title / commit | English |
| tracker comments and task descriptions | none |

## git

| | |
|---|---|
| base | `dev` — pulled at the start of every round, PRs target it |
| never push / check out to edit | `dev`, `main` |
| merge | `merge: auto` |
| dev branch | `dev` |
| agent branch | `agent/<id>-<slug>` |
| commit / PR title | `<type>: <summary>` · type = feat / fix / refactor / test / chore / docs (default — no enforcing hook) |
| hooks | none — never `--no-verify` |
| resolve conflicts yourself | `PLAN.md` (append-only rows / questions, safe to union) · everything else → a human |
| ignored checks | none |

## checks (level A)

```bash
pnpm install --frozen-lockfile   # when the lockfile changes or dependencies are missing
pnpm run typecheck
pnpm run lint                    # 0 errors, warnings ≤ lintBaseline (0)
# test: none — no test runner yet
pnpm run build                   # static export to out/
```

PR-body check: `node <pitwall dir>/scripts/check-pr-body.mjs --file <body file>` (default)

## level B (browser)

| | |
|---|---|
| dev server | `pnpm run dev -p <port>` on port `3000` · `port: free` (static site, no backend: each worktree runs its own server on a spare port) · port already in use by someone else → never kill it, item B becomes ⏳ case 3 |
| browser | Playwright MCP (`mcp__playwright__*`) |
| pages | `/th/`, `/en/`, `/th/activities/`, `/en/activities/` |
| viewports | 360 and 1366 px · console errors = 0 · no horizontal scroll at 360 |
| time | ~10 minutes per method per item, then change method |
| human-only steps | none |
| verification skill | none |
| upkeep | none |

## states to build

none — static content from `src/content/`; reduced motion is checked with Playwright `browser_emulate_media` (`reducedMotion: reduce`)

## repo-specific evidence

| Changed files | Evidence | Level |
|---|---|---|
| `src/components/**`, `src/app/**` | screenshot of the changed section at 360 and 1366 px on `/th/` and `/en/`, plus one with reduced motion | B |
| `src/content/**` | both `th` and `en` present for every new value (typecheck enforces `Localized`) and rendered on the page | A + B |
| `src/app/**/opengraph-image.*`, `sitemap.ts`, `robots.ts` | the generated file exists in `out/` after `pnpm run build` | A |

## plan

| | |
|---|---|
| location | `PLAN.md` read from `origin/dev` |
| reading order | `CLAUDE.md`, `PLAN.md` |
| task row | `\| <id> \| [ ] <task> \| <files> \| <Done when> \|` |
| open questions | `PLAN.md` → Open questions |
| not queued | none |
| playbook per row type | new section / page → feature · bug → bug-fix |
| spec | none — `/pitwall:plan` creates `SPEC.md` |
| question banks | none |

## tracker

`tracker: none` — no tasks, the PR is the record

## agents per task

`parallel: 3` — at most this many tasks at once, each in its own worktree

| Role | subagent | model |
|---|---|---|
| research | `Explore` | default |
| `code role` — follows an existing pattern | `pitwall:pitwall-agent` | sonnet |
| `code role` — design across modules, docs, playbooks | `pitwall:pitwall-agent` | opus |
| `review panel` — every task | `pitwall:pitwall-agent` ×2 | opus + sonnet — the same prompt |
| `verifier` — fresh, read-only, before every PR | `pitwall:pitwall-agent` | sonnet |

| Work | checklist in the brief |
|---|---|
| every review | `CLAUDE.md` → Rules |

## repo rules

`CLAUDE.md`, `AGENTS.md` (Next 16: read `node_modules/next/dist/docs/` before using an API) · principles turned off: none

## permissions

allow: `pnpm install`, `pnpm run typecheck`, `pnpm run lint`, `pnpm run build`, `pnpm run dev`, `git fetch`, `git switch`, `git pull --ff-only`, `git add`, `git commit`, `git worktree`, `git push -u origin agent/*`, `gh pr list`, `gh pr view`, `gh pr create`, `gh pr edit`, `gh pr checks`, `Bash(node C:/Users/usEr/.claude/plugins/cache/pitwall/pitwall/0.7.0/skills/pitwall/scripts/merge-pr.mjs:*)` · deny: `gh pr merge`, `git push --force`, `--no-verify`, `git push origin dev`, `git push origin main`, edits to `.env*`
