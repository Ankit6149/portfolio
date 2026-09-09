# Portfolio agent operating rules

Preserve the current approved visual direction, existing assets, and unrelated founder changes. Treat automated build success and visual/product approval as different gates.

## Base / Linear operating contract

Linear is the attention/status projection, not a mirror of GitHub. Do not create a Linear issue for every commit, PR, asset change, experiment, or implementation slice.

When work is associated with a Base Linear issue, preserve its `ARC-###` identifier in branch/PR context and use exactly one lifecycle statement in the PR body:

- `Fixes ARC-123` only when merging the PR fully achieves the Linear issue's intended outcome and no visual review, responsive review, interaction review, deployment, or other explicit acceptance action remains.
- `Part of ARC-123` when the PR contributes to the outcome but review/acceptance still remains. This must not auto-close the Linear issue.
- `No Linear issue — <reason>` only for maintenance that genuinely does not need Base tracking.

Never use `Fixes ARC-...` merely because CI is green. A portfolio review issue stays open until the required visual/product judgment is complete. Prefer consolidating work into the existing launch/review outcomes instead of generating tracking noise.
