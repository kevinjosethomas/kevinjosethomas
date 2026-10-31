# Website performance optimization pipeline

This change adds the performance pipeline and the minimal valid-markup hydration prerequisite in `mdx-components.tsx`. All other application runtime files and every public asset remain byte-identical. Original tools-only control evidence remains immutable. Production is https://www.kevinjosethomas.com/; these measurements are **local laboratory data**, never field/Core Web Vitals claims. No candidate is accepted on a Lighthouse score.

## Prerequisites and setup

- Node **20.9+**, npm, Git, a committed clean attached checkout, and a supported macOS/Linux Zeroshot binary host. CI uses Node 20. This checkout's application framework remains Next 16.1.6/React 19/Tailwind 4.
- `npm ci` installs the lockfile (including exact development-only Playwright 1.58.2, pixelmatch 7.1.0, pngjs 7.0.0 and Zeroshot 10.23.0). Wait for exit 0 before running anything. Do not install an unpinned alternate tool list.
- `node performance/setup-tools.mjs` places `kevin-performance-zeroshot` under `$ZEROSHOT_TOOLS/bin` if provided, otherwise `~/.local/bin`. Use an executable tools filesystem, never `/tmp`. This symlink uses the pinned checkout package. Recreate it if the checkout moves; it refuses to overwrite another tool.
- macOS defaults to `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Else use `PERFORMANCE_CHROME=/absolute/path/to/chrome` or `--chrome /absolute/path`. Without either on Linux, use the matching cached Playwright Chromium or install it with `npx playwright install chromium` (system libraries may also be needed).
- The agent lane uses local `codex` on PATH with its existing login. The runtime example is secret-free; no auth tokens are copied into Git/evidence. Model/provider choices are explicit in `runtime.example.json`.
- Zeroshot state/config must be **outside and disjoint from** this repository, including symlink-resolved paths. For example `/private/tmp/kevin-performance-state` (macOS) or `$HOME/.local/state/kevin-performance` (Linux). State is not a standalone executable tool. Never reuse the supervisor's running controller state directory.
- Production builds and local servers need normal process/network access. On a restricted host, `EPERM` at listen/build is an environment failure; retain logs and arrange permitted execution. Do not downgrade Next or mute its validation. Never install dependencies while an audit or build is active. Coordinate with the supervisor before building: Next's `.next/lock` and `.performance/build.lock` prevent competing builds. Never delete a live lock or rebuild while reviewers consume the server.

## Capture baseline, unchanged candidate and compare

From the repository root, sequentially (never two browser audits on this host):

```sh
npm ci
npm run lint
npx tsc --noEmit
npm run perf:test
npm run perf:build
npm run perf:audit -- --out .performance/baseline
# Implement exactly one focused optimization, or leave source unchanged for a proof.
# After an application/lockfile change, build again before auditing.
npm run perf:audit -- --out .performance/candidate --samples 3
npm run perf:compare -- --baseline .performance/baseline --candidate .performance/candidate --out .performance/comparison.json
# Optional pipeline proof only. NEVER eligible for an optimization/merge:
npm run perf:compare -- --baseline .performance/baseline --candidate .performance/candidate --parity-only --out .performance/parity-proof.json
```

The original checkout emitted React production hydration error #418 on `/work/intellect`, independently recorded in `.performance/supervisor-hydration/errors.json`. The valid-markup prerequisite replaces the full-width image's invalid paragraph-nested div with a block-styled span retaining the original margin and width classes. Zero-error and full pixel/content verification of this prerequisite is required before publication. Normal optimization audits are required after verifying the repair; original proof evidence and its recorded errors remain immutable historical controls. The historical proof commands were:

```sh
npm run perf:audit -- --out .performance/baseline-proof --parity-only
npm run perf:audit -- --out .performance/candidate-proof --parity-only
npm run perf:compare -- --baseline .performance/baseline-proof --candidate .performance/candidate-proof --parity-only --out .performance/parity-proof.json
# Expected exit 2 (plateau) for an unchanged source, never optimization approval:
npm run perf:compare -- --baseline .performance/baseline-proof --candidate .performance/candidate-proof --out .performance/unchanged-comparison.json
```

Audit `--parity-only` still collects the full real timing/network samples and all screenshots/interactions, but tags the report `proofOnly:true` and records every runtime error with route/viewport/message. Matching errors must compare exactly; additional/different errors fail. Such evidence is **never optimization eligible**, even if its measured performance improves. Normal audit still fails on these errors and retains diagnostics; no validation failure is muted. Proof evidence cannot establish a new optimization baseline; use zero-error normal audits for subsequent optimizations. Comparator `--parity-only` cannot turn a failed normal audit/partial file into complete evidence.

`perf:build` executes the existing `npm run build` and stamps its production BUILD_ID, runtime/asset hash, lockfile hash, Node version and time. It rejects concurrent builds and changes during the build. Audit rejects missing/stale stamps, a dev server or mismatched production JS. An unwrapped `npm run build` remains supported for development/CI, but audit requires a fresh `perf:build` stamp.

Audit owns an ephemeral-loopback-port `next start` process, verifies readiness and production static JS against the exact local build, and cleans it up on success, errors and SIGINT/SIGTERM. It never kills someone else's server. To use an existing production origin:

```sh
npm run perf:audit -- --out .performance/deployed-baseline --base-url https://www.kevinjosethomas.com --samples 5
```

This **requires matching local production static scripts/build provenance**; an arbitrary deployment or a locally different build is rejected. Remote tests are `deployed-lab`, still not field data, and cannot be compared to `local-lab`. The same browser/version, platform, viewport/config, route set and sample count must match. Use matching build artifacts when testing deployments. Local analytics may request a Vercel-only endpoint that returns 404; the response/failure is retained, not stubbed, and only that exact loopback local-lab Script GET 404 is allowed in normal and proof audits. Deployed analytics execution and credentials must separately be verified by the supervisor before publication; local parity cannot establish production analytics delivery.

Each output directory must be new, empty and under ignored `.performance/`. Failed attempts leave diagnostics/partial samples, **without** a complete `audit.json`. Never rename a partial file into valid evidence. Retain original `audit.json`, PNGs, `last-network.json`, `server.log` and comparison JSON. Only the worker may rebuild or run browser timing. Reviewers may read those immutable files and run pure comparator tests; avoid other CPU-heavy work during collection. A host-wide, user-scoped exclusive lease is shared by wrapped builds and audits, so a build cannot invalidate an active audit. It also rejects audits from another checkout or execution TMPDIR: `/private/tmp/kevin-performance-<uid>/browser.lock` on macOS, `/tmp/kevin-performance-<uid>/browser.lock` on Linux. The fixed path deliberately ignores TMPDIR and HOME overrides. Its directory is private (0700), lease is exclusive (0600), and JSON records PID/token/time. Live, inaccessible, malformed and stale leases all fail closed; stale PID diagnostics do not automatically steal a lease. After SIGKILL, first verify the recorded PID and any orphaned server/browser, then manually remove that stale lease. Normal cancellation aborts pending readiness/static fetches, joins the immediately registered server and even an in-flight browser acquisition, and releases the lease only after cleanup succeeds. A cleanup failure retains the lease for investigation.

## What is measured and preserved

`config.json` fixes five representative timing routes (`/`, `/work`, Prime Intellect, Vercel and ASL); all 14 currently known routes are covered for visual/content parity. The complete route set is discovered directly from `content/experiences/*.mdx` plus `/` and `/work`; additions cannot disappear from required coverage. Every timing route has at least **3** independent cold contexts (configurable 3–30), run serially, desktop 1440×900 at device scale 1. Disk cache is disabled, service workers blocked, timezone/locale fixed. Measurement runs the actual production JS for 5 seconds after load with normal animations, analytics, prefetch and navigation intact. No request blocking, image substitution or preload rewriting occurs.

Raw CDP requests include request ID/redirect hop, URL, type, method and normalized request headers **before response headers arrive**, followed by status, MIME, timing, received wire bytes and explicit terminal state. `networkPolicy:terminal-requests-v2` is required by both audit and comparator; older evidence must be recaptured. Successful response transfer uses `Network.loadingFinished.encodedDataLength` (response headers plus encoded/compressed body, not request bytes). Required document/script/style/font/image/fetch resources must successfully finish with HTTP 2xx. Missing terminal evidence, pending, failed or partial HTTP-200 downloads fail before any improvement calculation, even if the separate parity capture succeeds. Redirects require a matching next request hop. All raw failure records must match their requests exactly, including failures before any response.

The only framework cancellation exception is a same-origin GET Fetch to a known route with `_rsc`, actual `RSC:1` and `Next-Router-Prefetch:1` or `Next-Router-Segment-Prefetch` headers (or Next 16’s second-stage refetch tree paired with an earlier successful same-target `/_tree` prefetch and the unchanged document referer/Next-URL), and `canceled:true` / `net::ERR_ABORTED` with no blocked reason; a response, if present, must be 2xx `text/x-component`. These speculative records retain header plus encoded data bytes received before cancellation. For total-transfer improvement, a transparent `complete-required-resources` basis excludes ALL identified speculative RSC prefetches (completed, redirected or canceled) and precisely the expected local platform response. All required successful resources and complete redirect bytes count. Per-sample eligible/excluded bytes and medians are reported, with separate prefetch/platform exclusions. At least 2048 bytes AND 2% of the raw baseline total must be saved with all-sample separation. Partial required downloads still fail. The exact loopback local-lab `/_vercel/insights/script.js` Script GET 404 is expected local infrastructure in normal and proof mode, with raw response/failure retained. Deployed-lab rejects it, as do all other failed assets. Analytics source and request coverage must match; the supervisor must verify actual deployed analytics before application merge. There is no blanket `/_vercel/` or third-party failure exception.

JS/CSS and total transfer sums retain every raw request, including allowed cancellations and local platform responses, for all regression checks. Improvement exclusions never alter these raw totals. These are observation-window wire bytes, not disk bundle sizes or whole-session bandwidth.

Observable UX, visible load timing, used-font preload, and page navigation/prefetch behavior must remain unchanged. Removing redundant off-route hints and never-used font variants is allowed only when full evidence passes. No font or media scheduling optimization is part of this integration change.

Buffered browser observers collect LCP (ms), CLS (excluding recent input), long-task duration (ms) and TBT (sum of long-task excess over 50ms). Medians are recomputed from raw samples; empty, missing, non-finite, mismatched, cached or inconsistent evidence fails. These are single-host unthrottled lab observations; LCP is the latest candidate in the fixed window. Repeat noisy tests with more samples, a quiet host and new evidence directories; never cherry-pick individual samples or edit raw reports.

Every route is captured at **desktop 1440×900 and mobile 390×844**, initial viewport, middle of document and bottom. Screenshots are viewport captures, not screenshots of random third-party embeds. The existing pages have no such embeds. All local visible images must decode. Screenshots use Playwright's test-only CSS animation disabling and hidden caret. The local `inference-header.svg` has CSS animations inside an image document that Playwright cannot directly pause, so parity capture verifies its original SHA-256 and adds an animation/transition-disabling stylesheet to that test-only SVG response. Its source file, image URL/attributes, static image content and timing responses stay intact; it is never masked. The explicit capture policy must match in both reports; timing measurements and the application keep their actual animations. Computed animation names/durations/iteration counts are also captured. Only the four explicitly inventoried animated GIFs (`kos-mujoco.gif`, `ksim-1.gif`, `ksim-2.gif`, `v0-auto.gif`) may be masked; each has multiple animation frames, and each mask records the matching public asset SHA-256. Static GIFs or new unreviewed GIFs cannot be masked. Content and data source manifests must also remain byte-identical, protecting copy and links in unmounted team/filter states. Every public asset must be identical across versions, so a masked animation/quality change cannot pass. The instrumentation client and PostHog server source hashes and observed analytics endpoint coverage must also match; reviewers separately inspect the layout and analytics calls. No arbitrary selectors or external randomness masks are accepted.

Parity uses a separate Chrome process with fixed software rasterization, compositor and font flags (recorded verbatim in `parity.renderFlags`) to avoid nondeterministic GPU image resampling. The renderer flags and browser version must match in both reports. Timing uses normal Chrome without these flags. The test-only capture stylesheet disables CSS animation/transition and holds the existing work entrance at its final scale/opacity, retaining its containing-block geometry. The exact stylesheet must match in both reports. These are test-rendering settings, with original full-quality assets and application source intact.

Pixelmatch uses **threshold 0.05, includeAA true, zero pixels beyond that threshold**, plus **at most 128 raw differing pixels per screenshot and at most 12/255 change in any channel**. All three conditions must pass. This is a bounded local rasterization allowance: below 0.01% of desktop pixels and 0.04% of mobile pixels at the configured sizes. The unchanged site on Chrome 156 retained small font/backdrop-blur rounding differences after deterministic rendering; exact raw counts and maximum channel deltas are reported, not discarded. Large-area changes, shifted edges and even a single high-contrast changed pixel fail. Dimensions and PNG hashes are verified exactly; public asset bytes and all content remain exact. No screenshot updates or tolerance relaxation is automatic. Middle/bottom scroll geometry must match. Content comparisons require exact body copy, headings/IDs, href/target/rel, image src/srcset/sizes/alt/loading/dimensions (and selected currentSrc for visible, decoded images; offscreen lazy resource selection is not a stable invariant), document language/title, metadata/canonical/icon links and control state. Missing routes, states, PNGs, hashes or content fail.

Additional screenshots/assertions cover both-width tag-filter transitions/reset, client header navigation without a document reload, detail back, direct hash scroll, team expansion/collapse, image zoom/scroll lock/Escape/click close. Desktop additionally covers keyboard palette open/search/ArrowDown/ArrowUp/Enter/Escape and TOC smooth scrolling. TOC clicks intentionally test existing scroll behavior (the component prevents default, so the URL hash need not change); direct detail hashes are tested separately. Representative interaction routes are explicit in config; initial/middle/bottom parity covers **every** detail route at both sizes. These are focused behavioral checks, not a complete accessibility certification or exhaustive every-link crawl. New interactive components require expanding these checks before optimization.

## Candidate acceptance (fail closed)

Full comparison exits **0 only for accepted optimization**, **2 for plateau**, **1 for invalid evidence, parity failure, regression or ineligible proof with an apparent improvement**. Parity-only exits 0 when all parity checks pass but always emits `accepted:false`, `optimizationEligible:false`, `reason:parity-only`; it never authorizes publication.

All parity must pass. For each timing route and each metric, a median increase must not exceed the larger of the absolute and relative regression allowances:

| Metric | Relative allowance | Absolute allowance |
| --- | ---: | ---: |
| LCP | 15% | 50ms |
| CLS | 0% | 0.02 |
| Long tasks / TBT | 20% | 50ms |
| JS / CSS response bytes | 1% | 1KiB |
| Total response bytes | 1% | 2KiB |

At least one route must also demonstrate **either** JS/total transfer savings ≥2% **and** ≥2048 bytes with the worst candidate sample below the best baseline sample by that amount; **or** median LCP savings ≥10% **and** ≥50ms with every candidate sample faster than every baseline sample. Unchanged runtime **and** unchanged lockfile always count as plateau even if timing luck looks better. This is deliberately conservative. Raw before/after medians, signed deltas, relative deltas and exact allowances are written for every route/metric, alongside improvements/regressions and pixel counts. A gain on one route never offsets a regression on another.

Do not edit thresholds, capture logic, fixture baselines, sample coverage or tools while optimizing application code. Preserve media quality, animation, analytics, observable UX, visible load timing, used-font preload, and page navigation/prefetch behavior. Redundant off-route hints and never-used font variants may be removed only with full passing evidence. Workers may consult [Vercel's live React guidance](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) for waterfall/bundle/rendering hypotheses; repository preservation requirements override any incompatible recommendation (including analytics deferral or changes to used-font preload).

## Zeroshot graph, bounded rounds and supervisor delivery

`optimization.graph.json` is adapted from `/private/tmp/next-speed-tools/next-speed.graph.json`, an exported `openengine.graph.full/v1` graph. It retains the actual native graph state, signal bindings and feedback loop. The worker implements one focused candidate. Independent `acceptance` (performance) and `code` (UI/behavior and correctness) verifiers must **both** accept. Rejection sends diagnostics back to the worker and reruns **both** reviewers. There are at most **3** worker iterations. Execution errors, malformed/refused/time-out reviewers and exhausted repairs terminate unsuccessfully. The graph contains no GitHub or Git delivery node.

Real admission, without launching any agents:

```sh
npm run perf:validate -- --state /private/tmp/kevin-performance-state --out .performance/admission.json
```

It requires the installed CLI to report exactly `zeroshot 10.23.0` and invokes real `zeroshot run ... --validate-only`. Admission verifies graph/runtime contracts, not credentials, browser dependencies or environmental capacity. `runtime.example.json` may reuse the local Codex login. It supplies no credentials or paid inference substitutions.

After the supervisor commits this pipeline and the checkout is clean, start the bounded round session:

```sh
npm run perf:rounds -- --state /private/tmp/kevin-performance-state --session .performance/rounds --rounds 3 --minutes 90
```

The runner installs from lockfile, checks lint/typecheck/gates, builds/audits a fresh baseline, creates a clean `performance/optimize-<session>-<round>` feature branch, validates immediately before submitting the graph, and records the receipt/run ID. It polls the durable [OECP status](https://the-open-engine.github.io/zeroshot/current/reference/cluster/api/) and requires `status.phase=finished` with `terminalResult.status=succeeded`, rechecks production/source provenance and reruns the full comparator. It bounds round count (1–10), graph repair count (3) and per-round observation time (1–180 minutes); timeout requests force-stop and confirms authoritative `finished` status. SIGINT/SIGTERM handlers are installed before spawning work: active local commands run in owned process groups, cancellation allows the entire group to finish cleanup (even after an npm leader exits), terminates and joins it, and a detached submission is stopped and polled until terminal. Cancellation during submission waits for its bounded receipt, persists the run ID, then stops that run; it never abandons a possibly admitted run by killing its receipt client. Unknown CLI receipt/status shapes fail closed. If a local group needs SIGKILL (which could preempt nested browser cleanup), a receipt is lost or stopping cannot be confirmed, state becomes `cleanup-unconfirmed` and the runner lease is retained; inspect external run state and owned processes before manual recovery. A successful force-stop command alone is insufficient evidence of termination. SIGKILL/host failure cannot run cleanup: preserve the lease, inspect the saved receipt/session and external run status, explicitly stop any active run, and verify owned processes before recovery. Ordinary signal cancellation exits 130/143 only after cleanup; it cannot resume automatic progression. It never commits, pushes, posts, opens PRs or merges.

An accepted round exits **3**, state `awaiting-supervisor`, with branch/evidence paths. This is a deliberate publication handoff. The supervisor may autonomously create/merge a performance PR only after both independent reviewers, full accepted comparator, current-source provenance, lint/typecheck/tests/build and required CI pass; verify analytics/behavior on the appropriate production-like environment. Never merge parity-only, plateau, missing/stale evidence, failed CI or a rejected reviewer. The runner cannot silently promote such work.

For subsequent recursive rounds, the supervisor commits/integrates the accepted branch, keeps the checkout clean, then runs:

```sh
npm run perf:rounds -- --state /private/tmp/kevin-performance-state --session .performance/rounds --resume yes
```

Resume requires a new descendant HEAD with exactly the accepted runtime manifest. It consumes the next round budget and starts a fresh baseline/feature branch. No approval interview or manual product selection is required between rounds; the supervisor owns publication. Failure, plateau or budget exhaustion stops automatic progression. Do not automatically retry a stopped session as if it succeeded. Preserve failed evidence and diagnose; a deliberately new session requires a clean checkout and new baseline.

For a failed graph attempt that has actionable reviewer feedback, use Zeroshot's retained workspace/checkpoint recovery **within the same round**, respecting its repair/round budget:

```sh
# Use the exact environment paths used for the run, not a live supervisor controller.
export ZEROSHOT_STATE_DIR=/private/tmp/kevin-performance-state
export ZEROSHOT_CONFIG_DIR="$ZEROSHOT_STATE_DIR/configuration"
node_modules/.bin/zeroshot checkpoints RUN_ID
node_modules/.bin/zeroshot resume RUN_ID --from-checkpoint CHECKPOINT_ID
```

Never use resume to bypass exhausted budgets or failed reviewers. The bounded runner stops on failures and does not auto-adopt separately resumed runs: the supervisor must independently verify the new result and full evidence, then start a new clean session. Normal rejected candidates already loop through worker + both gates inside the graph.

Focused subprocess tests additionally exercise cross-TMPDIR audit contention, stale/foreign leases, cancellation during server readiness/static verification and pending browser acquisition, failure before response headers, and runner SIGINT/SIGTERM during local work, detached polling and pending receipts using a harmless stub CLI (never real agent submission). Focused tests exercise real comparator behavior: stable improvement, unchanged plateau, across-route regressions (including CLS/long tasks/bytes), missing/invalid/mismatched samples, content/link/image/metadata/control changes, masked asset substitutions, missing PNGs, a high-contrast changed pixel, subtle changes exceeding either raw pixel-count or channel bounds, and external-state path overlap. CI runs those tests and graph admission on Node 20; it keeps the normal lint/build/typecheck checks. CI does not assert noisy shared-runner speed scores. See ignored `.performance/verification.md` for this checkout's real evidence and any environmental limitations.
