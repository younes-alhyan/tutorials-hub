## Main (from 3 to 6)
- `git status` // to see file tracking
- `git add` // to track files
- `git commit -m ""` // to commit changes
- `git restore --staged <file>` or `git reset HEAD <file>` // unstage tracking
- `git reset --soft HEAD~1` // Undo the last commit
- `git push` // to push to remote repository
- `git pull <remote>` // to pull changes from remote repository

## Config (7 and 11)
- `git config --global --edit` // to edit configs
- `git config --global alias.<shortcut> <command>` // to make shortcuts

## Branching (video number 12)
- `git branch` // display branches
- `git branch -d <branch_name>` // delete branch
- `git branch <branch_name>` // add branch
- `git checkout <branch_name>` // navigate to branch
- `git checkout -b <branch_name>` // create and navigate to branch
- `git merge <branch_to_merge>` // merge branch

## Stash (13 and 14)
- `git stash` // stash files
- `git stash pop stash@{<index>}` // unstash files with removing stash (last one is the default)
- `git stash ls` // display stashes
- `git stash save "msg"` // add custom message to stash
- `git stash apply` // unstash files without removing stash
- `git stash drop` // remove stash
- `git stash show` // display stash elements
- `git stash clear` // remove all stashes

## Clean (video number 15 and 16)
- `git clean -n` // display files that would be removed
- `git clean -f` // remove files
- `git log` // display commit history

## Ignore (video number 17)
- `touch .gitignore` // create ignore config file
- In `.gitignore` file:
  - `*.<type>` // to ignore all files with extension `.type`
  - `!<file>.<type>` // to not ignore specific file with extension `.type` (even if it's `.type`)
  - `<dir>/` or `<file>` // to ignore specified directory or file
- `git add -f <file>` // force add

## Tagging And Releasing (18 and 19)
- `git tag <version>` // add tag
- `git describe --tags --abbrev=0` // current tag
- `git tag` // display tags
- `git tag -d <tag>` // delete tag

### Tags types:
- `git tag -a <tag_name> -m "Tag message"` // Annotated tags: Annotated tags are stored as full objects in the Git database.
- `git tag <tag_name>` // Lightweight tags: Lightweight tags are simply pointers to specific commits, similar to branches.
- `git tag -s <tag_name> -m "Tag message"` // Signed tags: Signed tags are annotated tags that are cryptographically signed using a GPG key
