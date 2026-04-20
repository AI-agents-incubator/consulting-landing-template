// AI Strategy Intensive — landing page components
const { useState, useEffect, useMemo } = React;

const Icon = ({ path, size = 20, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {path}
  </svg>
);

const I = {
  spark: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
  arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  check: <polyline points="20 6 9 17 4 12"/>,
  x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  minus: <line x1="5" y1="12" x2="19" y2="12"/>,
  compass: <><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>,
  target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  map: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></>,
  dot: <circle cx="12" cy="12" r="3" fill="currentColor"/>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  sun: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
  sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
};

// ---------- Header ----------
function Header({ L, t, lang, onSetLang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 flex items-center justify-center shadow-md shadow-purple-500/25 shrink-0">
              <Icon path={I.spark} size={18} stroke="white" strokeWidth="2.5" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-[var(--fg)] whitespace-nowrap">AI Strategy Intensive</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {t.nav.map(l => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--fg)] transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-0.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border)] p-0.5 mr-1" aria-label="Language">
              {["ru", "en"].map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onSetLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all uppercase ${
                    lang === l
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-sm"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href="#cta" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5">
              {t.navCta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero({ t, L }) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-blue-300/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-teal-200/25 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--fg-secondary)] text-[13px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            {t.hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[76px] font-extrabold tracking-tight leading-[1.05] text-[var(--fg)]">
            {t.hero.h1pre}{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
              {t.hero.h1post}
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-[var(--fg-secondary)] max-w-2xl leading-relaxed">
            {t.hero.lead}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#cta" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5">
              {t.hero.ctaPrimary}<Icon path={I.arrowRight} size={16} strokeWidth="2.5" style={{ marginLeft: 8 }} />
            </a>
            <a href="#format" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[var(--fg)] rounded-full border-2 border-[var(--border-strong)] hover:bg-[var(--surface-alt)] transition-all">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {t.hero.meta.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span className="w-1 h-1 rounded-full bg-purple-500" />
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Visual showcase block */}
        <div className="mt-16 lg:mt-24 grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-5 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.2), transparent 60%)" }} />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-widest text-purple-100 mb-4">Input</div>
              <div className="text-2xl lg:text-3xl font-bold leading-tight">{t.hero.h1pre}</div>
              <div className="mt-10 flex items-center gap-3 text-purple-100 text-sm font-medium">
                <Icon path={I.sliders} size={16} />
                Noise · Hype · Fragments
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-2 flex items-center justify-center py-4">
            <div className="flex md:flex-col items-center gap-2 text-[var(--fg-muted)]">
              <div className="w-12 h-[2px] md:w-[2px] md:h-12 bg-gradient-to-r md:bg-gradient-to-b from-purple-500 to-blue-500" />
              <Icon path={I.arrowRight} size={20} className="md:rotate-90" strokeWidth="2.5" />
              <div className="w-12 h-[2px] md:w-[2px] md:h-12 bg-gradient-to-r md:bg-gradient-to-b from-blue-500 to-teal-400" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 p-6 lg:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg">
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-4">Output</div>
            <div className="space-y-3">
              {(L === "en"
                ? [
                    { t: "Applicability map", c: "from-purple-500 to-purple-600" },
                    { t: "Priorities", c: "from-blue-500 to-blue-600" },
                    { t: "Roadmap", c: "from-teal-500 to-teal-600" },
                    { t: "ROI frame", c: "from-amber-500 to-orange-500" },
                  ]
                : [
                    { t: "Карта применимости", c: "from-purple-500 to-purple-600" },
                    { t: "Приоритеты", c: "from-blue-500 to-blue-600" },
                    { t: "Дорожная карта", c: "from-teal-500 to-teal-600" },
                    { t: "ROI-рамка", c: "from-amber-500 to-orange-500" },
                  ]
              ).map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--surface-alt)]">
                  <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${r.c} flex items-center justify-center text-white shrink-0`}>
                    <Icon path={I.check} size={14} strokeWidth="3" />
                  </div>
                  <div className="text-sm font-medium text-[var(--fg)]">{r.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Audience ----------
function Audience({ t }) {
  const icons = [I.briefcase, I.users, I.target, I.mic];
  return (
    <section className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.audience.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {t.audience.title}{" "}
            <span className="text-[var(--fg-muted)]">{t.audience.titleHighlight}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.audience.groups.map((g, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
                <Icon path={icons[i]} size={20} />
              </div>
              <h3 className="text-base font-bold text-[var(--fg)] mb-2">{g.t}</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{g.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Problem ----------
function Problem({ t }) {
  return (
    <section id="problem" className="py-20 lg:py-28 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.problem.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {t.problem.title}{" "}
            <span className="text-[var(--fg-muted)]">{t.problem.titleMuted}</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-secondary)] max-w-2xl leading-relaxed">{t.problem.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.problem.cards.map((p, i) => (
            <div key={i} className="p-6 lg:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-3 tracking-tight">{p.stat}</div>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 lg:p-8 rounded-2xl border-l-0 bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-blue-500 to-teal-400" />
          <p className="text-lg lg:text-xl font-medium text-[var(--fg)] leading-relaxed italic max-w-4xl pl-4">
            {t.problem.quote}
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Outcomes ----------
function Outcomes({ t }) {
  const icons = [I.map, I.target, I.dollar, I.users, I.compass, I.zap];
  const colors = [
    "from-purple-500 to-purple-600",
    "from-blue-500 to-blue-600",
    "from-teal-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-violet-500",
  ];
  return (
    <section id="outcomes" className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.outcomes.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {t.outcomes.title}{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">{t.outcomes.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-secondary)] max-w-2xl leading-relaxed">{t.outcomes.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.outcomes.items.map((it, i) => (
            <div key={i} className="group p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-transparent hover:shadow-xl hover:shadow-purple-500/10 transition-all">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white shadow-md`}>
                  <Icon path={icons[i]} size={22} />
                </div>
                <span className="text-xs font-mono font-bold text-[var(--fg-subtle)] tracking-wider">{it.n}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--fg)] mb-2">{it.t}</h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Not this ----------
