# CLI reference

Run Glimpse from a Git repository. Use `glimpse --help` for the installed
version's command list.

## Compare changes

| Command                                 | Comparison                        |
| --------------------------------------- | --------------------------------- |
| `glimpse`                               | Staged and unstaged changes       |
| `glimpse HEAD~1`                        | Changes since the previous commit |
| `glimpse main`                          | Working tree against main         |
| `glimpse main..feature`                 | Two refs                          |
| `glimpse main feature`                  | Two refs, positional form         |
| `glimpse --base main --compare feature` | Two refs, explicit form           |
| `glimpse v1.0.0 v2.0.0`                 | Two release tags                  |

Commits, branches, and tags are accepted wherever a ref is expected.

## Viewer options

| Flag              | Default                | Purpose                                    |
| ----------------- | ---------------------- | ------------------------------------------ |
| `--base <ref>`    | None                   | Base ref                                   |
| `--compare <ref>` | Working tree           | Comparison ref                             |
| `--port <number>` | Auto, starting at 5391 | Listen port                                |
| `--no-open`       | false                  | Do not launch the browser                  |
| `--dark`          | true                   | Use `--dark=false` for light mode          |
| `--unified`       | false                  | Use a unified rather than split diff       |
| `--quiet`         | false                  | Reduce terminal output                     |
| `--new`           | false                  | Stop the existing instance and start fresh |

## Other commands

```sh
glimpse tree                       # browse files without a diff
glimpse list                       # list running instances
glimpse list --json                # machine-readable instance list
glimpse review --focus security    # review through the Claude CLI
glimpse resolve                   # print open diff comments
glimpse resolve abc123             # print one comment
glimpse resolve-tree              # print open tree comments
glimpse init                      # create the config file
glimpse version                   # print version information
```

`review` needs a running diff instance and a working `claude` command.
`resolve` and `resolve-tree` print feedback for an agent; they do not edit code
by themselves. See [workflows](workflows.md) for the skill-based workflow.

## Multiple repositories

Each repository gets a free port. Existing instances are reused. Inspect the
actual URL using `glimpse list`; do not assume every project uses port 5391.
Use `--new` when changing the comparison or refreshing a captured diff.
