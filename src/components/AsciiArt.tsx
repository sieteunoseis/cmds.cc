import { useEffect, useRef, useState, useCallback } from "react";

// 5-line tall ASCII font — each character is 6 columns wide
const FONT: Record<string, string[]> = {
  a: [" __ _ ", "/ _` |", "| (_| |", " \\__,_|", "      "],
  b: [" _    ", "| |__ ", "| '_ \\", "| |_) |", "|_.__/"],
  c: ["  ___ ", " / __|", "| (__ ", " \\___|", "      "],
  d: ["     _ ", "  __| |", " / _` |", "| (_| |", " \\__,_|"],
  e: ["  ___ ", " / _ \\", "|  __/", " \\___|", "      "],
  f: ["  __ ", " / _|", "| |_ ", "|  _|", "|_|  "],
  g: ["  __ _ ", " / _` |", "| (_| |", " \\__, |", " |___/ "],
  h: [" _     ", "| |__  ", "| '_ \\ ", "| | | |", "|_| |_|"],
  i: [" _ ", "(_)", "| |", "| |", "|_|"],
  j: ["   _ ", "  (_)", "  | |", "  | |", " _/ |", "|__/ "],
  k: [" _    ", "| | __", "| |/ /", "|   < ", "|_|\\_\\"],
  l: [" _ ", "| |", "| |", "| |", "|_|"],
  m: [
    "  _ __ ___  ",
    " | '_ ` _ \\ ",
    " | | | | | |",
    " |_| |_| |_|",
    "             ",
  ],
  n: ["  _ __  ", " | '_ \\ ", " | | | |", " |_| |_|", "        "],
  o: ["  ___  ", " / _ \\ ", "| (_) |", " \\___/ ", "       "],
  p: ["  _ __  ", " | '_ \\ ", " | |_) |", " | .__/ ", " |_|    "],
  q: ["  __ _ ", " / _` |", "| (_| |", " \\__, |", "    |_|"],
  r: ["  _ __ ", " | '__|", " | |   ", " |_|   ", "       "],
  s: ["  ___ ", " / __|", " \\__ \\", " |___/", "      "],
  t: ["  _   ", " | |_ ", " | __|", " | |_ ", "  \\__|"],
  u: ["  _   _ ", " | | | |", " | |_| |", "  \\__,_|", "        "],
  v: ["        ", " __   __", " \\ \\ / /", "  \\ V / ", "   \\_/  "],
  w: [
    "           ",
    " __      __",
    " \\ \\ /\\ / /",
    "  \\ V  V / ",
    "   \\_/\\_/  ",
  ],
  x: [" __  __", " \\ \\/ /", "  >  < ", " /_/\\_\\", "       "],
  y: ["  _   _ ", " | | | |", " | |_| |", "  \\__, |", "  |___/ "],
  z: ["  ____", " |_  /", "  / / ", " /___|", "      "],
  ".": ["   ", "   ", "   ", " _ ", "(_)"],
  "/": ["    __", "   / /", "  / / ", " / /  ", "/_/   "],
  " ": ["   ", "   ", "   ", "   ", "   "],
  "-": ["      ", "      ", " ____ ", "|____|", "      "],
  _: ["      ", "      ", "      ", "      ", " ____ "],
};

// Characters used for the shimmer effect, ordered by visual density
const DENSITY = "░▒▓█@#%&$*+=-~:;,.·";

function buildAsciiLines(text: string): string[] {
  const rows = 5;
  const lines: string[] = Array(rows).fill("");

  for (const ch of text.toLowerCase()) {
    const glyph = FONT[ch] || FONT[" "];
    for (let row = 0; row < rows; row++) {
      lines[row] += glyph[row] || "";
    }
  }

  return lines;
}

interface CellState {
  target: string;
  isStructural: boolean; // part of the letter shape (not space)
}

function buildCells(lines: string[]): CellState[][] {
  return lines.map((line) =>
    [...line].map((ch) => ({
      target: ch,
      isStructural: ch !== " ",
    })),
  );
}

interface AsciiArtProps {
  text: string;
  className?: string;
}

