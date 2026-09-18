const iconPaths = {
  chat: (
    <>
      <path d="M13 15.5h38v27H30l-10 7v-7h-7z" />
      <path d="M23 27h18M23 33h12" />
      <circle className="signal-icon__accent" cx="47" cy="17" r="4" />
    </>
  ),
  trading: (
    <>
      <path d="M13 48V16M13 48h39" />
      <path d="m18 39 9-10 8 6 13-16" />
      <path className="signal-icon__accent" d="M41 19h7v7" />
      <circle cx="27" cy="29" r="2.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="32" cy="17" rx="18" ry="7" />
      <path d="M14 17v14c0 3.9 8.1 7 18 7s18-3.1 18-7V17" />
      <path d="M14 31v14c0 3.9 8.1 7 18 7s18-3.1 18-7V31" />
      <path className="signal-icon__accent" d="M42 26h8M45 23l5 3-5 3" />
    </>
  ),
  cloud: (
    <>
      <path d="M20 45h27a9 9 0 0 0 1.5-17.9A16 16 0 0 0 18.2 25 10 10 0 0 0 20 45Z" />
      <path className="signal-icon__accent" d="M32 40V25m-6 6 6-6 6 6" />
    </>
  ),
  commerce: (
    <>
      <path d="M11 18h7l4 22h24l6-16H20" />
      <circle cx="27" cy="48" r="3" />
      <circle cx="44" cy="48" r="3" />
      <path className="signal-icon__accent" d="M29 31h13M35.5 24.5v13" />
    </>
  ),
  enterprise: (
    <>
      <path d="M17 50V18l15-7 15 7v32M11 50h42" />
      <path d="M24 24h3m10 0h3M24 32h3m10 0h3M24 40h3m10 0h3" />
      <path className="signal-icon__accent" d="M29 50V39h6v11" />
    </>
  ),
  content: (
    <>
      <path d="M17 11h22l9 9v33H17z" />
      <path d="M39 11v10h9M24 31h15M24 38h12M24 45h9" />
      <path className="signal-icon__accent" d="m48 32 1.5 4.5L54 38l-4.5 1.5L48 44l-1.5-4.5L42 38l4.5-1.5z" />
    </>
  ),
  video: (
    <>
      <rect x="10" y="15" width="44" height="34" rx="3" />
      <path d="M10 23h44M20 15v8m24-8v8" />
      <path className="signal-icon__accent" d="m28 30 11 6-11 6z" />
    </>
  ),
  learning: (
    <>
      <path d="M32 19c-5-5-12-7-20-6v32c8-1 15 1 20 6 5-5 12-7 20-6V13c-8-1-15 1-20 6Z" />
      <path d="M32 19v32M18 23c3.5 0 6.5.7 9 2M18 30c3.5 0 6.5.7 9 2" />
      <path className="signal-icon__accent" d="M42 24v10m-5-5h10" />
    </>
  ),
  medical: (
    <>
      <path d="M32 50S13 39 13 25a11 11 0 0 1 19-7 11 11 0 0 1 19 7c0 14-19 25-19 25Z" />
      <path d="M18 32h8l4-8 5 15 4-7h7" />
      <path className="signal-icon__accent" d="M46 13v9m-4.5-4.5h9" />
    </>
  )
};

const SignalIcon = ({ type, className = '' }) => (
  <span className={`signal-icon ${className}`} aria-hidden="true">
    <span className="signal-icon__corner signal-icon__corner--top" />
    <span className="signal-icon__corner signal-icon__corner--bottom" />
    <svg
      data-signal-icon={type}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[type]}
    </svg>
  </span>
);

export default SignalIcon;
