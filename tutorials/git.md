# 📁 Git Tutorial

[<img src="../icons/git.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=git)  
**Master Git for version control, collaboration, and professional development.** 🚀
This tutorial covers all the essential Git commands and concepts you need to confidently work on projects, internships, and personal repositories.

## 📌 Table of Contents

1. [Getting Started](#🏁-getting-started)
2. [Basic Commands](#💻-basic-commands)
3. [Branching & Merging](#🌿-branching--merging)
4. [Remote Repositories](#🌐-remote-repositories)
5. [Undoing Changes](#🔄-undoing-changes)
6. [Stashing](#🧳-stashing-changes)
7. [Viewing History](#📜-viewing-history)
8. [Tags](#🏷️-tags)
9. [Best Practices](#✅-best-practices)

## 🏁 Getting Started

```bash
git init            # Initialize a local repository
git status          # Check the status of your repo
git add <file>      # Stage file for commit
git commit -m "msg" # Commit staged changes
```

> After `git init`, a `.git` folder is created to track your project history.

## 💻 Basic Commands

- `git restore <file>` → undo local changes
- `git reset <file>` → unstage changes
- `git log` → view commit history
- `git log --oneline --graph --all` → visual graph of commits

## 🌿 Branching & Merging

### Branching

```bash
git branch              # List branches
git branch <name>       # Create a new branch
git checkout <name>     # Switch to branch
git checkout -b <name>  # Create + switch in one
```

### Merging

```bash
git checkout main
git merge feature-branch
```

- `main` = primary stable branch
- `feature-branch` = branch with new changes
- Resolve conflicts if Git asks

## 🌐 Remote Repositories

- Add remote:

```bash
git remote add origin <repo_url>
```

- Push changes:

```bash
git push -u origin main
```

- Pull changes:

```bash
git pull origin main   # fetch + merge
git fetch origin       # fetch only, does NOT change local files
```

- View remote branches:

```bash
git branch -r
git remote -v
```

## 🔄 Undoing Changes

- Undo unstaged changes:

```bash
git restore <file>
```

- Unstage a file:

```bash
git restore --staged <file>
```

- Undo last commit (keep changes staged):

```bash
git reset --soft HEAD~1
```

- Undo last commit completely:

```bash
git reset --hard HEAD~1
```

> ⚠️ Be careful with `--hard` as it deletes changes permanently.

## 🧳 Stashing Changes

```bash
git stash       # Save changes temporarily
git stash list  # See stashed changes
git stash pop   # Apply saved changes back
```

## 📜 Viewing History

- `git log` → detailed commit history
- `git diff` → show unstaged changes
- `git diff --staged` → show staged changes

## 🏷️ Tags

Tags are used to mark **specific points in history**, usually for releases or milestones.

- List tags:

```bash
git tag
```

- Create a tag:

```bash
git tag v1.0
```

- Push tags to remote:

```bash
git push origin v1.0       # single tag
git push origin --tags      # all tags
```

- Checkout a tag (read-only state):

```bash
git checkout v1.0
```

> Use tags to mark stable releases, version milestones, or project checkpoints.

## ✅ Best Practices

- Always work on **feature branches**
- Keep `main` stable
- Commit often with **clear messages**
- Pull frequently to avoid conflicts
- Use `.gitignore` to avoid committing unnecessary files
