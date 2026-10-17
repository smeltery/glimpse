import { GitBranch, MessageSquare, Check } from "lucide-react";

export function DiffPreview() {
  return (
    <div
      className="diff-preview"
      aria-label="Illustration of an inline code review"
    >
      <div className="preview-bar">
        <span className="window-dots">● ● ●</span>
        <span>glimpse / your-project</span>
        <GitBranch size={15} />
      </div>
      <div className="preview-body">
        <aside>
          <p>CHANGED FILES</p>
          <span className="selected-file">
            main.go <b>M</b>
          </span>
          <span>
            server.go <b>M</b>
          </span>
          <span>
            README.md <b>M</b>
          </span>
          <div className="preview-summary">
            <span className="addition">+18</span>
            <span className="deletion">−7</span>
          </div>
        </aside>
        <div className="preview-code">
          <div className="file-title">
            main.go <span>+4 −1</span>
          </div>
          <pre tabIndex={0}>
            <code>
              <span className="code-context">12 func main() &#123;</span>
              <span className="code-delete">13 − server.Start()</span>
              <span className="code-add">13 + if err := server.Start();</span>
              <span className="code-add">14 + err != nil &#123;</span>
              <span className="code-add">15 + log.Fatal(err)</span>
              <span className="code-add">16 + &#125;</span>
              <span className="code-context">17 &#125;</span>
            </code>
          </pre>
          <div className="review-note">
            <div>
              <MessageSquare size={15} />
              <strong>A second pair of eyes.</strong>
            </div>
            <p>Handle the error before this ships.</p>
            <span>
              <Check size={13} /> Feedback, right where it belongs.
            </span>
          </div>
        </div>
      </div>
      <div className="preview-bottom">
        <span>
          <span className="status-dot" />
          Local review
        </span>
        <span>Split diff · 3 files</span>
      </div>
    </div>
  );
}
