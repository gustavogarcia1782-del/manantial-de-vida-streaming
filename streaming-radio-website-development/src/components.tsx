import { useEffect, useMemo, useState } from "react";
import {
  Play, Pause, Volume2, VolumeX, Users, CalendarDays, Mic2, Music2, BookOpen,
  Heart, HeartHandshake, MessageCircle, Send, X, Menu, ChevronLeft, ChevronRight,
  Clock, Copy, Check, Phone, Mail, MapPin, Smartphone, Globe, Speaker, Settings2,
  Headphones, Baby, Sparkles, TrendingUp, TrendingDown, Minus, BadgeCheck, Quote,
  HandHeart, Wallet, ListMusic, RefreshCw, Loader2,
  Droplets, Waves, Signal, QrCode
} from "lucide-react";
import { usePlayer } from "./player";
import {
  PROGRAMS, HOSTS, EPISODES, VERSES, TESTIMONIES, TOP_SONGS, INITIAL_PRAYERS,
  WEEKDAYS, WEEKDAYS_SHORT, getCurrentProgram, getNextProgram, STREAM_DISPLAY
} from "./data";

/* ---------- base ---------- */
const INK = "#0B1F33";
const AQUA = "#00B4D8";
const TEAL = "#0AA981";
const GOLD = "#F2B705";

export function formatListeners(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",") + "k";
  return String(n);
}

export function Equalizer({ playing, className = "" }: { playing: boolean; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-[22px] ${playing ? "eq-play" : "eq-idle"} ${className}`} aria-hidden>
      <span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" />
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F33] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-white">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: AQUA }} />
      {children}
    </span>
  );
}

/* ---------- NAVBAR ---------- */
export function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isPlaying, togglePlay, isLoading } = usePlayer();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Programación", href: "#programacion" },
    { label: "Locutores", href: "#locutores" },
    { label: "Podcasts", href: "#podcasts" },
    { label: "Oración", href: "#oracion" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <div className="text-white text-[12.5px]" style={{ background: INK }}>
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-semibold text-white/85 truncate">
            <Waves size={14} style={{ color: AQUA }} /> Manantial de Vida · Radio Online · Streaming en vivo 24/7
          </p>
          <p className="hidden sm:flex items-center gap-1.5 font-mono text-[11.5px] text-white/60">
            <Signal size={12} style={{ color: TEAL }} /> {STREAM_DISPLAY}
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200" style={{ boxShadow: scrolled ? "0 8px 28px rgba(11,31,51,.10)" : "none" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-[72px] items-center justify-between gap-3">
            <a href="#inicio" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,#0B3A5F,${AQUA})` }}>
                <Droplets size={23} strokeWidth={2.2} />
              </span>
              <span className="leading-tight">
                <span className="block text-[17px] font-black tracking-tight" style={{ color: INK }}>Manantial <span style={{ color: TEAL }}>de Vida</span></span>
                <span className="block text-[10.5px] font-bold tracking-[0.22em] text-slate-500">RADIO CRISTIANA · STREAMING ONLINE</span>
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[14px] font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">{l.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={onOpenSettings} title="Mi señal" className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
                <Settings2 size={18} />
              </button>
              <button onClick={togglePlay} className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-white transition hover:brightness-110" style={{ background: INK }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white" style={{ color: INK }}>
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </span>
                <span className="text-left leading-none">
                  <span className="block text-[10px] font-bold tracking-[0.14em] text-white/60">{isPlaying ? "EN VIVO" : "ESCUCHAR"}</span>
                  <span className="block text-[14px] font-bold">En Vivo</span>
                </span>
              </button>
              <button onClick={() => setOpen(!open)} className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200" aria-label="Menú">
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">{l.label}</a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

