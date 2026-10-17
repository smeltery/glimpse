# Read a diff

`GET /api/diff` returns the comparison captured when the server started.
Restart the viewer to update it after a new edit.

## Request

```sh
curl --fail http://localhost:5391/api/diff
```

## Response

A successful request returns HTTP 200 with a JSON object.

| Field                           | Meaning                             |
| ------------------------------- | ----------------------------------- |
| `repo`                          | Repository name                     |
| `base`, `compare`               | Comparison refs                     |
| `summary`                       | Human-readable change summary       |
| `files`                         | Parsed files, hunks, and diff lines |
| `viewMode`                      | `split` or `unified`                |
| `theme`                         | `dark` or `light`                   |
| `prOwner`, `prRepo`, `prNumber` | Present for PR comparisons          |

The parser's file shape is defined in `internal/diff/parser.go`.
Empty or tree-only sessions may return an empty diff payload.
The current read handler does not enforce an HTTP method; clients should use GET.
