import { useEffect, useRef, useState, useCallback, useMemo } from "react";

// 7-row bitmap font — each letter is an array of strings, 1=filled 0=empty
// Designed to be dense and readable at small sizes
const FONT: Record<string, string[]> = {
  a: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  b: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  c: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  d: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  e: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  f: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  g: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
  h: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  i: ["111", "010", "010", "010", "010", "010", "111"],
  j: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  k: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  l: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  m: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  n: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  o: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  p: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  r: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  s: ["01110", "10001", "10000", "01110", "00001", "10001", "01110"],
  t: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  u: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  v: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  w: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  x: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  ".": ["000", "000", "000", "000", "000", "110", "110"],
  "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  " ": ["00", "00", "00", "00", "00", "00", "00"],
};

const ROWS = 7;

// Characters used for fill, ordered by visual density
const FILL_CHARS = "+=-~:;,.";
const EDGE_CHARS = "*%$#@&";

function buildBitmap(text: string): boolean[][] {
  const glyphs = [...text.toLowerCase()].map((ch) => FONT[ch] || FONT[" "]);
  const grid: boolean[][] = [];

  for (let row = 0; row < ROWS; row++) {
    const line: boolean[] = [];
    glyphs.forEach((glyph, gi) => {
      if (gi > 0) line.push(false); // 1-col gap between letters
      const glyphRow = glyph[row] || "";
      for (const ch of glyphRow) {
        line.push(ch === "1");
      }
    });
    grid.push(line);
  }

  return grid;
}

function isEdge(grid: boolean[][], row: number, col: number): boolean {
  if (!grid[row][col]) return false;
  // Check if any neighbor is empty
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
        return true;
      if (!grid[nr][nc]) return true;
    }
  }
  return false;
}

interface AsciiArtProps {
  text: string;
  className?: string;
}

export default function AsciiArt({ text, className }: AsciiArtProps) {
  const grid = useMemo(() => buildBitmap(text), [text]);
  const edges = useMemo(
    () => grid.map((row, ri) => row.map((_, ci) => isEdge(grid, ri, ci))),
    [grid],
  );

  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState<"reveal" | "live">("reveal");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const preRef = useRef<HTMLPreElement>(null);
  const startTimeRef = useRef(performance.now());

  useEffect(() => {
    let raf: number;
    const revealDuration = 1800;
    let lastTick = 0;
    const tickInterval = 100;

    function tick(now: number) {
      const elapsed = now - startTimeRef.current;

      if (phase === "reveal" && elapsed >= revealDuration) {
        setPhase("live");
      }

      if (now - lastTick >= tickInterval) {
        setFrame((f) => f + 1);
        lastTick = now;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLPreElement>) => {
    if (!preRef.current) return;
    const rect = preRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setMousePos(null), []);

  const elapsed = performance.now() - startTimeRef.current;
  const revealProgress = Math.min(elapsed / 1800, 1);
  const totalCols = grid[0]?.length || 0;
  const revealCol = Math.floor(
    revealProgress * revealProgress * (totalCols + 4),
  );

  const charW = 9.6;
  const charH = 18;

  const renderedLines = grid.map((row, ri) => {
    let line = "";
    row.forEach((filled, ci) => {
      if (!filled) {
        line += " ";
        return;
      }

      // Mouse distance
      let mouseDist = Infinity;
      if (mousePos) {
        const cx = ci * charW;
        const cy = ri * charH;
        mouseDist = Math.sqrt((mousePos.x - cx) ** 2 + (mousePos.y - cy) ** 2);
      }
      const mouseRadius = 50;
      const isNearMouse = mouseDist < mouseRadius;

      const edge = edges[ri][ci];

      if (phase === "reveal") {
        if (ci <= revealCol) {
          // Revealed
          if (edge) {
            const idx = (ci + ri + frame) % EDGE_CHARS.length;
            line += EDGE_CHARS[idx];
          } else {
            const idx = (ci * 3 + ri * 7 + frame) % FILL_CHARS.length;
            line += FILL_CHARS[idx];
          }
        } else {
          // Not yet revealed — dim random
          const idx = (ci + ri + frame * 2) % FILL_CHARS.length;
          line += FILL_CHARS[idx];
        }
      } else {
        // Live phase
        if (isNearMouse) {
          // Intense scramble near mouse
          const idx =
            (ci * 13 + ri * 7 + frame * 3) %
            (EDGE_CHARS.length + FILL_CHARS.length);
          const allChars = EDGE_CHARS + FILL_CHARS;
          line += allChars[idx % allChars.length];
        } else if (edge) {
          // Edge characters cycle slowly
          const noise = Math.sin(ci * 0.5 + ri * 0.8 + frame * 0.2);
          if (noise > 0.6) {
            const idx = (ci + ri + frame) % EDGE_CHARS.length;
            line += EDGE_CHARS[idx];
          } else {
            const idx = (ci + ri) % EDGE_CHARS.length;
            line += EDGE_CHARS[idx];
          }
        } else {
          // Interior — subtle shimmer
          const noise = Math.sin(ci * 0.3 + ri * 0.7 + frame * 0.1);
          if (noise > 0.8) {
            const idx = (ci + ri + frame) % FILL_CHARS.length;
            line += FILL_CHARS[idx];
          } else {
            const idx = (ci * 3 + ri * 7) % FILL_CHARS.length;
            line += FILL_CHARS[idx];
          }
        }
      }
    });
    return line;
  });

  // Split into edge vs fill for two-tone coloring
  const coloredLines = grid.map((row, ri) => {
    const spans: JSX.Element[] = [];
    let currentIsEdge = false;
    let currentChars = "";
    const lineChars = renderedLines[ri];

    row.forEach((filled, ci) => {
      const ch = lineChars[ci];
      const edge = filled && edges[ri][ci];
      const revealed = phase === "live" || ci <= revealCol;

      if (!filled) {
        if (currentChars) {
          spans.push(
            <span
              key={spans.length}
              className={
                currentIsEdge
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-accent)]"
              }
              style={{ opacity: currentIsEdge ? 1 : 0.4 }}
            >
              {currentChars}
            </span>,
          );
          currentChars = "";
        }
        spans.push(<span key={spans.length}> </span>);
        return;
      }

      const thisIsEdge = !!edge;
      const thisOpacity = !revealed ? 0.15 : thisIsEdge ? 1 : 0.4;

      if (
        currentChars &&
        (thisIsEdge !== currentIsEdge || (!revealed && currentIsEdge))
      ) {
        spans.push(
          <span
            key={spans.length}
            className="text-[var(--color-accent)]"
            style={{ opacity: currentIsEdge ? 1 : 0.4 }}
          >
            {currentChars}
          </span>,
        );
        currentChars = "";
      }

      currentIsEdge = thisIsEdge;
      currentChars += ch;

      // Flush if opacity changes
      if (!revealed && currentChars.length > 0) {
        spans.push(
          <span
            key={spans.length}
            className="text-[var(--color-accent)]"
            style={{ opacity: thisOpacity }}
          >
            {currentChars}
          </span>,
        );
        currentChars = "";
      }
    });

    if (currentChars) {
      spans.push(
        <span
          key={spans.length}
          className="text-[var(--color-accent)]"
          style={{ opacity: currentIsEdge ? 1 : 0.4 }}
        >
          {currentChars}
        </span>,
      );
    }

    return (
      <div key={ri} className="leading-[18px] h-[18px]">
        {spans}
      </div>
    );
  });

  return (
    <pre
      ref={preRef}
      className={`select-none cursor-default inline-block text-sm ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {coloredLines}
    </pre>
  );
}
