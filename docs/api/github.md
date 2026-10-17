# GitHub review sync

These endpoints require a viewer started with a GitHub PR URL and a working,
authenticated `gh` command. Both accept POST with no body and support OPTIONS.

## Import comments

`POST /api/gh/pull` fetches GitHub review comments into the local store.
The response is HTTP 200 with `{"pulled":N}`. Repeated imports can add duplicate
comments; the current endpoint does not deduplicate them.

```sh
curl --fail -X POST http://localhost:5391/api/gh/pull
```

## Publish comments

`POST /api/gh/push` publishes local comments to the PR using your GitHub account.
This is an external write. The current implementation includes resolved comments
and does not deduplicate repeated pushes. Inspect the local list first.

```sh
curl --fail http://localhost:5391/api/comments
curl --fail -X POST http://localhost:5391/api/gh/push
```

A successful response is HTTP 200 with `{"pushed":N}`. N is the number of local
comments considered; GitHub may receive fewer if comments cannot be mapped to
diff positions. A non-PR session returns 400, an unsupported method returns 405,
and GitHub CLI failures return 500 with a plain-text error.
