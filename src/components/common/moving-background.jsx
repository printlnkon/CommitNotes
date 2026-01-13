export default function MovingBackground() {
  // Grid configuration
  const cols = 20;
  const rows = 12;
  const width = 100;
  const height = 100;

  // Floating particles configuration
  const particles = [
    { cx: 15, cy: 20, r: 1.5, dur: 18, delay: 0 },
    { cx: 85, cy: 15, r: 1, dur: 22, delay: 2 },
    { cx: 50, cy: 80, r: 1.2, dur: 20, delay: 4 },
    { cx: 25, cy: 60, r: 0.8, dur: 25, delay: 1 },
    { cx: 75, cy: 45, r: 1.3, dur: 19, delay: 3 },
    { cx: 40, cy: 30, r: 0.9, dur: 23, delay: 5 },
    { cx: 60, cy: 70, r: 1.1, dur: 21, delay: 2.5 },
    { cx: 90, cy: 85, r: 0.7, dur: 24, delay: 1.5 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
      style={{ pointerEvents: "none" }}
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)",
            animationDuration: "10s",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            animationDuration: "12s",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Animated mesh grid */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          {/* Gradient for grid lines */}
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.12" />
          </linearGradient>
          {/* Glow filter for particles */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical lines with wave animation */}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i * width) / cols}
            y1={0}
            x2={(i * width) / cols}
            y2={height}
            stroke="url(#gridGradient)"
            strokeWidth="0.12"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur={`${8 + (i % 5) * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="stroke-width"
              values="0.08;0.15;0.08"
              dur={`${10 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
          </line>
        ))}

        {/* Horizontal lines with wave animation */}
        {Array.from({ length: rows + 1 }).map((_, j) => (
          <line
            key={`h-${j}`}
            x1={0}
            y1={(j * height) / rows}
            x2={width}
            y2={(j * height) / rows}
            stroke="url(#gridGradient)"
            strokeWidth="0.12"
            opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.55;0.3"
              dur={`${9 + (j % 4) * 2}s`}
              repeatCount="indefinite"
              begin={`${j * 0.25}s`}
            />
            <animate
              attributeName="stroke-width"
              values="0.08;0.14;0.08"
              dur={`${11 + (j % 3)}s`}
              repeatCount="indefinite"
              begin={`${j * 0.2}s`}
            />
          </line>
        ))}

        {/* Floating particles */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#818cf8"
            opacity="0.4"
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values={`${p.cy};${p.cy - 8};${p.cy}`}
              dur={`${p.dur}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
            <animate
              attributeName="cx"
              values={`${p.cx};${p.cx + 3};${p.cx}`}
              dur={`${p.dur * 1.2}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={`${p.dur / 2}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
            <animate
              attributeName="r"
              values={`${p.r};${p.r * 1.3};${p.r}`}
              dur={`${p.dur / 1.5}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
            />
          </circle>
        ))}

        {/* Intersection dots at grid points with subtle pulse */}
        {Array.from({ length: 5 }).map((_, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <circle
              key={`dot-${i}-${j}`}
              cx={((i + 1) * width) / 6}
              cy={((j + 1) * height) / 4}
              r="0.3"
              fill="#a5b4fc"
              opacity="0.25"
            >
              <animate
                attributeName="opacity"
                values="0.15;0.35;0.15"
                dur={`${6 + ((i + j) % 4)}s`}
                repeatCount="indefinite"
                begin={`${(i + j) * 0.5}s`}
              />
              <animate
                attributeName="r"
                values="0.2;0.4;0.2"
                dur={`${7 + ((i + j) % 3)}s`}
                repeatCount="indefinite"
                begin={`${(i + j) * 0.3}s`}
              />
            </circle>
          ))
        )}
      </svg>

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.02) 100%)",
        }}
      />
    </div>
  );
}