function NotThis({ t }) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.notThis.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">{t.notThis.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.notThis.items.map((it, i) => (
            <div key={i} className="p-6 lg:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex gap-5">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <Icon path={I.x} size={18} strokeWidth="2.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--fg)] mb-1.5">{it.t}</h3>
                <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Format ----------
function Format({ t }) {
  const icons = [I.briefcase, I.users, I.map];
  const colors = [
    "from-purple-500 to-purple-600",
    "from-blue-500 to-blue-600",
    "from-teal-500 to-teal-600",
  ];
  return (
    <section id="format" className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">{t.format.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {t.format.title}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{t.format.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-secondary)] max-w-2xl leading-relaxed">{t.format.sub}</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 opacity-30" />
          {t.format.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white shadow-lg mb-6 relative z-10`}>
                <Icon path={icons[i]} size={26} />
              </div>
              <div className="text-xs font-bold text-[var(--fg-subtle)] uppercase tracking-widest mb-2">{s.when}</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-purple-600">{s.n}</span>
                <h3 className="text-xl font-bold text-[var(--fg)]">{s.t}</h3>
              </div>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-100 dark:border-purple-500/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-purple-600 shrink-0">
            <Icon path={I.clock} size={20} />
          </div>
          <p className="text-sm text-[var(--fg-secondary)] leading-relaxed pt-2">{t.format.note}</p>
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About({ t }) {
  const a = t.about;
  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{a.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {a.title}{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">{a.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Photo column */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 shadow-xl shadow-purple-500/20">
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.22), transparent 60%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-5xl font-extrabold tracking-tight">
                  {a.name.split(" ").map(s => s[0]).join("")}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/40 to-transparent">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">Photo TBD</div>
                <div className="text-white font-bold text-lg tracking-tight">{a.name}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {a.links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border)] text-xs font-semibold text-[var(--fg-secondary)] hover:border-purple-300 hover:text-[var(--fg)] transition-all">
                  {l.label}
                  <Icon path={I.arrowRight} size={12} strokeWidth="2.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Bio column */}
          <div className="lg:col-span-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--fg-subtle)]">{a.role}</div>
            <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--fg)] mb-6">{a.name}</h3>
            {a.bio.map((p, i) => (
              <p key={i} className="text-base lg:text-lg text-[var(--fg-secondary)] leading-relaxed mb-4">{p}</p>
            ))}

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {a.stats.map((s, i) => (
                <div key={i} className="p-5 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
                  <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent tracking-tight">{s.v}</div>
                  <div className="mt-1 text-xs lg:text-sm text-[var(--fg-muted)] font-medium">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <ul className="mt-8 space-y-2.5">
              {a.credentials.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm lg:text-base text-[var(--fg-secondary)]">
                  <svg className="w-4 h-4 mt-1 shrink-0 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <a href={a.ctaMoreHref} className="mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[var(--fg)] rounded-full border-2 border-[var(--border-strong)] hover:bg-[var(--surface-alt)] transition-all">
              {a.ctaMore}<Icon path={I.arrowRight} size={14} strokeWidth="2.5" style={{ marginLeft: 8 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Industries ----------
function Industries({ t }) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.industries.eyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--fg)] leading-tight mb-5">{t.industries.title}</h2>
            <p className="text-base text-[var(--fg-secondary)] leading-relaxed">{t.industries.sub}</p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.industries.list.map((ind, i) => (
              <div key={i} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center gap-3 hover:border-purple-200 hover:shadow-sm transition-all">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                <span className="text-sm font-semibold text-[var(--fg)]">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Pricing ----------
function Pricing({ t }) {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.pricing.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
            {t.pricing.title}{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--fg-secondary)] max-w-2xl leading-relaxed">{t.pricing.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.pricing.plans.map((p, i) => (
            <div key={i} className={`relative flex flex-col rounded-2xl p-7 lg:p-8 transition-all ${p.highlighted ? "bg-gradient-to-b from-purple-600 via-blue-600 to-blue-700 text-white shadow-xl shadow-purple-500/25 lg:-translate-y-4" : "bg-[var(--surface)] border border-[var(--border)] hover:border-purple-200 hover:shadow-lg"}`}>
              {p.badge && (
                <div className="absolute -top-3 left-7 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-xs font-bold text-white shadow-md">
                  {p.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1.5 ${p.highlighted ? "text-white" : "text-[var(--fg)]"}`}>{p.name}</h3>
                <p className={`text-sm ${p.highlighted ? "text-purple-100" : "text-[var(--fg-muted)]"}`}>{p.tagline}</p>
              </div>
              <div className="mb-6">
                <div className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${p.highlighted ? "text-white" : "bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"}`}>
                  {p.range}
                </div>
                <div className={`text-xs mt-2 font-medium ${p.highlighted ? "text-purple-200" : "text-[var(--fg-muted)]"}`}>+ travel</div>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${p.highlighted ? "text-purple-100" : "text-[var(--fg-secondary)]"}`}>{p.desc}</p>
              <ul className="flex-1 space-y-3 mb-8">
                {p.feats.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlighted ? "text-teal-300" : "text-purple-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className={p.highlighted ? "text-purple-50" : "text-[var(--fg-secondary)]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`inline-flex items-center justify-center py-3.5 px-6 rounded-full text-sm font-semibold transition-all ${p.highlighted ? "bg-white text-purple-700 hover:bg-purple-50 shadow-md hover:-translate-y-0.5" : "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 shadow-md shadow-purple-500/20 hover:-translate-y-0.5"}`}>
                {p.cta}
                <Icon path={I.arrowRight} size={14} strokeWidth="2.5" style={{ marginLeft: 8 }} />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[var(--fg-muted)]">{t.pricing.note}</p>
      </div>
    </section>
  );
}

