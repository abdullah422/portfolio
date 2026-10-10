import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail, Moon, Phone, Sun, X } from 'lucide-react'
import { LINKS, experience, projects, skills, ui, type Lang, type Project } from './data'

const Github = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" /></svg>
)
const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6a3.7 3.7 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2m1.8 13.1H3.6V9h3.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0" /></svg>
)

const tr = (t: { en: string; ar: string }, l: Lang) => t[l]

/* ---------- small hooks / atoms ---------- */

function useTyping(words: string[]) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const t = setTimeout(
      () => {
        if (!del) {
          setTxt(w.slice(0, txt.length + 1))
          if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1200)
        } else {
          setTxt(w.slice(0, txt.length - 1))
          if (txt.length - 1 === 0) { setDel(false); setI(i + 1) }
        }
      },
      del ? 35 : 80,
    )
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return txt
}

function Counter({ to, plus }: { to: number; plus: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() } })
    return () => c.stop()
  }, [inView, to])
  return <span><span ref={ref}>0</span>{plus && '+'}</span>
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function SectionHead({ title, sub, id }: { title: string; sub?: string; id: string }) {
  return (
    <Reveal className="mb-12" >
      <div id={id} className="-mt-24 pt-24" />
      <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-lg" style={{ color: 'var(--muted)' }}>{sub}</p>}
    </Reveal>
  )
}

/* ---------- phone mockup ---------- */

function Phone3D({ p, shot, lang }: { p: Project; shot?: string; lang: Lang }) {
  if (p.poster && shot) {
    return <img src={shot} alt={tr(p.name, lang)} loading="lazy" className="mx-auto w-[210px] rounded-[28px]" style={{ boxShadow: `0 30px 80px -20px ${p.hue[0]}55` }} />
  }
  return (
    <div className="relative mx-auto w-[210px] aspect-[9/19] rounded-[34px] p-[7px] shadow-2xl" style={{ background: 'linear-gradient(145deg,#2a2d3a,#0b0c12)', boxShadow: `0 30px 80px -20px ${p.hue[0]}55` }}>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-16 rounded-full bg-black z-10" />
      <div className="h-full w-full rounded-[28px] overflow-hidden relative" style={{ background: `linear-gradient(160deg, ${p.hue[0]}, ${p.hue[1]})` }}>
        {shot ? (
          <img src={shot} alt={tr(p.name, lang)} loading="lazy" className="h-full w-full object-cover object-top" />
        ) : (
          <FakeScreen p={p} lang={lang} />
        )}
      </div>
    </div>
  )
}

/** Generated UI placeholder for apps without screenshots yet. */
function FakeScreen({ p, lang }: { p: Project; lang: Lang }) {
  return (
    <div className="h-full w-full p-4 pt-9 flex flex-col gap-2.5 text-white">
      <div className="text-[13px] font-bold font-display opacity-95">{tr(p.name, lang)}</div>
      <div className="h-20 rounded-2xl bg-white/20 backdrop-blur" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-14 rounded-xl bg-white/25" /><div className="h-14 rounded-xl bg-white/15" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl bg-black/20 p-2">
          <div className="h-7 w-7 rounded-lg bg-white/40" />
          <div className="flex-1 space-y-1"><div className="h-1.5 w-3/4 rounded bg-white/60" /><div className="h-1.5 w-1/2 rounded bg-white/30" /></div>
        </div>
      ))}
      <div className="mt-auto h-9 rounded-full bg-white/90" />
    </div>
  )
}

/* ---------- project card w/ 3D tilt ---------- */

function ProjectCard({ p, lang, onOpen, i }: { p: Project; lang: Lang; onOpen: () => void; i: number }) {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 })
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.04 }} style={{ perspective: 900 }}>
      <motion.div
        onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0) }} onClick={onOpen}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen()}
        className="glass group relative h-full cursor-pointer overflow-hidden rounded-3xl p-6 outline-none focus-visible:ring-2"
      >
        <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60" style={{ background: p.hue[0] }} />
        <div className="relative flex items-start justify-between">
          <div>
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{p.year} · {tr(ui.cats[p.cat], lang)}</span>
            <div className="mt-1 flex items-center gap-3">{p.logo && <img src={p.logo} alt="" className="h-10 w-10 rounded-xl" />}<h3 className="font-display text-2xl font-bold">{tr(p.name, lang)}</h3></div>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full glass transition-transform group-hover:rotate-45"><ArrowUpRight size={18} /></span>
        </div>
        <p className="relative mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>{tr(p.blurb, lang)}</p>
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => <span key={s} className="rounded-full px-2.5 py-1 text-[11px] glass">{s}</span>)}
        </div>
        <div className="relative mt-6 h-44 overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
          <div className="scale-[.72] origin-top transition-transform duration-500 group-hover:-translate-y-2"><Phone3D p={p} shot={p.shots[0]} lang={lang} /></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- modal ---------- */

