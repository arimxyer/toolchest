# Content Studio

Write, outline, critique, and headline articles for a website that follows a brand voice guide.

Two cooperating layers:

- **Six user-invoked skills** that read a project-local brand voice markdown file and emit drafts in markdown, MDX, frontmatter+body, or HTML — whichever format the destination expects.
- **A writer's room** of six specialist agents (`managing-editor`, `editor-in-chief`, `story-editor`, `staff-writer`, `copy-editor`, `headline-editor`) that wrap the skills with role-specific philosophy and isolated context. Use the skills for direct, narrow tasks; engage the agents when you want an embodied role to do the work.

## What it does (skills)

- **`/content-studio:init`** — writes a starter `brand-voice.md` (with sections for voice, tone, vocabulary, examples, audience) at the path configured in plugin settings. The voice guide is intentionally placeholder-heavy; the user fills in the brand specifics. Other plugin settings (output directory, default format, etc.) are configured separately via `userConfig` at plugin enable time — see [Settings](#settings) below.
- **`/content-studio:brainstorm`** — divergent ideation. Takes a theme, raw material (interview notes, a product update, a transcript), or nothing at all, and produces 5–8 distinct angle candidates with hook sentences and a critic's note on which are strongest. Hand the chosen angle to `/outline`.
- **`/content-studio:outline`** — turns a brief into a structured outline (hook, body sections with key points, CTA, headline candidates). Hand it to `/draft` or take it elsewhere.
- **`/content-studio:draft`** — drafts a full article from a brief or outline. Writes the file to the configured output directory (default `./drafts`) in the chosen format. Refuses briefs that land in the voice guide's "Things we don't write about" list.
- **`/content-studio:critique`** — reviews an existing draft against the voice guide. Reports violations (vocabulary, style, tone drift, structure, subject matter) with line refs and suggested rewrites. Offers to apply the edits, with a git-safety check before touching dirty or untracked files.
- **`/content-studio:headlines`** — produces 5–8 headline candidates across different angles, then a full SEO/social metadata bundle (meta description, slug, og:title, tags) for the chosen one.

## The writer's room (agents)

Six specialist agents, each with isolated context and a distinct role. Use them when you want the *role* doing the work — a copy editor has internalized different craft rules than a staff writer, and a draft critiqued by the `copy-editor` agent is different from one critiqued by the same skill in your main thread.

| Agent | Role |
|-------|------|
| `managing-editor` | The front door. Listens to broad or multi-step requests, decides which specialists are needed, either delegates directly (in agent-mode) or returns a routing plan. Doesn't draft, critique, or argue brand — just routes. |
| `editor-in-chief` | Strategic vision and brand-voice gatekeeper. Can — and will — kill pieces that don't fit the publication. Use for "should we write about X?" and "does this fit our voice at a strategic level?" |
| `story-editor` | Owns angles, outlines, structure. "What is this piece arguing?" is their starting question. Use for angle development, outlining, and mid-draft restructuring. |
| `staff-writer` | The craft heavy-lifter. Turns outlines and briefs into prose in the brand voice. Leaves honest TODOs rather than fabricating slots. |
| `copy-editor` | Voice-fidelity reviewer. Reads slowly, suggests rewrites with line refs, applies them with a git-safety check after explicit approval. |
| `headline-editor` | Owns titles, meta descriptions, slugs, og:title, social previews. Thinks in characters and search-result truncation. |

### How to engage the room

Two invocation patterns:

**Normal session — invoke specialists by name.**

```text
> Have the copy-editor look at ./drafts/lexcheck-12-minute-review.md
> Ask the story-editor to outline a piece on contract automation
> Have the editor-in-chief tell me if "AI for paralegals" fits our voice
```

In a normal Claude Code session, the `managing-editor` agent can think about routing but cannot directly spawn other specialist subagents (Claude Code currently allows only one level of subagent depth). If you invoke it here, it'll return a routing plan that Main Claude can execute, rather than driving the chain itself.

**Agent-mode session — managing editor drives the chain.**

```bash
claude --agent content-studio:managing-editor
```

In this mode the managing editor runs as the main session and *can* directly spawn the specialists. Walking into the newsroom and talking to the editor first, who pulls in the right people behind the scenes:

```text
> I want to put out a piece about contract automation this week
# managing-editor pulls in editor-in-chief for brand fit, then story-editor for angles,
# checks in with you, then staff-writer for the draft, then copy-editor, then headline-editor.
```

### Skills vs. agents — when to use which

- **Skills** = focused, narrow operations. You know exactly what you want. Fastest path. Lives in your main thread's context.
- **Agents** = embodied roles. The role matters — you want a copy editor's craft instincts, not a generalist with a critique recipe. Each agent gets isolated context, so role-specific reasoning doesn't get diluted.

The skills don't go away when you use the agents — the agents *use* the skills (each specialist has its primary skill preloaded into its context at startup via the documented `skills:` frontmatter field).

### Agent extras you'll see at runtime

Two of the six agents accumulate persistent memory. Worth knowing so the side-effects don't surprise you:

| Agent | Capability | What you'll see |
|-------|------------|-----------------|
| `editor-in-chief` | `memory: project` | Persistent memory at `.claude/agent-memory/editor-in-chief/MEMORY.md` — accumulates kills, approvals, and brand-fit rulings that the voice guide alone doesn't cover. Shareable via git. |
| `copy-editor` | `memory: project` | Persistent memory at `.claude/agent-memory/copy-editor/MEMORY.md` — accumulates voice-drift patterns specific to this brand over time. Shareable via git. |

The memory directories are project-scoped — check them into git if you want the team's editorial judgment to be shareable across collaborators.

The file-touching agents (`staff-writer`, `copy-editor`) write directly to your working tree, not to a temporary git worktree. Drafts land in `${user_config.output_dir}` and copy edits land in the file the user pointed at — review with `git diff` afterward.

## First-time setup

Two steps:

**1. Configure plugin settings (one-time, at enable time).**

When you enable the plugin, Claude Code prompts you for five values (declared in the plugin's `userConfig`):

| Field | Required? | Default | Purpose |
|-------|-----------|---------|---------|
| `voice_guide_path` | required | `./brand-voice.md` | Path to the brand voice markdown file. |
| `output_dir` | optional | `./drafts` | Where `/draft` writes generated articles. |
| `default_format` | optional | `markdown` | One of: `markdown`, `mdx`, `frontmatter`, `html`. Overridable per invocation. |
| `slug_prefix` | optional | _empty_ | Prepended to slugs in frontmatter (e.g. `posts/` or `blog/`). |
| `author` | optional | _empty_ | Written into frontmatter for `frontmatter` / `mdx` formats. |

Values land under `pluginConfigs.content-studio.options` in the settings file matching your install scope (user / project / local). To change them later, run `/plugin` and reconfigure, or edit the values directly in `settings.json`.

**2. Write the brand voice template:**

```text
/content-studio:init
```

This writes a starter `brand-voice.md` at the path you configured in step 1 (default `./brand-voice.md`). It refuses to overwrite if a file already exists at that path — your voice guide is safe.

Then edit `brand-voice.md`. The template's placeholders are doing the work of teaching what to write — replace every section. The highest-leverage section is **Examples** (on-voice / off-voice pairs); a couple of good pairs raise output quality more than any other input.

## Settings

All settings are configured via the plugin's `userConfig` (see [First-time setup](#first-time-setup) above). The fields are referenced from skills and agents using `${user_config.<field>}` substitution — for example, `/content-studio:draft` writes files to `${user_config.output_dir}`.

To inspect or change current values:
- Run `/plugin` to open the plugin manager, find `content-studio`, and reconfigure.
- Or edit `settings.json` directly under `pluginConfigs.content-studio.options`.

> **Migrating from v1.x?** Earlier versions stored settings in `.claude/content-studio.local.md`. That file is no longer used — settings now live in your `settings.json` under `pluginConfigs`. After enabling v2.x, you can delete the old `.claude/content-studio.local.md` file.

## Output formats

- **`markdown`** — plain `.md`, no frontmatter. Generic notes, README-style articles.
- **`frontmatter`** — `.md` with YAML frontmatter (`title`, `description`, `date`, `slug`, `tags`, `draft: true`). Default for static-site generators (Jekyll, Hugo, Eleventy, Astro content collections, Next.js + gray-matter).
- **`mdx`** — `.mdx` with frontmatter. Skill does not invent JSX components — it leaves a TODO comment if the project might have a custom component the writer should use.
- **`html`** — raw `<article>` fragment for CMS paste targets (WordPress block editor, Webflow rich-text, Ghost) or email.

Full per-format spec is in `skills/draft/references/output-formats.md`.

## Workspace structure (per-piece folders)

Each piece gets its own folder under `${user_config.output_dir}`. The skills cooperate to populate that folder with all the artifacts for one article — draft, outline, critique history, headline bundle — in one place.

```
${user_config.output_dir}/
└── lexcheck-12-minute-review/   # one piece = one folder, named after the slug
    ├── draft.md                 # /draft writes this (canonical artifact)
    ├── outline.md               # /draft saves the inline outline if the brief had one
    ├── critique.md              # /critique appends new reports with date headings
    └── headlines.md             # /headlines overwrites with the most recent bundle
```

### Which skill writes what

| Skill | File | Write behavior |
|-------|------|----------------|
| `/draft` | `<slug>/draft.<ext>` | Creates the piece directory; the extension matches the format. Same slug colliding with an existing piece increments to `<slug>-2/`. |
| `/draft` | `<slug>/outline.md` | Saves the outline alongside the draft, only if one was supplied inline in the brief. |
| `/critique` | `<piece>/critique.md` | **Appends** with date heading when run against a draft inside a piece directory. Chat-only for flat-structure or one-off drafts. |
| `/headlines` | `<piece>/headlines.md` | **Overwrites** when run against a draft inside a piece directory. Chat-only for flat-structure drafts. |

`/outline`, `/brainstorm`, and `/init` don't write piece-dir files. Outline iteration happens in chat (premature naming hurts), brainstorming precedes piece creation, and `/init` writes the brand voice file at `${user_config.voice_guide_path}`, not under the output dir.

### Why per-piece folders

Three things make the convention earn its weight:

1. **Everything for one article is in one place.** Open the folder; see the draft, the outline that produced it, what the copy-editor flagged, the headline candidates. No scavenger hunt across `drafts/`, `critiques/`, `metadata/`.
2. **Critique history compounds.** Append-mode on `critique.md` means the third pass on a piece can see what the first two caught. The piece's editorial journey is legible.
3. **Pieces are versioned by slug-incrementing, not file-suffixing.** A second draft of the same idea becomes its own folder (`<slug>-2/`), keeping each piece self-contained.


## Typical workflow

```text
# First time in a project (after configuring userConfig at plugin enable)
/content-studio:init
# Then edit brand-voice.md with real brand content.

# Per article — start with brainstorming if you don't have a fixed angle
/content-studio:brainstorm we want to write more about how legal review velocity affects ops
# … pick an angle, then …
/content-studio:outline a piece on why batching legal review hurts ops velocity
# … review the outline, edit, then …
/content-studio:draft <paste the outline + any extra constraints>
# … piece folder created at ./drafts/<slug>/
# …   draft.md (the prose)
# …   outline.md (saved alongside since the brief had an inline outline)

/content-studio:critique ./drafts/<slug>/draft.md
# … review the report; critique.md is also written into the piece folder.
# … re-running /critique appends to critique.md with a new date heading.

/content-studio:headlines ./drafts/<slug>/draft.md
# … pick a headline; headlines.md is written into the piece folder (overwrites on re-run).
# … paste the metadata bundle into the draft's frontmatter, ship.
```

## What this plugin does not do

- It does not infer a brand voice from existing site content. The voice guide is human-written.
- It does not publish, schedule, or commit. The user owns those steps.
- It does not do keyword research, competitor analysis, or A/B test headlines.
- It does not generate images or alt-text — image slots get `<!-- TODO: image -->`.
