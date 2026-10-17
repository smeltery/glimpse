import Link from "next/link";
import {
  GitBranch,
  MessageSquare,
  FolderTree,
  Terminal,
  Check,
  Github,
} from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/components/MarketingLayout";
import { CopyButton } from "@/components/CopyButton";
import { DiffPreview } from "@/components/DiffPreview";

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main id="main">
        <section className="wrap hero">
          <div>
            <p className="eyebrow">
              <span className="status-dot" />A clearer view of your code
            </p>
            <h1>
              Small changes.
              <br />
              <em>Better perspective.</em>
            </h1>
            <p className="hero-copy">
              Your code changed. See the whole story.
              <br />
              Review Git diffs, leave a note, and keep your
              <br className="desktop-break" /> coding agent in the loop.
            </p>
            <div className="hero-actions">
              <Link prefetch={false} className="button" href="/docs/">
                Get started <span aria-hidden="true">→</span>
              </Link>
              <Link
                prefetch={false}
                className="text-link"
                href="/docs/workflows/"
              >
                See how it works
              </Link>
            </div>
            <p className="hero-footnote">
              One Go binary <span>·</span> Your browser <span>·</span> Any
              coding agent
            </p>
          </div>
          <div className="hero-demo">
            <DiffPreview />
            <p>YOUR CHANGES. A LITTLE MORE CONTEXT.</p>
          </div>
        </section>
        <div className="wrap benefit-strip">
          <p>
            Small diffs.
            <br />
            <strong>Thoughtful reviews.</strong>
          </p>
          <span>
            <GitBranch />
            Compare with clarity
          </span>
          <span>
            <MessageSquare />
            Leave useful feedback
          </span>
          <span>
            <Check />
            Ship with confidence
          </span>
        </div>
        <section className="wrap section" id="features">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Built around the review</p>
              <h2>
                Less back and forth.
                <br />
                <em>More understanding.</em>
              </h2>
            </div>
            <p>
              Everything you need to see what changed.
              <br />
              Nothing between you and your code.
            </p>
          </div>
          <div className="feature-grid">
            {[
              {
                icon: GitBranch,
                title: "See the difference.",
                text: "Working changes, branches, commits, and tags. Familiar split diffs with syntax highlighting.",
                link: "/docs/cli/",
                label: "Compare changes",
              },
              {
                icon: MessageSquare,
                title: "Make feedback useful.",
                text: "Leave a comment on the line that matters. Share it with your agent and review the fix.",
                link: "/docs/workflows/",
                label: "Review with an agent",
              },
              {
                icon: FolderTree,
                title: "Keep the whole picture.",
                text: "Browse project files without a diff. Pull in a GitHub PR when the conversation moves there.",
                link: "/docs/workflows/#browse-the-project",
                label: "Explore your project",
              },
            ].map((item) => (
              <article className="feature" key={item.title}>
                <item.icon size={25} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link prefetch={false} className="text-link" href={item.link}>
                  {item.label}
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="workflow-section" id="how-it-works">
          <div className="wrap workflow-grid">
            <div>
              <p className="eyebrow">Your workflow, with a better view</p>
              <h2>
                Keep your tools.
                <br />
                <em>Add perspective.</em>
              </h2>
              <p className="section-copy">
                Glimpse sits between a Git diff and your next decision. Use your
                preferred agent, or review it yourself.
              </p>
              <Link
                prefetch={false}
                className="text-link"
                href="/docs/workflows/"
              >
                Read the review workflow
              </Link>
            </div>
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Open a diff.</h3>
                  <p>
                    Run <code>glimpse</code> in your repository. Your browser
                    takes it from there.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Leave a thought.</h3>
                  <p>
                    Pin feedback to a line, a file, or a part of the project.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Close the loop.</h3>
                  <p>
                    Pass the comments to your agent. Review the changes before
                    you commit.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section className="wrap install-section" id="quick-start">
          <div>
            <p className="eyebrow">One command to a clearer view</p>
            <h2>
              Your next review
              <br />
              <em>starts here.</em>
            </h2>
            <p>Install with Go. Open a repository. Take a look.</p>
            <Link
              prefetch={false}
              className="text-link"
              href="https://github.com/smeltery/glimpse/releases"
            >
              Or download a release
            </Link>
          </div>
          <div className="install-card">
            <div className="terminal-heading">
              <Terminal size={18} />
              Terminal
            </div>
            <pre tabIndex={0}>
              <code>go install github.com/smeltery/glimpse@latest</code>
            </pre>
            <CopyButton text="go install github.com/smeltery/glimpse@latest" />
            <div className="terminal-rule" />
            <pre tabIndex={0}>
              <code>
                <span className="muted"># From your Git repository</span>
                {"\n"}glimpse
              </code>
            </pre>
            <p>
              <span className="status-dot" />
              macOS & Linux · Go 1.26.1+
            </p>
          </div>
        </section>
        <div className="wrap final-note" id="use-cases">
          <Github size={20} />
          <p>Built in the open. Made for your local workflow.</p>
          <Link prefetch={false} href="https://github.com/smeltery/glimpse">
            Explore the source
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