function Modal({ p, lang, onClose }: { p: Project; lang: Lang; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  const shots = p.shots.length ? p.shots : [undefined]
  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4 bg-black/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, scale: 0.94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="relative grid w-full max-w-4xl max-h-[92vh] overflow-auto rounded-3xl md:grid-cols-[320px_1fr]"
        style={{ background: 'var(--bg2)', border: '1px solid var(--line)' }}
      >
        <button onClick={onClose} aria-label={tr(ui.close, lang)} className="absolute top-4 end-4 z-20 grid h-10 w-10 place-items-center rounded-full glass"><X size={18} /></button>
        <div className="grid place-items-center p-8" style={{ background: `linear-gradient(160deg, ${p.hue[0]}33, ${p.hue[1]}22)` }}>
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <Phone3D p={p} shot={shots[idx]} lang={lang} />
              </motion.div>
            </AnimatePresence>
            {shots.length > 1 && (
              <div className="flex gap-2">
                {shots.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} aria-label={`screenshot ${i + 1}`} className="h-2 rounded-full transition-all" style={{ width: i === idx ? 28 : 8, background: i === idx ? p.hue[0] : 'var(--line)' }} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{p.year}</span>
          <div className="mt-1 flex items-center gap-4">{p.logo && <img src={p.logo} alt="" className="h-14 w-14 rounded-2xl" />}<h3 className="font-display text-4xl font-bold">{tr(p.name, lang)}</h3></div>
          <p className="mt-4 leading-relaxed" style={{ color: 'var(--muted)' }}>{tr(p.blurb, lang)}</p>
          <h4 className="font-display mt-6 mb-3 font-bold">{tr(ui.features, lang)}</h4>
          <ul className="space-y-2.5">
            {p.features.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm"><Check size={16} className="mt-0.5 shrink-0" style={{ color: p.hue[0] }} />{tr(f, lang)}</li>
            ))}
          </ul>
          <h4 className="font-display mt-6 mb-3 font-bold">{tr(ui.stack, lang)}</h4>
          <div className="flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-full px-3 py-1 text-xs glass">{s}</span>)}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- page ---------- */

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || (navigator.language.startsWith('ar') ? 'ar' : 'en'))
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark')
  const [filter, setFilter] = useState<'all' | 'mobile' | 'pos'>('all')
  const [open, setOpen] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const typed = useTyping(useMemo(() => ui.roles[lang], [lang]))
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', lang)
  }, [lang])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  useEffect(() => {
    const m = (e: MouseEvent) => { if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)` }
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [])

  const list = projects.filter((p) => filter === 'all' || p.cat === filter)
  const copy = () => { navigator.clipboard?.writeText(LINKS.email); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const socials = [
    { href: LINKS.github, icon: Github, label: 'GitHub' },
    { href: LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${LINKS.email}`, icon: Mail, label: 'Email' },
    { href: `tel:${LINKS.phone}`, icon: Phone, label: 'Phone' },
  ].filter((s) => s.href)

  return (
    <div className="noise relative min-h-screen">
      <motion.div style={{ scaleX: bar }} className="fixed top-0 inset-x-0 z-[90] h-[3px] origin-left rtl:origin-right" >
        <div className="h-full w-full" style={{ background: 'linear-gradient(90deg,var(--a),var(--b))' }} />
      </motion.div>
      <div ref={glow} className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-[.13] blur-3xl md:block" style={{ background: 'radial-gradient(circle, var(--a), transparent 70%)', transition: 'transform .25s ease-out' }} />

      {/* nav */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="glass flex items-center gap-1 rounded-full py-2 ps-5 pe-2 shadow-lg">
          <a href="#top" className="font-display me-3 font-bold grad">AM</a>
          {(['work', 'exp', 'skills', 'contact'] as const).map((k) => (
            <a key={k} href={`#${k}`} className="hidden rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-white/10 sm:block" style={{ color: 'var(--muted)' }}>{tr(ui.nav[k], lang)}</a>
          ))}
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="ms-1 grid h-9 min-w-9 place-items-center rounded-full px-2 text-sm font-semibold glass" aria-label="Language">{lang === 'en' ? 'ع' : 'EN'}</button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="grid h-9 w-9 place-items-center rounded-full glass" aria-label="Theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5">
        {/* hero */}
        <section id="top" className="relative grid min-h-screen items-center gap-10 pt-28 pb-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm glass">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> {tr(ui.contactSub, lang)}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              {tr(ui.hello, lang)}<br /><span className="grad">{tr(ui.name, lang)}</span>
            </motion.h1>
            <div className="font-display mt-5 h-10 text-2xl sm:text-3xl" aria-live="off">
              {typed}<span className="animate-pulse" style={{ color: 'var(--a)' }}>|</span>
            </div>
            <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{tr(ui.tagline, lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105" style={{ background: 'linear-gradient(110deg,var(--b),var(--c))' }}>{tr(ui.cta1, lang)}</a>
              <a href="#contact" className="rounded-full px-7 py-3.5 font-semibold glass transition-transform hover:scale-105">{tr(ui.cta2, lang)}</a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            {[0, 1, 2].map((i) => {
              const p = ['marsaai', 'shure-doctor', 'maly'].map((id) => projects.find((x) => x.id === id)!)[i]
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                  className={`${i === 1 ? 'relative z-10' : 'absolute top-10'} ${i === 0 ? '-start-4 -rotate-6 scale-90' : ''} ${i === 2 ? '-end-4 rotate-6 scale-90' : ''} ${i === 1 ? 'float mx-auto' : ''}`}>
                  <Phone3D p={p} shot={p.shots[0]} lang={lang} />
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* stats */}
        <Reveal>
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4">
            {ui.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-bold grad md:text-5xl"><Counter to={s.n} plus={s.plus} /></div>
                <div className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{tr(s.l, lang)}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* marquee */}
        <div className="my-20 overflow-hidden" dir="ltr" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)' }}>
          <div className="marquee flex w-max gap-4">
            {[...Array(2)].flatMap((_, k) => ['Flutter', 'Dart', 'Laravel', 'Firebase', 'Bloc', 'Provider', 'REST APIs', 'Clean Architecture', 'Codemagic', 'Google Maps', 'Pusher', 'SQLite'].map((s) => (
              <span key={s + k} className="font-display glass whitespace-nowrap rounded-full px-6 py-3 text-lg">{s}</span>
            )))}
          </div>
        </div>

        {/* work */}
        <section>
          <SectionHead id="work" title={tr(ui.workTitle, lang)} sub={tr(ui.workSub, lang)} />
          <div className="mb-8 flex flex-wrap gap-2">
            {(['all', 'mobile', 'pos'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className="rounded-full px-5 py-2 text-sm font-medium transition-colors" style={filter === f ? { background: 'var(--fg)', color: 'var(--bg)' } : { border: '1px solid var(--line)' }}>
                {f === 'all' ? tr(ui.all, lang) : tr(ui.cats[f], lang)}
              </button>
            ))}
          </div>
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => <ProjectCard key={p.id} p={p} lang={lang} i={i} onOpen={() => setOpen(p)} />)}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* experience */}
        <section className="mt-32">
          <SectionHead id="exp" title={tr(ui.expTitle, lang)} />
          <div className="relative ms-3 space-y-10 border-s-2 ps-8" style={{ borderColor: 'var(--line)' }}>
            {experience.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -start-[41px] top-2 h-4 w-4 rounded-full ring-4" style={{ background: 'var(--a)', ['--tw-ring-color' as string]: 'var(--bg)' }} />
                  <div className="glass rounded-3xl p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl font-bold">{tr(e.role, lang)}</h3>
                      <span className="text-sm" style={{ color: 'var(--a)' }}>{tr(e.period, lang)}</span>
                    </div>
                    <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{e.org} · {tr(e.where, lang)}</p>
                    <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed marker:text-[color:var(--a)]">
                      {e.points.map((p, j) => <li key={j}>{tr(p, lang)}</li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mt-32">
          <SectionHead id="skills" title={tr(ui.skillsTitle, lang)} />
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((g, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass h-full rounded-3xl p-6">
                  <h3 className="font-display mb-4 text-lg font-bold" style={{ color: 'var(--a)' }}>{tr(g.title, lang)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <motion.span key={s} whileHover={{ y: -3, scale: 1.06 }} className="cursor-default rounded-full px-3.5 py-1.5 text-sm glass">{s}</motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* contact */}
        <section className="mt-32 pb-16">
          <div id="contact" className="-mt-24 pt-24" />
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
              <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: 'radial-gradient(40rem 20rem at 50% 0%, var(--b), transparent 70%)' }} />
              <h2 className="font-display relative text-4xl font-bold md:text-6xl">{tr(ui.contactTitle, lang)}</h2>
              <p className="relative mt-4" style={{ color: 'var(--muted)' }}>{tr(ui.contactSub, lang)}</p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${LINKS.email}`} className="rounded-full px-7 py-3.5 font-semibold text-white" style={{ background: 'linear-gradient(110deg,var(--b),var(--c))' }}>{LINKS.email}</a>
                <button onClick={copy} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold glass">
                  {copied ? <Check size={16} /> : <Copy size={16} />}{tr(copied ? ui.copied : ui.copy, lang)}
                </button>
              </div>
              <div className="relative mt-8 flex justify-center gap-3">
                {socials.map(({ href, icon: I, label }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="grid h-12 w-12 place-items-center rounded-full glass transition-transform hover:-translate-y-1"><I size={20} /></a>
                ))}
              </div>
            </div>
          </Reveal>
          <p className="mt-10 text-center text-sm" style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} {tr(ui.name, lang)}</p>
        </section>
      </main>

      <AnimatePresence>{open && <Modal p={open} lang={lang} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  )
}
