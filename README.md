# Glimpse

<p align="center"><img src="website/public/logo.svg" width="64" alt="Glimpse logo"></p>

![Glimpse — Small changes. Better perspective.](website/public/og-image.png)

[![CI](https://github.com/smeltery/glimpse/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/glimpse/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/glimpse)](https://github.com/smeltery/glimpse/releases)
[![Go](https://img.shields.io/badge/Go-1.26-00ADD8?logo=go&logoColor=white)](go.mod)
[![Bun](https://img.shields.io/badge/Bun-1.3-f9f1e1?logo=bun)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](website/package.json)
[![Flox](https://img.shields.io/badge/dev-Flox-99c27c)](.flox/env/manifest.toml)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)

A browser-based Git diff viewer and code review tool. Compare working changes,
branches, commits, or pull requests; leave inline feedback; and hand comments to
your coding agent. One Go binary, with a file tree browser and local HTTP API.

```sh
go install github.com/smeltery/glimpse@latest
cd your-repository
glimpse            # staged and unstaged changes
glimpse main       # compare against main
glimpse tree       # browse the project
```

Requires Git and Go 1.26.1+ to install from source. Prebuilt macOS and Linux
binaries are available in [releases](https://github.com/smeltery/glimpse/releases).

## Documentation

Start in [docs/](docs/index.md):
[installation](docs/index.md), [CLI](docs/cli.md),
[agent and PR workflows](docs/workflows.md), [API](docs/api/index.md),
and [development](docs/development.md).

## Develop

```sh
flox activate
make setup        # frozen Bun install and local hooks
make ci           # the same checks as GitHub Actions
```

The Next.js website lives in `website/` and renders the Markdown in `docs/`.
Run `flox activate --start-services` for its local preview.

[PolyForm Shield license](LICENSE) © 2026 smeltery.