/* ---------- HERO ---------- */
export function Hero() {
  const { isPlaying, isLoading, togglePlay, playLive, listeners, currentProgram, volume, setVolume, isMuted, toggleMute, mode, currentEpisode, streamError } = usePlayer();
  const [now, setNow] = useState(new Date());
  const next = useMemo(() => getNextProgram(new Date()), [now]);
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);

  const liveTitle = mode === "episode" && currentEpisode ? currentEpisode.title : (currentProgram?.title || "Alabanza Continua");
  const liveHost = mode === "episode" && currentEpisode ? currentEpisode.preacher : (currentProgram?.host || "Manantial Music");

  return (
    <section id="inicio" className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#071C33 0%,#0B3A5F 48%,#0E6E7E 100%)" }}>
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(0,180,216,.35),transparent 65%)" }} />
      <div className="absolute -left-40 -bottom-40 h-[420px] w-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(10,169,129,.28),transparent 65%)" }} />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-14 lg:pt-20 lg:pb-20">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E11D48] px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.16em]">
                <span className="relative flex h-2 w-2">
                  <span className="live-ping absolute h-full w-full rounded-full bg-white" />
                  <span className="relative h-2 w-2 rounded-full bg-white" />
                </span>
                EN VIVO
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/90">
                <Users size={14} style={{ color: AQUA }} /> {listeners.toLocaleString("es")} escuchando
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/90">
                <Clock size={14} style={{ color: GOLD }} /> {now.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            <h1 className="mt-6 font-serif font-bold leading-[1.04]" style={{ fontSize: "clamp(36px,5.4vw,60px)" }}>
              Agua viva para<br />tu corazón, <span className="italic" style={{ color: GOLD }}>todos los días</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/75">
              Somos <strong className="text-white">Radio Manantial de Vida Online</strong> — una radio 100% streaming: adoración, palabra y oración en vivo por internet, para acompañarte en casa, el trabajo y donde estés.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={togglePlay} className="inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-bold transition hover:scale-[1.02]" style={{ color: INK }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg,${AQUA},${TEAL})` }}>
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </span>
                {isPlaying ? "Escuchando en vivo" : "Escuchar ahora"}
                <Equalizer playing={isPlaying} className="text-teal-600" />
              </button>
              <a href="#programacion" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white hover:bg-white/15">
                <CalendarDays size={17} /> Programación
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-white/60">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={15} style={{ color: TEAL }} /> Streaming oficial · Alta calidad</span>
              <span className="inline-flex items-center gap-1.5"><Headphones size={15} style={{ color: AQUA }} /> 100% Online · Móvil · Alexa</span>
            </div>
          </div>

          {/* player card */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-5 sm:p-6 text-slate-900 shadow-[0_28px_80px_rgba(0,0,0,.4)]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-slate-400">STREAMING OFICIAL · ONLINE</p>
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold text-white" style={{ background: mode === "live" ? "#E11D48" : TEAL }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> {mode === "live" ? "STREAMING EN VIVO" : "PODCAST"}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <button onClick={togglePlay} className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl text-white transition hover:brightness-110" style={{ background: INK }} aria-label="Play">
                  {isLoading ? <Loader2 size={28} className="animate-spin" /> : isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[18px] font-extrabold" style={{ color: INK }}>{liveTitle}</p>
                  <p className="truncate text-[13.5px] font-medium text-slate-500">{liveHost}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Equalizer playing={isPlaying} className="text-teal-600" />
                    <span className="text-[12px] font-semibold text-slate-400">{isPlaying ? "Sonando…" : "En pausa"}</span>
                  </div>
                </div>
                <button onClick={toggleMute} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {streamError && (
                <p className="mt-3 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-[13px] font-semibold text-rose-700">{streamError}</p>
              )}

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <Volume2 size={16} className="text-slate-400 shrink-0" />
                <input type="range" min={0} max={100} value={isMuted ? 0 : Math.round(volume * 100)} onChange={e => setVolume(Number(e.target.value) / 100)} className="vol w-full" aria-label="Volumen" />
                <span className="w-10 text-right text-[12px] font-bold text-slate-500">{isMuted ? 0 : Math.round(volume * 100)}%</span>
              </div>

              <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: TEAL }}><Signal size={17} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400">STREAMING OFICIAL</p>
                  <p className="truncate font-mono text-[12.5px] font-bold text-slate-700">{STREAM_DISPLAY}</p>
                </div>
                {mode === "episode" && (
                  <button onClick={playLive} className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold text-white" style={{ background: INK }}>
                    <RefreshCw size={13} /> En vivo
                  </button>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href="https://wa.me/5215500000000?text=Hola%20Manantial%20de%20Vida%2C%20quiero%20pedir%20una%20canci%C3%B3n" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[13.5px] font-bold text-white" style={{ background: TEAL }}>
                  <MessageCircle size={16} /> Pedir canción
                </a>
                <a href="#oracion" className="inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[13.5px] font-bold text-white" style={{ background: INK }}>
                  <HandHeart size={16} /> Pedir oración
                </a>
              </div>
            </div>

            <div className="absolute -bottom-6 left-5 right-5 sm:left-8 sm:right-auto rounded-2xl bg-white/95 backdrop-blur border border-slate-100 shadow-xl px-5 py-3.5 flex items-center gap-3 animate-floaty">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: GOLD }}><Mic2 size={18} /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold tracking-[0.18em] text-slate-400">A CONTINUACIÓN</p>
                <p className="truncate text-[14px] font-extrabold" style={{ color: INK }}>{next?.title || "Alabanza Continua"} <span className="font-semibold text-slate-400">· {next ? `${next.start}` : ""}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-2.5 overflow-hidden" style={{ background: "rgba(0,0,0,.25)" }}>
        <div className="flex whitespace-nowrap animate-marquee gap-10 w-max text-[12.5px] font-semibold text-white/70">
          {[0, 1].map(k => (
            <div key={k} className="flex items-center gap-10">
              <span>Amanecer con Dios · 5:00 AM</span><span>Manantial de la Mañana · 6:00 AM</span><span>Mujer Virtuosa · 9:00 AM</span><span>Jóvenes en Sintonía · 2:00 PM</span><span>Noches de Adoración · 7:30 PM</span><span>Vigilia del Viernes · 9:30 PM</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
export function Stats() {
  const items = [
    { icon: Waves, value: "24/7", label: "Al aire" },
    { icon: Users, value: "85k+", label: "Oyentes al mes" },
    { icon: Globe, value: "32", label: "Países" },
    { icon: HeartHandshake, value: "12 años", label: "De ministerio" },
  ];
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-7 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: INK }}><it.icon size={20} /></span>
            <span><span className="block text-[20px] font-black leading-none" style={{ color: INK }}>{it.value}</span><span className="block text-[12.5px] font-semibold text-slate-500 mt-0.5">{it.label}</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SCHEDULE ---------- */
export function Schedule() {
  const today = new Date().getDay();
  const [day, setDay] = useState(today);
  const current = getCurrentProgram(new Date());
  const list = useMemo(() => PROGRAMS.filter(p => p.days.includes(day)).sort((a, b) => a.startHour - b.startHour), [day]);

  const catIcon = (c: string) => {
    if (c === "Música" || c === "Adoración") return Music2;
    if (c === "Enseñanza") return BookOpen;
    if (c === "Oración") return HandHeart;
    if (c === "Juvenil") return Sparkles;
    if (c === "Infantil") return Baby;
    if (c === "Testimonios") return Quote;
    return Mic2;
  };

  return (
    <section id="programacion" className="py-16 scroll-mt-20" style={{ background: "#F4FAFD" }}>
      <div className="mx-auto max-w-7xl px-4">
        <SectionTag>PROGRAMACIÓN SEMANAL</SectionTag>
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(28px,3.8vw,42px)", color: INK }}>Una guía para cada momento del día</h2>
            <p className="mt-2 text-slate-500 font-medium max-w-xl">Explora por día. El programa que está al aire se marca automáticamente.</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white"><Waves size={19} /></span>
            <div>
              <p className="text-[10.5px] font-extrabold tracking-[0.16em] text-rose-600">AHORA AL AIRE</p>
              <p className="text-[14.5px] font-bold" style={{ color: INK }}>{current ? `${current.title} · ${current.start}–${current.end}` : "Alabanza Continua"}</p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {WEEKDAYS.map((d, i) => (
            <button key={d} onClick={() => setDay(i)} className="shrink-0 rounded-xl px-4 py-2.5 text-center border transition min-w-[104px]" style={day === i ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: "#475569", borderColor: "#E2E8F0" }}>
              <span className="block text-[10.5px] font-extrabold tracking-widest" style={{ color: day === i ? GOLD : "#94A3B8" }}>{WEEKDAYS_SHORT[i]}{i === today ? " · HOY" : ""}</span>
              <span className="block text-[14px] font-bold">{d}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map(p => {
            const isNow = day === today && current?.id === p.id;
            const Icon = catIcon(p.category);
            return (
              <article key={p.id} className="rounded-2xl bg-white border p-5 transition hover:shadow-lg" style={{ borderColor: isNow ? "#E11D48" : "#E6EEF4", boxShadow: isNow ? "0 0 0 3px rgba(225,29,72,.12)" : undefined }}>
                {isNow && <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-extrabold tracking-widest text-white"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> AL AIRE AHORA</span>}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600"><Icon size={13} style={{ color: TEAL }} /> {p.category}</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-slate-500"><Clock size={12} /> {p.start} – {p.end}</span>
                </div>
                <h3 className="mt-3 text-[18px] font-extrabold leading-tight" style={{ color: INK }}>{p.title}</h3>
                <p className="text-[13px] font-bold" style={{ color: TEAL }}>{p.host}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{p.description}</p>
                <a href="#inicio" className="mt-4 block rounded-xl py-2.5 text-center text-[13px] font-bold text-white transition hover:brightness-110" style={{ background: INK }}>Escuchar en vivo</a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOSTS ---------- */
function HostAvatar({ name, photo }: { name: string; photo: string }) {
  const [ok, setOk] = useState(true);
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("");
  return (
    <div className="relative h-[240px] overflow-hidden bg-slate-100" style={{ background: "linear-gradient(135deg,#0B3A5F,#0E7C86)" }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-white/15 text-[26px] font-black">{initials}</span>
      </div>
      {ok && <img src={photo} alt={name} loading="lazy" onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,transparent 55%,rgba(7,28,51,.5))" }} />
    </div>
  );
}

export function Hosts() {
  return (
    <section id="locutores" className="bg-white py-16 scroll-mt-20 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <SectionTag>NUESTRAS VOCES</SectionTag>
          <h2 className="mt-4 font-serif font-bold" style={{ fontSize: "clamp(28px,3.8vw,42px)", color: INK }}>Quienes te acompañan cada día</h2>
          <p className="mt-2 text-slate-500 font-medium">Pastores, comunicadores y adoradores con un mismo propósito.</p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOSTS.map(h => (
            <article key={h.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
              <div className="relative">
                <HostAvatar name={h.name} photo={h.photo} />
                <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: "rgba(11,31,51,.85)" }}>{h.role}</span>
                <span className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5 rounded-xl bg-white/95 px-3.5 py-2.5 shadow">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: TEAL }}><Mic2 size={15} /></span>
                  <span className="min-w-0"><span className="block text-[11px] font-bold text-slate-400">{h.schedule}</span><span className="block truncate text-[13.5px] font-extrabold" style={{ color: INK }}>{h.show}</span></span>
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-extrabold" style={{ color: INK }}>{h.name}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{h.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PODCASTS ---------- */
export function Podcasts() {
  const { playEpisode, mode, currentEpisode, isPlaying } = usePlayer();
  const [tab, setTab] = useState<"podcasts" | "ranking">("podcasts");
  const [filter, setFilter] = useState("Todos");
  const [liked, setLiked] = useState<string[]>([]);
  const cats = ["Todos", "Predicación", "Familia", "Enseñanza", "Juvenil", "Testimonio", "Oración"];
  const filtered = filter === "Todos" ? EPISODES : EPISODES.filter(e => e.category === filter);

  return (
    <section id="podcasts" className="py-16 scroll-mt-20 text-white" style={{ background: "#0B1F33" }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em]" style={{ background: GOLD, color: INK }}><ListMusic size={14} /> A LA CARTA</span>
            <h2 className="mt-4 font-serif font-bold" style={{ fontSize: "clamp(28px,3.8vw,42px)" }}>Mensajes y alabanzas recientes</h2>
            <p className="mt-2 text-white/60 font-medium max-w-xl">Revive lo que te edificó y compártelo con alguien más.</p>
          </div>
          <div className="flex rounded-xl border border-white/15 bg-white/10 p-1 w-fit">
            <button onClick={() => setTab("podcasts")} className="rounded-lg px-5 py-2 text-[13.5px] font-bold transition" style={tab === "podcasts" ? { background: "#fff", color: INK } : { color: "rgba(255,255,255,.6)" }}>Podcasts</button>
            <button onClick={() => setTab("ranking")} className="rounded-lg px-5 py-2 text-[13.5px] font-bold transition" style={tab === "ranking" ? { background: "#fff", color: INK } : { color: "rgba(255,255,255,.6)" }}>Top semanal</button>
          </div>
        </div>

        {tab === "podcasts" ? (
          <>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)} className="shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold border transition" style={filter === c ? { background: GOLD, color: INK, borderColor: GOLD } : { borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.65)" }}>{c}</button>
              ))}
            </div>
            <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(ep => {
                const active = mode === "episode" && currentEpisode?.id === ep.id;
                return (
                  <article key={ep.id} className="overflow-hidden rounded-2xl border transition" style={active ? { borderColor: GOLD, background: "rgba(242,183,5,.08)" } : { borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)" }}>
                    <div className="relative flex items-center gap-4 p-4">
                      <button onClick={() => playEpisode(ep)} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white transition hover:brightness-110" style={{ background: active ? GOLD : TEAL, color: active ? INK : "#fff" }} aria-label="Escuchar">
                        {active && isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11.5px] font-bold" style={{ color: AQUA }}>{ep.category} · {ep.duration}</p>
                        <h3 className="truncate text-[15.5px] font-extrabold">{ep.title}</h3>
                        <p className="truncate text-[12.5px] text-white/55">{ep.preacher}</p>
                      </div>
                      <button onClick={() => setLiked(p => p.includes(ep.id) ? p.filter(x => x !== ep.id) : [...p, ep.id])} className="shrink-0" aria-label="Me gusta">
                        <Heart size={19} className={liked.includes(ep.id) ? "text-rose-500" : "text-white/35"} fill={liked.includes(ep.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <p className="px-4 pb-1 text-[13px] leading-relaxed text-white/60 line-clamp-2">{ep.description}</p>
                    <div className="p-4 pt-2">
                      <button onClick={() => playEpisode(ep)} className="w-full rounded-xl py-2.5 text-[13px] font-bold transition" style={active ? { background: GOLD, color: INK } : { background: "#fff", color: INK }}>{active && isPlaying ? "Reproduciendo…" : "Escuchar episodio"}</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-slate-400">LO MÁS PEDIDO DE LA SEMANA</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700"><TrendingUp size={14} /> Actualizado</span>
            </div>
            {TOP_SONGS.map(s => (
              <div key={s.pos} className="flex items-center gap-4 border-b border-slate-50 px-6 py-3.5 last:border-0 hover:bg-slate-50">
                <span className="w-8 text-[22px] font-black" style={{ color: s.pos <= 3 ? GOLD : "#CBD5E1" }}>{String(s.pos).padStart(2, "0")}</span>
                <span className="flex-1 min-w-0"><span className="block truncate text-[14.5px] font-extrabold" style={{ color: INK }}>{s.title}</span><span className="block truncate text-[12.5px] text-slate-500">{s.artist} · {s.plays}</span></span>
                {s.trend === "up" ? <TrendingUp size={16} className="text-emerald-500" /> : s.trend === "down" ? <TrendingDown size={16} className="text-rose-500" /> : <Minus size={16} className="text-slate-300" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- VERSE ---------- */
export function Verse() {
  const [idx, setIdx] = useState(() => new Date().getDate() % VERSES.length);
  const [copied, setCopied] = useState(false);
  const v = VERSES[idx];
  return (
    <section className="border-b border-amber-100 bg-[#FFFBEB] py-12">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <SectionTag>VERSÍCULO DEL DÍA</SectionTag>
        <Quote size={30} className="mx-auto mt-5 text-amber-400" fill="currentColor" />
        <blockquote className="mt-3 font-serif italic leading-snug font-semibold" style={{ fontSize: "clamp(19px,2.8vw,26px)", color: INK }}>“{v.text}”</blockquote>
        <p className="mt-3 text-[13px] font-extrabold tracking-[0.2em]" style={{ color: TEAL }}>{v.ref.toUpperCase()}</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={() => setIdx((idx + 1) % VERSES.length)} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-bold text-white" style={{ background: INK }}><RefreshCw size={14} /> Otro versículo</button>
          <button onClick={async () => { try { await navigator.clipboard.writeText(`"${v.text}" — ${v.ref}`); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13.5px] font-bold" style={{ color: INK }}>{copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />} {copied ? "Copiado" : "Copiar"}</button>
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIES ---------- */
export function Testimonies() {
  const [i, setI] = useState(0);
  const t = TESTIMONIES[i];
  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % TESTIMONIES.length), 7000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[340px_1fr] gap-8 items-center">
        <div>
          <SectionTag>TESTIMONIOS</SectionTag>
          <h2 className="mt-4 font-serif font-bold" style={{ fontSize: "clamp(28px,3.6vw,40px)", color: INK }}>Vidas transformadas</h2>
          <p className="mt-2 text-slate-500 font-medium">Lo que Dios está haciendo a través de este streaming.</p>
          <div className="mt-5 flex items-center gap-2">
            <button onClick={() => setI((i - 1 + TESTIMONIES.length) % TESTIMONIES.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"><ChevronLeft size={20} /></button>
            <button onClick={() => setI((i + 1) % TESTIMONIES.length)} className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: INK }}><ChevronRight size={20} /></button>
          </div>
        </div>
        <div key={t.id} className="animate-fadeUp rounded-3xl p-8 text-white" style={{ background: "linear-gradient(135deg,#0B3A5F,#0E7C86)" }}>
          <Quote size={40} className="text-white/30" fill="currentColor" />
          <p className="mt-2 text-[18px] leading-relaxed font-medium">“{t.text}”</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full font-black" style={{ background: GOLD, color: INK }}>{t.name.charAt(0)}</span>
            <div><p className="font-bold">{t.name}</p><p className="text-[12.5px] text-white/60">{t.city} · {t.program}</p></div>
            <span className="ml-auto" style={{ color: GOLD }}>★★★★★</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRAYER ---------- */
type Prayer = { id: string; name: string; request: string; time: string; amens: number; category: string; mine?: boolean };

export function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>(() => {
    try {
      const raw = localStorage.getItem("mdv_prayers");
      if (raw) return [...JSON.parse(raw), ...INITIAL_PRAYERS];
    } catch {}
    return INITIAL_PRAYERS;
  });
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [category, setCategory] = useState("Salud");
  const [sent, setSent] = useState(false);
  const [given, setGiven] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    const p: Prayer = { id: "pr" + Date.now(), name: name.trim() || "Anónimo", request: request.trim(), time: "ahora mismo", amens: 1, category, mine: true };
    setPrayers([p, ...prayers]);
    try { localStorage.setItem("mdv_prayers", JSON.stringify([p, ...prayers.filter(x => x.mine)])); } catch {}
    setName(""); setRequest(""); setSent(true);
    setTimeout(() => setSent(false), 3200);
  };

  return (
    <section id="oracion" className="scroll-mt-20 border-y border-slate-100 bg-[#F4FAFD] py-16">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[400px_1fr] gap-7">
        <div className="h-fit rounded-3xl p-7 text-white lg:sticky lg:top-24" style={{ background: INK }}>
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.16em]" style={{ background: TEAL }}><HandHeart size={14} /> MURO DE ORACIÓN</span>
          <h2 className="mt-4 font-serif text-[28px] font-bold leading-tight">¿Oramos por ti hoy?</h2>
          <p className="mt-2 text-[14px] text-white/65">Nuestro equipo intercede por cada petición en la vigilia del viernes.</p>
          <form onSubmit={submit} className="mt-5 space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre (opcional)" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/40 focus:border-teal-300" />
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {["Salud", "Familia", "Provisión", "Hijos", "Liberación"].map(c => (
                <button type="button" key={c} onClick={() => setCategory(c)} className="shrink-0 rounded-full px-3 py-1.5 text-[12px] font-bold border" style={category === c ? { background: GOLD, color: INK, borderColor: GOLD } : { borderColor: "rgba(255,255,255,.2)", color: "rgba(255,255,255,.65)" }}>{c}</button>
              ))}
            </div>
            <textarea value={request} onChange={e => setRequest(e.target.value)} required rows={4} placeholder="Escribe tu petición…" className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/40 focus:border-teal-300" />
            <button className="w-full rounded-xl py-3.5 font-bold text-white transition hover:brightness-110" style={{ background: TEAL }}><span className="inline-flex items-center gap-2"><Send size={16} /> Enviar petición</span></button>
            {sent && <p className="rounded-xl bg-emerald-400/15 border border-emerald-300/30 px-4 py-2.5 text-[13px] font-bold text-emerald-200">Recibida. Estaremos orando por ti.</p>}
          </form>
        </div>
        <div>
          <h3 className="text-[19px] font-extrabold" style={{ color: INK }}>Peticiones recientes <span className="ml-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[12px] text-white">{prayers.length}</span></h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {prayers.map(p => (
              <article key={p.id} className="flex flex-col rounded-2xl border bg-white p-5" style={{ borderColor: p.mine ? GOLD : "#E6EEF4" }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700 border border-teal-100">{p.category}</span>
                  <span className="text-[12px] text-slate-400 font-medium">{p.time}</span>
                </div>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600">“{p.request}”</p>
                <p className="mt-2 text-[13px] font-bold" style={{ color: INK }}>— {p.name}</p>
                <button
                  onClick={() => { if (given.includes(p.id)) return; setGiven([...given, p.id]); setPrayers(prev => prev.map(x => x.id === p.id ? { ...x, amens: x.amens + 1 } : x)); }}
                  className="mt-3 rounded-xl py-2.5 text-[13px] font-bold transition"
                  style={given.includes(p.id) ? { background: "#ECFDF5", color: "#047857", border: "1px solid #A7F3D0" } : { background: INK, color: "#fff" }}
                >
                  <span className="inline-flex items-center gap-1.5"><Heart size={14} fill={given.includes(p.id) ? "currentColor" : "none"} /> {given.includes(p.id) ? "Orando contigo" : "Me uno en oración"} · {p.amens}</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WAYS + DONATE ---------- */
export function WaysDonate({ onDonate }: { onDonate: () => void }) {
  const ways = [
    { icon: Globe, title: "Streaming web", desc: "Escucha aquí en alta calidad, sin instalar nada.", tag: "Estás aquí · Online" },
    { icon: Smartphone, title: "Celular y tablet", desc: "Llévanos contigo a todos lados, solo con internet.", tag: "iOS · Android" },
    { icon: Speaker, title: "Alexa y Google", desc: "«Pon Radio Manantial de Vida Online».", tag: "Bocinas smart" },
    { icon: MessageCircle, title: "WhatsApp", desc: "Verso diario y avisos de programas en vivo.", tag: "Canal directo" },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1fr_360px] gap-6">
        <div>
          <SectionTag>DÓNDE ESCUCHARNOS</SectionTag>
          <h2 className="mt-4 font-serif font-bold" style={{ fontSize: "clamp(26px,3.4vw,38px)", color: INK }}>Escúchanos donde estés, 100% online</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {ways.map((w, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: INK }}><w.icon size={20} /></span>
                <p className="mt-3 text-[16px] font-extrabold" style={{ color: INK }}>{w.title}</p>
                <p className="mt-1 text-[13.5px] text-slate-500">{w.desc}</p>
                <p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">{w.tag}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl p-7 text-white flex flex-col" style={{ background: "linear-gradient(150deg,#0B3A5F,#0E7C86)" }}>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.16em]"><Wallet size={14} /> APOYA EL STREAMING</span>
          <h3 className="mt-4 font-serif text-[26px] font-bold leading-tight">Ayúdanos a seguir transmitiendo</h3>
          <p className="mt-2 text-[14px] text-white/70">Tu ofrenda sostiene el streaming de {STREAM_DISPLAY} y el ministerio en 32 países.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["$5", "$15", "$50"].map(a => <span key={a} className="rounded-xl border border-white/20 bg-white/10 py-2.5 text-center text-[17px] font-extrabold">{a}</span>)}
          </div>
          <button onClick={onDonate} className="mt-4 w-full rounded-xl py-3.5 font-bold transition hover:brightness-110" style={{ background: GOLD, color: INK }}>
            <span className="inline-flex items-center gap-2"><HeartHandshake size={18} /> Donar ahora</span>
          </button>
          <p className="mt-2.5 text-center text-[12px] text-white/55 font-medium"><span className="inline-flex items-center gap-1"><QrCode size={13} /> Tarjeta · PayPal · Transferencia</span></p>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "Testimonio", msg: "" });
  const [ok, setOk] = useState(false);
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-slate-100 bg-[#F7FAFC] py-16">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-8">
        <div>
          <SectionTag>CONTACTO</SectionTag>
          <h2 className="mt-4 font-serif font-bold" style={{ fontSize: "clamp(26px,3.4vw,38px)", color: INK }}>Te leemos en vivo</h2>
          <div className="mt-6 space-y-3">
            {[
              { icon: Phone, t: "Cabina online", d: "+52 (55) 1234 5678 · WhatsApp en vivo" },
              { icon: MessageCircle, t: "WhatsApp", d: "+52 1 55 0000 0000" },
              { icon: Mail, t: "Correo", d: "hola@manantialdevida.online" },
              { icon: MapPin, t: "Cobertura", d: "100% Online · Desde CDMX para el mundo" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: INK }}><c.icon size={19} /></span>
                <span><span className="block text-[14.5px] font-extrabold" style={{ color: INK }}>{c.t}</span><span className="block text-[13.5px] text-slate-500">{c.d}</span></span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="text-[19px] font-extrabold" style={{ color: INK }}>Envíanos tu mensaje</h3>
          <form onSubmit={e => { e.preventDefault(); setOk(true); setForm({ name: "", email: "", type: "Testimonio", msg: "" }); setTimeout(() => setOk(false), 3500); }} className="mt-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-teal-500 focus:bg-white" />
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Tu correo" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-teal-500 focus:bg-white" />
            </div>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none">
              <option>Testimonio</option><option>Saludo al aire</option><option>Petición musical</option><option>Oración</option><option>Publicidad</option>
            </select>
            <textarea required value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} rows={5} placeholder="Cuéntanos…" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-teal-500 focus:bg-white" />
            <button className="w-full rounded-xl py-3.5 font-bold text-white transition hover:brightness-110" style={{ background: TEAL }}><span className="inline-flex items-center gap-2"><Send size={16} /> Enviar mensaje</span></button>
            {ok && <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-bold text-emerald-700">Gracias. Te responderemos pronto.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <footer className="text-white" style={{ background: "#071C33", paddingBottom: 120 }}>
      <div className="mx-auto max-w-7xl px-4 grid gap-8 pt-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg,#0B3A5F,${AQUA})` }}><Droplets size={22} /></span>
            <span><span className="block font-black">Manantial de Vida</span><span className="block text-[10.5px] font-bold tracking-[0.22em] text-white/50">RADIO ONLINE · STREAMING</span></span>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">Radio 100% online llevando esperanza desde 2014. Música, palabra y oración por streaming, 24 horas.</p>
          <p className="mt-3 font-serif italic text-[15px]" style={{ color: GOLD }}>“Ríos de agua viva” — Juan 7:38</p>
        </div>
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.18em] text-white/40">EXPLORAR</p>
          <div className="mt-4 grid gap-2.5 text-[14px] font-medium text-white/70">
            <a href="#programacion" className="hover:text-white">Programación</a>
            <a href="#locutores" className="hover:text-white">Locutores</a>
            <a href="#podcasts" className="hover:text-white">Podcasts</a>
            <a href="#oracion" className="hover:text-white">Oración</a>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.18em] text-white/40">HORARIOS CLAVE</p>
          <div className="mt-4 grid gap-2.5 text-[14px] text-white/70">
            <span>Mañana · 6:00 AM</span><span>Mujer Virtuosa · 9:00 AM</span><span>Jóvenes · 2:00 PM</span><span>Adoración · 7:30 PM</span>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.18em] text-white/40">BOLETÍN</p>
          <Newsletter />
          <button onClick={onOpenSettings} className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/45 hover:text-white"><Settings2 size={13} /> Administrar streaming</button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-8 border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-[12.5px] text-white/40">
        <p>© 2026 Radio Manantial de Vida · {STREAM_DISPLAY}</p>
        <p>Soli Deo Gloria</p>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form onSubmit={e => { e.preventDefault(); if (email) { setDone(true); setEmail(""); setTimeout(() => setDone(false), 2500); } }} className="mt-4 flex gap-2">
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="tu@correo.com" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-[13.5px] text-white outline-none placeholder:text-white/35 focus:border-teal-300" />
      <button className="rounded-xl px-4 font-bold" style={{ background: GOLD, color: INK }}>{done ? <Check size={17} /> : <Send size={17} />}</button>
    </form>
  );
}

