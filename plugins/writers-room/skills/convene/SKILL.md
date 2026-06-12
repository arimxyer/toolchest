---
name: convene
description: Convene the writer's room — hand off a topic and get back a finished, on-brand piece (article, blog post, or site copy). Runs a short upfront clarification interview, then hands the topic and answers to the showrunner agent, which spawns the room and writes the piece. Checks for a BRAND.md first and helps create one if it's missing. The room does the writing — this skill only interviews and hands off.
argument-hint: <topic or rough brief>
---

# convene

The interactive front door to the writer's room. You gather a little context from the user, then hand the whole job to the `showrunner` agent, which runs the room — each specialist writes its own artifact into the piece's workspace. **This skill does not write or edit the content itself** — its only jobs are the brand check, the upfront interview, and relaying the result. (Want zero questions? The user can call `@agent-writers-room:showrunner <topic>` directly.)

## Step 0 — Brand grounding

Look for `BRAND.md` in the project root (and one level down, e.g. `content/BRAND.md`).

- **Missing:** offer to create one now via `/writers-room:establish-brand`. If declined, proceed but warn that brand alignment will be unverified.
- **Present:** note its path — you'll pass it to the showrunner.

## Step 1 — Intake interview (front-load the questions)

Ask the user the clarifying questions **upfront**, batched so they're answered in as few turns as possible. Cover what you don't already know from the topic:

- **The ask** — what this piece is, in their words, and why now.
- **Audience** — who it's for; their sophistication.
- **Goal** — what the reader should think / feel / do.
- **Angle leanings** — any framing they have in mind (or "you decide").
- **Must-include** — points, facts, examples, links that have to appear.
- **Constraints** — format/channel, length, deadline, any per-piece tone or avoid notes.
- **Source material** — anything to draw from or cite.

Ask only what's genuinely open. The point is to gather everything now so the room can run uninterrupted — once it starts, it can't come back to ask.

## Step 2 — Hand off to the showrunner

Dispatch the `writers-room:showrunner` agent. In its prompt, give it:

- the topic / ask,
- every intake answer from Step 1,
- the brand status — the `BRAND.md` path, or "no BRAND.md — proceed and flag",
- the memo template path — `references/MEMO.template.md` sits alongside this skill; pass its absolute path.

The showrunner opens the workspace, writes `MEMO.md`, and spawns the room — the researcher, writer, editors, and distribution editor each write their own artifact — then returns a summary. **You do not write any of these files.**

## Step 3 — Relay

Present the showrunner's result to the user: the workspace path, the final piece location, the distribution highlights, and every assumption or open question the showrunner flagged. Offer to open the final piece. If the user wants changes, re-dispatch the showrunner (or a single worker agent) with the revision request — still without editing the files yourself.

## Notes

- **The room writes; you don't.** Handing the writing to the showrunner is the whole point — never draft, edit, or assemble the piece in the main thread.
- **Why a skill and not just the agent?** The upfront interview needs the user, and only the main session can ask (`AskUserQuestion` isn't available to subagents). The showrunner can't interview — so this skill does, then hands off. Calling the showrunner directly skips the interview.
- **If the user hands you a finished draft** and just wants critique + packaging, pass that along so the showrunner starts mid-pipeline.
