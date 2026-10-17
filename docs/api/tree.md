# Tree and file data

Start `glimpse tree` before using the file browser API. Discover its port with
`glimpse list`; diff and tree sessions may use different ports.

## List files

`GET /api/tree` returns HTTP 200 with `repo` and a `files` array of paths.
Outside tree mode it returns `{"files":[]}`.

```sh
curl --fail http://localhost:5391/api/tree
```

## Read a file

`GET /api/file?path=…` returns HTTP 200 with `path` and `content` strings.
URL-encode the relative repository path:

```sh
curl --fail --get http://localhost:5391/api/file \
  --data-urlencode 'path=main.go'
```

Missing paths or a non-tree server return 400. Unreadable files return 404.
The current handler reads paths directly from the working tree without a path
containment check. Only request trusted paths and do not expose the server to
untrusted callers. These read handlers currently do not enforce HTTP methods.
