#!/bin/bash
# Rollback to a specified commit

# Default rollback to commit before GitHub Pages deployment
DEFAULT_COMMIT="eefdbda"

# Get user-specified commit (if provided)
TARGET_COMMIT=${1:-$DEFAULT_COMMIT}

echo "Rolling back to commit: $TARGET_COMMIT"

# Create a new branch to save current state
CURRENT_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_BRANCH="backup_$CURRENT_DATE"

git checkout -b $BACKUP_BRANCH
git checkout main

# Soft reset - keep changes but undo commit
git reset --soft $TARGET_COMMIT

echo "Rollback complete!"
echo "Your current changes are saved in the working directory"
echo "To discard changes and completely roll back, run:"
echo "git reset --hard $TARGET_COMMIT && git push -f origin main"
echo ""
echo "To restore the state before rollback, run:"
echo "git checkout $BACKUP_BRANCH" 