export default function AsciiArt({ text, className }: AsciiArtProps) {
  const lines = buildAsciiLines(text);
  const cellGrid = buildCells(lines);
  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState<"reveal" | "shimmer">("reveal");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const preRef = useRef<HTMLPreElement>(null);
  const startTimeRef = useRef(performance.now());

  // Animation loop
  useEffect(() => {
    let raf: number;
    const revealDuration = 2000;
    const shimmerInterval = 80;
    let lastShimmerTick = 0;

    function tick(now: number) {
      const elapsed = now - startTimeRef.current;

      if (phase === "reveal" && elapsed >= revealDuration) {
        setPhase("shimmer");
      }

      if (phase === "shimmer") {
        if (now - lastShimmerTick >= shimmerInterval) {
          setFrame((f) => f + 1);
          lastShimmerTick = now;
        }
      } else {
        setFrame(Math.floor(elapsed / 30));
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLPreElement>) => {
    if (!preRef.current) return;
    const rect = preRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  // Render the frame
  const elapsed = performance.now() - startTimeRef.current;
  const totalStructural = cellGrid.flat().filter((c) => c.isStructural).length;
  const revealProgress = Math.min(elapsed / 2000, 1);
  const revealCount = Math.floor(
    revealProgress * revealProgress * totalStructural,
  );

  // Get font metrics for mouse distance calculation
  const charWidth = 9.6; // approximate for typical monospace at default size
  const lineHeight = 20;

  let structuralIndex = 0;

  const renderedLines = cellGrid.map((row, rowIdx) => {
    const spans: JSX.Element[] = [];

    row.forEach((cell, colIdx) => {
      if (!cell.isStructural) {
        spans.push(<span key={colIdx}> </span>);
        return;
      }

      structuralIndex++;

      // Calculate distance from mouse
      let mouseDist = Infinity;
      if (mousePos) {
        const cx = colIdx * charWidth;
        const cy = rowIdx * lineHeight;
        mouseDist = Math.sqrt((mousePos.x - cx) ** 2 + (mousePos.y - cy) ** 2);
      }

      const mouseRadius = 60;
      const isNearMouse = mouseDist < mouseRadius;

      if (phase === "reveal") {
        if (structuralIndex <= revealCount) {
          // Revealed — show the actual character
          spans.push(
            <span key={colIdx} className="text-[var(--color-accent)]">
              {cell.target}
            </span>,
          );
        } else {
          // Not yet revealed — show cycling density character
          const charIdx = (structuralIndex + frame) % DENSITY.length;
          spans.push(
            <span
              key={colIdx}
              className="text-[var(--color-accent)]"
              style={{ opacity: 0.3 }}
            >
              {DENSITY[charIdx]}
            </span>,
          );
        }
      } else {
        // Shimmer phase — subtle character cycling on structural chars
        if (isNearMouse) {
          // Near mouse: scramble intensely
          const charIdx =
            (structuralIndex * 7 + frame * 3 + colIdx + rowIdx) %
            DENSITY.length;
          spans.push(
            <span key={colIdx} className="text-[var(--color-accent)]">
              {DENSITY[charIdx]}
            </span>,
          );
        } else {
          // Subtle shimmer — occasionally flicker a character
          const noise =
            Math.sin(structuralIndex * 0.7 + frame * 0.15) *
            Math.cos(colIdx * 0.3 + rowIdx * 0.9 + frame * 0.08);

          if (noise > 0.85) {
            const charIdx = (structuralIndex + frame) % DENSITY.length;
            spans.push(
              <span
                key={colIdx}
                className="text-[var(--color-accent)]"
                style={{ opacity: 0.6 }}
              >
                {DENSITY[charIdx]}
              </span>,
            );
          } else {
            spans.push(
              <span key={colIdx} className="text-[var(--color-accent)]">
                {cell.target}
              </span>,
            );
          }
        }
      }
    });

    return (
      <div key={rowIdx} className="leading-5">
        {spans}
      </div>
    );
  });

  return (
    <pre
      ref={preRef}
      className={`select-none cursor-default inline-block text-sm sm:text-base ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {renderedLines}
    </pre>
  );
}
