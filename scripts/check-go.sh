#!/usr/bin/env bash
set -euo pipefail
unformatted=$(gofmt -l cmd internal main.go)
if [[ -n "$unformatted" ]]; then
  printf 'Run gofmt on:\n%s\n' "$unformatted"
  exit 1
fi
go vet ./...
golangci-lint run
go test -race -coverprofile=coverage.out ./...
go tool cover -func=coverage.out | awk '/^total:/ { print; if ($3 + 0 < 50) exit 1 }'
go build -o /tmp/glimpse-check .