// ---------- Not For ----------
function NotFor({ t }) {
  return (
    <section className="py-20 lg:py-28 bg-[var(--surface-alt)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.notFor.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight mb-10">
          {t.notFor.title}
        </h2>
        <div className="space-y-3">
          {t.notFor.items.map((it, i) => (
            <div key={i} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--surface-alt)] flex items-center justify-center text-[var(--fg-muted)] shrink-0">
                <Icon path={I.x} size={16} strokeWidth="2.5" />
              </div>
              <p className="text-sm lg:text-base text-[var(--fg-secondary)]">{it}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">{t.faq.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight mb-10">
          {t.faq.title}
        </h2>
        <div className="space-y-3">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`rounded-xl border transition-all ${isOpen ? "bg-[var(--surface-alt)] border-purple-200 dark:border-purple-500/30" : "bg-[var(--surface)] border-[var(--border)]"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left"
                >
                  <span className="text-base lg:text-lg font-bold text-[var(--fg)] leading-snug">{it.q}</span>
                  <span className={`w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <Icon path={isOpen ? I.minus : I.plus} size={16} strokeWidth="2.5" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 lg:px-6 pb-6 pt-0 -mt-2">
                    <p className="text-sm lg:text-base text-[var(--fg-secondary)] leading-relaxed max-w-3xl">{it.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCTA({ t }) {
  return (
    <section id="cta" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.18), transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,0,0,0.15), transparent 60%)" }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white text-[13px] font-medium">
          <Icon path={I.mail} size={14} strokeWidth="2.5" />
          1 form · 48h reply
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
          {t.cta.title}
        </h2>
        <p className="mt-6 text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">{t.cta.sub}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-purple-700 bg-white rounded-full hover:bg-purple-50 shadow-xl hover:-translate-y-0.5 transition-all">
            {t.cta.primary}<Icon path={I.arrowRight} size={16} strokeWidth="2.5" style={{ marginLeft: 8 }} />
          </a>
          <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all">
            {t.cta.secondary}
          </a>
        </div>
        <p className="mt-7 text-sm text-purple-200">{t.cta.small}</p>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ t }) {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 flex items-center justify-center">
                <Icon path={I.spark} size={18} stroke="white" strokeWidth="2.5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">{t.footer.tag}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{t.footer.desc}</p>
          </div>
          {t.footer.cols.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.t}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-600">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

// ---------- Tweaks panel ----------
function TweaksPanel({ lang, setLang, dark, setDark, onClose }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 w-[300px] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="flex items-center gap-2">
          <Icon path={I.sliders} size={16} strokeWidth="2.5" />
          <span className="text-sm font-bold">Tweaks</span>
        </div>
        <button onClick={onClose} className="w-6 h-6 rounded hover:bg-white/20 flex items-center justify-center">
          <Icon path={I.x} size={14} strokeWidth="2.5" />
        </button>
      </div>
      <div className="p-4 space-y-5">
        <div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Language</div>
          <div className="grid grid-cols-2 gap-2">
            {["ru", "en"].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`py-2 text-sm font-semibold rounded-lg transition-all ${lang === l ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md shadow-purple-500/20" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                {l === "ru" ? "RU" : "EN"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Theme</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDark(false)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${!dark ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md shadow-purple-500/20" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
            >
              <Icon path={I.sun} size={14} strokeWidth="2.5" />Light
            </button>
            <button
              onClick={() => setDark(true)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${dark ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md shadow-purple-500/20" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
            >
              <Icon path={I.moon} size={14} strokeWidth="2.5" />Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- App ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "ru",
  "dark": true
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("landing-lang");
      if (saved === "ru" || saved === "en") return saved;
    } catch (e) {}
    return TWEAK_DEFAULTS.lang;
  });
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("landing-dark");
      if (saved === "true" || saved === "false") return saved === "true";
    } catch (e) {}
    return TWEAK_DEFAULTS.dark;
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const t = useMemo(() => window.DATA[lang], [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("lang", lang);
  }, [dark, lang]);

  useEffect(() => {
    try { localStorage.setItem("landing-lang", lang); } catch (e) {}
    try { localStorage.setItem("landing-dark", String(dark)); } catch (e) {}
  }, [lang, dark]);

  // Persist tweaks to file + notify parent
  const pushEdit = (key, val) => {
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
    } catch (e) {}
  };

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const handleSetLang = (l) => { setLang(l); pushEdit("lang", l); };
  const handleSetDark = (d) => { setDark(d); pushEdit("dark", d); };

  return (
    <>
      <Header L={lang} t={t} lang={lang} onSetLang={handleSetLang} />
      <main>
        <Hero t={t} L={lang} />
        <Audience t={t} />
        <Problem t={t} />
        <Outcomes t={t} />
        <NotThis t={t} />
        <Format t={t} />
        <About t={t} />
        <Industries t={t} />
        <Pricing t={t} />
        <NotFor t={t} />
        <FAQ t={t} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
      {tweaksOpen && (
        <TweaksPanel
          lang={lang}
          setLang={handleSetLang}
          dark={dark}
          setDark={handleSetDark}
          onClose={() => setTweaksOpen(false)}
        />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
