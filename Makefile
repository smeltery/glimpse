BINARY := glimpse
VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo dev)
LDFLAGS := -s -w -X main.version=$(VERSION)

.PHONY: build test lint install clean vet setup check ci website
build:
	go build -ldflags "$(LDFLAGS)" -o $(BINARY) .
install:
	go install -ldflags "$(LDFLAGS)" .
test:
	go test -race -coverprofile=coverage.out ./...
vet:
	go vet ./...
lint:
	golangci-lint run
setup:
	bun install --frozen-lockfile
	bunx playwright install chromium
	pre-commit install --hook-type pre-commit --hook-type pre-push
check:
	bun run check
	actionlint
ci: check
	bash scripts/check-go.sh
	bun run --cwd website build
	bunx playwright test
website:
	bun run --cwd website dev --hostname 127.0.0.1
clean:
	rm -f $(BINARY) coverage.out
.DEFAULT_GOAL := build
