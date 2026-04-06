import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import GlowText from "../components/GlowText";

export default function Home() {
  return (
    <Layout accent="#22d3ee">
      <header className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <GlowText text="cmds" className="mb-2 inline-block" />
        <p className="text-sm text-[var(--color-accent)] font-bold mb-6 tracking-widest">
          .cc
        </p>
        <p className="text-lg text-[var(--color-text)] mb-3">
          Commands for Claude Code
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-12 max-w-lg mx-auto">
          Safety hooks, agent skills, and CLI tools — installable with one
          command.
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-3">
          <Link
            to="/hooks"
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[#facc15] transition-colors flex items-center gap-6"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-[#facc15] font-bold mb-1">/hooks</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Safety guardrails for CLI tools. Block destructive commands,
                auto-format code, and more.
              </p>
            </div>
            <div className="bg-[var(--color-bg)] rounded px-3 py-2 shrink-0">
              <code className="text-xs text-[var(--color-text)] whitespace-nowrap">
                $ npx @cmds-cc/hooks add owner/repo
              </code>
            </div>
          </Link>
          <Link
            to="/skills"
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[#4ade80] transition-colors flex items-center gap-6"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-[#4ade80] font-bold mb-1">/skills</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Agent skills for Cisco UC, network engineering, and DevOps.
              </p>
            </div>
            <div className="bg-[var(--color-bg)] rounded px-3 py-2 shrink-0">
              <code className="text-xs text-[var(--color-text)] whitespace-nowrap">
                $ npx skills add cmds-cc/skills
              </code>
            </div>
          </Link>
          <Link
            to="/mcp"
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[#c084fc] transition-colors flex items-center gap-6"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-[#c084fc] font-bold mb-1">/mcp</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                MCP servers for Cisco Support APIs. Connect Claude to bug
                search, case management, and more.
              </p>
            </div>
            <div className="bg-[var(--color-bg)] rounded px-3 py-2 shrink-0">
              <code className="text-xs text-[var(--color-text)] whitespace-nowrap">
                $ claude mcp add cisco-support npx mcp-cisco-support
              </code>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
