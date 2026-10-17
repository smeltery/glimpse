# Review comments

Comments persist as JSON in the session store. A comment has `id`, `file`,
`line`, `side`, `body`, `severity`, `author`, `resolved`, and `createdAt` fields.

## List comments

`GET /api/comments` returns HTTP 200 and all comments, including resolved ones,
sorted by file and line. An empty store currently serializes as `null`.

```sh
curl --fail http://localhost:5391/api/comments
```

## Create a comment

`POST /api/comments` returns HTTP 201 and the created comment. HTTP-created
comments have author `user`. The suggested severities are `must-fix`,
`suggestion`, `nit`, and `question`; omitted severity becomes `suggestion`.

```sh
curl --fail http://localhost:5391/api/comments \
  -H 'Content-Type: application/json' \
  -d '{"file":"main.go","line":12,"side":"new","body":"Handle the error.","severity":"must-fix"}'
```

Malformed JSON returns 400. Persistence failures return 500. The API currently
does not enforce required fields or validate file paths and line ranges.

## Resolve a comment

`PATCH /api/comments/{id}` marks the comment resolved. No body is required.
It returns HTTP 200 with `{"status":"resolved"}`, or 404 for an unknown ID.

```sh
curl --fail -X PATCH http://localhost:5391/api/comments/COMMENT_ID
```

## Delete a comment

`DELETE /api/comments/{id}` removes the comment. It returns HTTP 200 with
`{"status":"deleted"}`, or 404 for an unknown ID.

```sh
curl --fail -X DELETE http://localhost:5391/api/comments/COMMENT_ID
```

Unsupported methods return 405; OPTIONS is supported for preflight requests.
There is no GET-by-ID endpoint. Resolve and delete currently report persistence
errors as 404 too, so inspect the response text when diagnosing failures.
