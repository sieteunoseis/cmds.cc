import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GlowText from "../components/GlowText";
import CopyButton from "../components/CopyButton";

interface Skill {
  name: string;
  description: string;
  author?: string;
  tag?: string;
}

const SKILLS_URL =
  "https://raw.githubusercontent.com/cmds-cc/skills/master/skills.json";

const INSTALL_CMD = "npx skills add cmds-cc/skills";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SKILLS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch skills: ${res.status}`);
        return res.json();
      })
      .then((data: Skill[]) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout accent="#4ade80">
      <header className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">
        <GlowText
          text="skills"
          className="text-4xl sm:text-5xl font-bold leading-tight mb-8 inline-block"
        />
        <p className="text-lg text-[var(--color-text)] mb-3">
          Agent skills for Claude Code
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-lg mx-auto">
          Specialized CLI tools for Cisco UC and DevOps, installable via{" "}
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
          >
            skills.sh
          </a>
          .
        </p>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 inline-flex items-center gap-3">
          <code className="text-sm text-[var(--color-text)]">
            $ {INSTALL_CMD}
          </code>
          <CopyButton text={INSTALL_CMD} />
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        {loading && (
          <p className="text-sm text-[var(--color-text-muted)] text-center">
            Loading skills...
          </p>
        )}
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        {!loading && !error && (
          <>
            <h2 className="text-sm font-bold text-[var(--color-text)] mb-6">
              Skills ({skills.length})
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <a
                  key={skill.name}
                  href={`https://skills.sh/cmds-cc/skills/${skill.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 block hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--color-accent)] font-bold text-sm">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 rounded-full px-2 py-0.5">
                        {skill.tag}
                      </span>
                    )}
                    {skill.author && (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        by {skill.author}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {skill.description}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
