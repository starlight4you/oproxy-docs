#!/bin/zsh

# Double-click this file in Finder to commit every project change and push it
# to the current Git branch on GitHub.
cd "$(dirname "$0")" || exit 1

echo "Preparing GitHub update..."

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This folder is not a Git repository."
  read -k 1 "?Press any key to close..."
  exit 1
fi

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  echo "No current branch is checked out."
  read -k 1 "?Press any key to close..."
  exit 1
fi

git add -A

if git diff --cached --quiet; then
  echo "No changes to push."
  read -k 1 "?Press any key to close..."
  exit 0
fi

message="docs: update $(date '+%Y-%m-%d %H:%M')"
echo "Creating commit: $message"
if ! git commit -m "$message"; then
  echo "Could not create the commit."
  read -k 1 "?Press any key to close..."
  exit 1
fi

echo "Pushing $branch to GitHub..."
if git push origin "$branch"; then
  echo "Done — your project is up to date on GitHub."
else
  echo "The commit was created, but the push did not finish. Please check the message above."
fi

read -k 1 "?Press any key to close..."
