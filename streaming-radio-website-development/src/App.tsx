import { useState } from "react";
import { PlayerProvider } from "./player";
import {
  Navbar, Hero, Stats, Schedule, Hosts, Podcasts, Verse,
  Testimonies, PrayerWall, WaysDonate, Contact, Footer,
  PlayerBar, ChatWidget, StreamSettingsModal, DonateModal
} from "./components";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <PlayerProvider>
      <div className="min-h-screen w-full" style={{ background: "#E6FBFF", color: "#07334E" }}>
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />
        <main className="w-full">
          <Hero />
          <Stats />
          <Schedule />
          <Hosts />
          <Podcasts />
          <Verse />
          <Testimonies />
          <PrayerWall />
          <WaysDonate onDonate={() => setDonateOpen(true)} />
          <Contact />
        </main>
        <Footer onOpenSettings={() => setSettingsOpen(true)} />
        <ChatWidget />
        <PlayerBar onOpenSettings={() => setSettingsOpen(true)} />
        <StreamSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
      </div>
    </PlayerProvider>
  );
}
