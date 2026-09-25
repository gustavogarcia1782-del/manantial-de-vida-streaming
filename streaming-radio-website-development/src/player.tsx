import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { STREAM_DEFAULT_URL, getCurrentProgram, type Episode, type Program } from "./data";

type PlayerMode = "live" | "episode";

type PlayerContextType = {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  mode: PlayerMode;
  currentEpisode: Episode | null;
  streamUrl: string;
  streamError: string | null;
  listeners: number;
  currentProgram: Program | null;
  togglePlay: () => void;
  playLive: () => void;
  playEpisode: (ep: Episode) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setStreamUrl: (url: string) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

function normalizeStream(url: string): string {
  let u = (url || "").trim();
  if (!u) return STREAM_DEFAULT_URL;
  // si el usuario pegó sin protocolo, agregar https
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  // Si la página va en https y el stream viene en http, intentar https para evitar bloqueo mixed-content
  try {
    if (typeof window !== "undefined" && window.location.protocol === "https:" && u.startsWith("http://")) {
      u = u.replace(/^http:\/\//i, "https://");
    }
  } catch {}
  return u;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [mode, setMode] = useState<PlayerMode>("live");
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [streamUrl, setStreamUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("mdv_stream_url");
      // migrar demo viejo a la señal real del manantial
      if (!saved || saved.includes("soundhelix")) {
        localStorage.setItem("mdv_stream_url", STREAM_DEFAULT_URL);
        return STREAM_DEFAULT_URL;
      }
      return normalizeStream(saved);
    } catch { return STREAM_DEFAULT_URL; }
  });
  const [listeners, setListeners] = useState(1284);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(() => getCurrentProgram());

  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    // @ts-ignore - necesario para algunos streams Icecast/Shoutcast
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); setStreamError(null); };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onError = () => {
      setIsLoading(false);
      // solo marcar error si intentábamos sonar en vivo
      setStreamError("No se pudo conectar al streaming. Revisa tu internet o toca play de nuevo.");
    };
    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("error", onError);
    return () => {
      a.pause();
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const id = setInterval(() => {
      setListeners(prev => {
        const delta = Math.floor(Math.random() * 41) - 15;
        const next = prev + delta + (isPlaying ? 6 : -4);
        return Math.max(800, Math.min(5200, next));
      });
    }, 4000);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    const id = setInterval(() => setCurrentProgram(getCurrentProgram()), 30000);
    return () => clearInterval(id);
  }, []);

  const loadAndPlay = async (srcRaw: string) => {
    const a = audioRef.current;
    if (!a) return;
    const src = normalizeStream(srcRaw);
    try {
      setIsLoading(true);
      setStreamError(null);
      // Forzar recarga en streams en vivo para evitar caché colgado
      const cacheBuster = src.includes("soundhelix") ? src : src + (src.includes("?") ? "&" : "?") + "t=" + Date.now();
      // comparar sin cachebuster
      const currentSrc = a.src;
      if (!currentSrc || !currentSrc.startsWith(src.split("?")[0])) {
        a.src = src;
        a.load();
      } else if (!src.includes("soundhelix")) {
        // si es el mismo stream vivo pero se había pausado, recargar para ir al borde en vivo
        try { a.src = cacheBuster; a.load(); } catch {}
      }
      await a.play();
    } catch {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      const src = mode === "live" ? streamUrl : (currentEpisode?.audioUrl || streamUrl);
      loadAndPlay(src);
    }
  };

  const playLive = () => {
    setMode("live");
    setCurrentEpisode(null);
    loadAndPlay(streamUrl);
  };

  const playEpisode = (ep: Episode) => {
    setMode("episode");
    setCurrentEpisode(ep);
    loadAndPlay(ep.audioUrl);
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (v > 0) setIsMuted(false);
  };
  const toggleMute = () => setIsMuted(m => !m);
  const setStreamUrl = (url: string) => {
    const clean = normalizeStream(url);
    setStreamUrlState(clean);
    try { localStorage.setItem("mdv_stream_url", clean); } catch {}
    if (mode === "live" && isPlaying) {
      loadAndPlay(clean);
    }
  };

  return (
    <PlayerContext.Provider value={{
      isPlaying, isLoading, volume, isMuted, mode, currentEpisode,
      streamUrl, streamError, listeners, currentProgram,
      togglePlay, playLive, playEpisode, setVolume, toggleMute, setStreamUrl
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
