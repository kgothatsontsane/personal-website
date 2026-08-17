#!/usr/bin/env bash
# Loop runner — implements the five moves of one turn for the gta-portfolio repo.
# Usage: ./loop-engineering/run_loop.sh [--check]   (--check runs the evaluator pass only)
#
# Guardrails (operational discipline):
#   LOOP_TOKEN_CAP   max tokens this run is allowed to spend (default 100000)
#   LOOP_MAX_TRIES   max generator/evaluator retries per task (default 2)
#   LOOP_INBOX       dir for anything the loop must not decide itself
set -euo pipefail

BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE="$BASE/loop-engineering/state/triage.md"
INBOX="$BASE/loop-engineering/inbox"
MAX_TRIES="${LOOP_MAX_TRIES:-2}"
TOKEN_CAP="${LOOP_TOKEN_CAP:-100000}"
DATE_STAMP="$(date '+%Y-%m-%d %H:%M')"

# --- 1. DISCOVERY ------------------------------------------------
mkdir -p "$BASE/loop-engineering/state" "$INBOX"
if [[ ! -f "$STATE" ]]; then
  printf '| finding | source | priority | status |\n|---------|--------|----------|--------|\n' > "$STATE"
fi

echo "[loop] $DATE_STAMP — discovery: reading $STATE"
grep -v '^| finding' "$STATE" | grep -v '^|---' | grep '|' || true

# --- 2. HANDOFF ---------------------------------------------------
handle_task() {
  local slug="$1" task="$2"
  local wd="$BASE/loop-engineering/worktrees/$slug"
  echo "[loop] handoff: $task (worktree $slug)"
  if git rev-parse --git-dir >/dev/null 2>&1; then
    git worktree add "$wd" -b "loop/$slug" 2>/dev/null || true
  else
    mkdir -p "$wd"
  fi
  echo "$wd"
}

# --- 3. GENERATION + 4. VERIFICATION ------------------------------
generate_and_verify() {
  local wd="$1" task="$2" tries=0 verdict="REJECT"
  while [[ "$verdict" == "REJECT" && "$tries" -lt "$MAX_TRIES" ]]; do
    tries=$((tries + 1))
    echo "[loop] generator attempt $tries: $task"
    # GENERATOR: the project skill / agent drafts the fix in $wd.
    #   (invoke opencode / claude / your generator agent here)
    :
    # EVALUATOR: build. Assume broken until proven otherwise.
    echo "[loop] evaluator: running build in $wd"
    if (cd "$wd" && npm run build >/dev/null 2>&1); then
      echo "[loop] evaluator: build PASSED"
      verdict="PENDING-HUMAN"
    else
      echo "[loop] evaluator: build FAILED — sending back to generator"
      verdict="REJECT"
    fi
  done
  echo "$verdict"
}

# --- 5. PERSISTENCE -----------------------------------------------
persist() {
  local slug="$1" status="$2" src="$3" prio="$4"
  printf '| %s | %s | %s | %s |\n' "$slug" "$src" "$prio" "$status" >> "$STATE"
  if git rev-parse --git-dir >/dev/null 2>&1; then
    git add "$STATE" 2>/dev/null && git commit -m "loop: persist state $DATE_STAMP" 2>/dev/null || true
  fi
}

# --- STOP (the human checkpoint) ----------------------------------
stop_gate() {
  echo "[loop] human checkpoint: output above is PENDING human review."
  echo "[loop] anything uncertain goes to $INBOX — never auto-merge."
}

echo "[loop] token cap for this run: $TOKEN_CAP"
stop_gate
echo "[loop] turn complete $DATE_STAMP"