/* ---------- PLAYER BAR ---------- */
export function PlayerBar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { isPlaying, isLoading, togglePlay, volume, setVolume, isMuted, toggleMute, listeners, currentProgram, mode, currentEpisode, playLive } = usePlayer();
  const title = mode === "episode" && currentEpisode ? currentEpisode.title : (currentProgram?.title || "Alabanza Continua");
  const sub = mode === "episode" && currentEpisode ? currentEpisode.preacher : (currentProgram?.host || "Streaming en vivo · Online");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="border-t border-white/10 text-white" style={{ background: "rgba(7,28,51,.97)", backdropFilter: "blur(12px)" }}>
        <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2.5 flex items-center gap-3">
          <button onClick={togglePlay} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition hover:scale-105" style={{ color: INK }} aria-label="Play">
            {isLoading ? <Loader2 size={22} className="animate-spin" /> : isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
          </button>
          <div className="hidden sm:block shrink-0 text-teal-300"><Equalizer playing={isPlaying} /></div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white" style={{ background: mode === "live" ? "#E11D48" : TEAL }}>{mode === "live" ? "EN VIVO" : "PODCAST"}</span>
              <span className="hidden md:inline text-[11px] font-semibold text-white/50">{formatListeners(listeners)} oyentes</span>
              {mode === "episode" && <button onClick={playLive} className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold hover:bg-white/20"><RefreshCw size={11} /> VIVO</button>}
            </div>
            <p className="truncate text-[13.5px] font-bold">{title}</p>
            <p className="truncate text-[11.5px] text-white/55">{sub}</p>
          </div>
          <div className="hidden items-center gap-2 md:flex shrink-0">
            <button onClick={toggleMute} className="text-white/70 hover:text-white">{isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
            <input type="range" min={0} max={100} value={isMuted ? 0 : Math.round(volume * 100)} onChange={e => setVolume(Number(e.target.value) / 100)} className="vol vol-light w-24" aria-label="Volumen" />
          </div>
          <button onClick={onOpenSettings} className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:flex"><Settings2 size={17} /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- CHAT ---------- */
type ChatMsg = { id: string; user: string; text: string; time: string; mine?: boolean; mod?: boolean };
const SEED_CHAT: ChatMsg[] = [
  { id: "c1", user: "Lucía (CDMX)", text: "Bendiciones, qué hermosa alabanza.", time: "10:42" },
  { id: "c2", user: "Cabina Manantial", text: "Bienvenida, Lucía. ¿Qué canción pedimos hoy?", time: "10:43", mod: true },
  { id: "c3", user: "Andrés (Lima)", text: "Escuchando con toda la iglesia.", time: "10:45" },
];
const REPLIES = ["Gracias por escribirnos. Te mandamos un abrazo.", "Tu mensaje ya está en cabina online. Saludos.", "Estamos orando por tu petición.", "Comparte este streaming con tu familia.", "Anotado para la dedicatoria."];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(SEED_CHAT);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [unread, setUnread] = useState(1);
  useEffect(() => { if (open) setUnread(0); }, [open ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const t = new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
    setMsgs(p => [...p, { id: "m" + Date.now(), user: name.trim() || "Tú", text: text.trim(), time: t, mine: true }]);
    setText("");
    setTimeout(() => {
      setMsgs(p => [...p.slice(-30), { id: "r" + Date.now(), user: "Cabina Manantial", text: REPLIES[Math.floor(Math.random() * REPLIES.length)], time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }), mod: true }]);
      if (!open) setUnread(u => u + 1);
    }, 1300);
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed z-50 flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-white shadow-xl transition hover:brightness-110" style={{ bottom: 86, right: 16, background: TEAL }}>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <MessageCircle size={19} />
            {unread > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[11px] font-extrabold">{unread}</span>}
          </span>
          <span className="text-left leading-tight"><span className="block text-[10px] font-bold tracking-widest opacity-80">CHAT EN VIVO</span><span className="block text-[13.5px] font-bold">Salúdanos</span></span>
        </button>
      )}
      {open && (
        <div className="fixed z-50 w-[336px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fadeUp" style={{ bottom: 86, right: 16 }}>
          <div className="flex items-center gap-2.5 px-4 py-3 text-white" style={{ background: INK }}>
            <span className="relative flex h-2.5 w-2.5"><span className="live-ping absolute h-full w-full rounded-full bg-emerald-400" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
            <div className="flex-1"><p className="text-[13.5px] font-bold">Chat en vivo</p><p className="text-[11px] text-white/55">Cabina en línea</p></div>
            <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><X size={15} /></button>
          </div>
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre y ciudad" className="w-full bg-transparent text-[12px] font-semibold outline-none placeholder:text-slate-400" />
          </div>
          <div className="h-[290px] space-y-2.5 overflow-y-auto bg-white p-4">
            {msgs.map(m => (
              <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[86%] rounded-2xl px-3.5 py-2.5" style={m.mine ? { background: INK, color: "#fff" } : m.mod ? { background: "#ECFDF5", border: "1px solid #A7F3D0" } : { background: "#F1F5F9" }}>
                  <p className="text-[11px] font-bold" style={{ color: m.mine ? GOLD : m.mod ? "#047857" : "#64748B" }}>{m.user} <span className="font-medium opacity-60">· {m.time}</span></p>
                  <p className="mt-0.5 text-[13px] leading-snug" style={{ color: m.mine ? "#fff" : "#334155" }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-slate-100 bg-white p-3">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Escribe tu saludo…" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-teal-500" />
            <button className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl text-white" style={{ background: TEAL }}><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}

/* ---------- MODALS ---------- */
export function StreamSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { streamUrl, setStreamUrl, playLive } = usePlayer();
  const [val, setVal] = useState(streamUrl);
  useEffect(() => { if (open) setVal(streamUrl); }, [open, streamUrl]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl animate-fadeUp">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"><X size={17} /></button>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-widest text-white" style={{ background: INK }}><Signal size={13} style={{ color: AQUA }} /> TU STREAMING</span>
        <h3 className="mt-3 text-[21px] font-black" style={{ color: INK }}>Streaming oficial conectado</h3>
        <p className="mt-1 text-[13.5px] text-slate-500">Tu dirección actual ya está sonando en el reproductor. Solo cámbiala si migras de servidor.</p>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[10.5px] font-extrabold tracking-[0.16em] text-slate-400">URL ACTUAL</p>
          <p className="truncate font-mono text-[13px] font-bold text-slate-700">{streamUrl}</p>
        </div>
        <label className="mt-4 block text-[11.5px] font-extrabold tracking-widest text-slate-400">NUEVA URL (OPCIONAL)</label>
        <input value={val} onChange={e => setVal(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-[13px] outline-none focus:border-teal-500" />
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button onClick={() => setVal(`https://${STREAM_DISPLAY}/`)} className="rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-[12px] font-bold text-emerald-700">Usar HTTPS</button>
          <button onClick={() => setVal(`http://${STREAM_DISPLAY}/`)} className="rounded-xl border border-amber-200 bg-amber-50 py-2.5 text-[12px] font-bold text-amber-700">Usar HTTP</button>
        </div>
        <button onClick={() => { setStreamUrl(val.trim()); playLive(); onClose(); }} className="mt-4 w-full rounded-xl py-3.5 font-bold text-white" style={{ background: INK }}>Guardar y reproducir</button>
      </div>
    </div>
  );
}

export function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState("15");
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  if (!open) return null;
  const finalAmount = custom || amount;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl animate-fadeUp">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"><X size={17} /></button>
        {!done ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: TEAL }}><HeartHandshake size={24} /></span>
            <h3 className="mt-3 text-[21px] font-black" style={{ color: INK }}>Apoya el ministerio</h3>
            <p className="text-[13.5px] text-slate-500">“Dios ama al dador alegre” — 2 Cor 9:7</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {["5", "15", "30", "50"].map(a => (
                <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className="rounded-xl border py-3 font-extrabold transition" style={amount === a && !custom ? { background: INK, color: "#fff", borderColor: INK } : { borderColor: "#E2E8F0", color: INK }}>${a}</button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-[14px] outline-none focus:border-teal-500" />
              <input value={custom} onChange={e => setCustom(e.target.value.replace(/[^0-9]/g, ""))} placeholder="$ Otro" className="w-24 rounded-xl border border-slate-200 px-3 py-3 text-center text-[14px] font-bold outline-none focus:border-teal-500" />
            </div>
            <button onClick={() => setDone(true)} className="mt-4 w-full rounded-xl py-3.5 font-bold transition hover:brightness-110" style={{ background: GOLD, color: INK }}>Donar ${finalAmount} USD</button>
          </>
        ) : (
          <div className="py-4 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check size={30} /></span>
            <h3 className="mt-4 text-[21px] font-black" style={{ color: INK }}>Gracias{name ? `, ${name}` : ""}</h3>
            <p className="mt-2 text-[14px] text-slate-500">Tu donativo de <strong>${finalAmount} USD</strong> mantiene este streaming online.</p>
            <button onClick={onClose} className="mt-5 w-full rounded-xl py-3 font-bold text-white" style={{ background: INK }}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export { getCurrentProgram };
