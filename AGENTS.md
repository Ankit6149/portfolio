# Portfolio agent operating rules

Preserve the current approved visual direction, existing assets, and unrelated founder changes. Treat automated build success and visual/product approval as different gates.

## Base / Linear operating contract

Linear is the attention/status projection, not a mirror of GitHub. Do not create a Linear issue for every commit, PR, asset change, experiment, or implementation slice.

When work is associated with a Base Linear issue, preserve its `ARC-###` identifier in branch/PR context and use exactly one lifecycle statement in the PR body:

- `Fixes ARC-123` only when merging the PR fully achieves the Linear issue's intended outcome and no visual review, responsive review, interaction review, deployment, or other explicit acceptance action remains.
- `Part of ARC-123` when the PR contributes to the outcome but review/acceptance still remains. This must not auto-close the Linear issue.
- `No Linear issue — <reason>` only for maintenance that genuinely does not need Base tracking.

Never use `Fixes ARC-...` merely because CI is green. A portfolio review issue stays open until the required visual/product judgment is complete. Prefer consolidating work into the existing launch/review outcomes instead of generating tracking noise.

## Base execution write-back

When an `ARC-###` issue is part of the execution and Linear MCP/access is available:

1. Read the Linear issue before changing the portfolio. Use its durable goal, visual/product constraints, latest execution report, linked PR/evidence, and owner-review boundary as context.
2. Preserve the executor explicitly selected by the user. Do not silently route implementation or review to another agent.
3. If the next step requires owner approval of visual direction, public deployment/publication, destructive asset replacement, or another explicit approval boundary, stop at a concrete proposal until that scoped approval exists.
4. After meaningful work, write a dated execution report to the same Linear issue containing: execution summary; what happened; what changed; findings; why; evidence; impact; verification; remaining gaps/uncertainty; next recommended execution; human decision required; executor.
5. Keep status truthful. Build/CI success does not equal visual/product acceptance, and a merged implementation slice must not close a review outcome that still needs owner judgment.
6. If Linear write access is unavailable, return the same structured report and explicitly mark `Linear write-back pending` instead of claiming Base was updated.

Every meaningful execution should leave the portfolio issue easier to resume without reconstructing an old chat.