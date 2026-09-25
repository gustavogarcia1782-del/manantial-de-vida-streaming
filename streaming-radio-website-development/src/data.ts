export const STREAM_DEFAULT_URL = "https://manantialdevida1.radiostream321.com/";
export const STREAM_HTTP_URL = "http://manantialdevida1.radiostream321.com/";
export const STREAM_DISPLAY = "manantialdevida1.radiostream321.com";

export type Program = {
  id: string;
  title: string;
  host: string;
  description: string;
  start: string; // "06:00"
  end: string; // "09:00"
  startHour: number;
  endHour: number;
  days: number[]; // 0=Dom .. 6=Sab
  category: string;
  color: string;
};

export const WEEKDAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
export const WEEKDAYS_SHORT = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];

export const PROGRAMS: Program[] = [
  { id: "p1", title: "Amanecer con Dios", host: "Pastor Elías Fuentes", description: "Devocional, oración de madrugada y palabra para empezar el día en victoria.", start: "05:00", end: "06:00", startHour: 5, endHour: 6, days: [1,2,3,4,5], category: "Devocional", color: "bg-amber-400" },
  { id: "p2", title: "Manantial de la Mañana", host: "Carolina y David Marín", description: "Noticias con esperanza, entrevistas, alegría y la mejor música para tu mañana.", start: "06:00", end: "09:00", startHour: 6, endHour: 9, days: [1,2,3,4,5], category: "Magazine", color: "bg-cyan-400" },
  { id: "p3", title: "Mujer Virtuosa", host: "Pastora Miriam Rosales", description: "Espacio para la mujer: familia, fe, salud emocional y testimonios reales.", start: "09:00", end: "11:00", startHour: 9, endHour: 11, days: [1,3,5], category: "Familiar", color: "bg-rose-400" },
  { id: "p4", title: "Alabanza Continua", host: "Manantial Music", description: "Dos horas sin interrupciones con lo mejor de la adoración contemporánea y clásicos.", start: "11:00", end: "13:00", startHour: 11, endHour: 13, days: [0,1,2,3,4,5,6], category: "Música", color: "bg-teal-400" },
  { id: "p5", title: "Palabra de Vida", host: "Pastor Samuel Cordero", description: "Enseñanza bíblica expositiva, verso a verso. Crece en la Palabra.", start: "13:00", end: "14:00", startHour: 13, endHour: 14, days: [1,2,3,4,5], category: "Enseñanza", color: "bg-sky-400" },
  { id: "p6", title: "Jóvenes en Sintonía", host: "Joel & Naty Torres", description: "Urbano cristiano, retos, preguntas incómodas y fe relevante para Gen Z.", start: "14:00", end: "16:00", startHour: 14, endHour: 16, days: [1,2,3,4,5,6], category: "Juvenil", color: "bg-lime-400" },
  { id: "p7", title: "La Hora Feliz Familiar", host: "Familia Manantial", description: "Consejos para padres, humor sano, llamadas en vivo y dedicatorias.", start: "16:00", end: "18:00", startHour: 16, endHour: 18, days: [1,2,3,4,5], category: "Familiar", color: "bg-orange-400" },
  { id: "p8", title: "Fuentes de Agua Viva", host: "Pastor Elías Fuentes", description: "Estudio bíblico profundo los martes y jueves. Trae tu Biblia y tu cuaderno.", start: "18:00", end: "19:30", startHour: 18, endHour: 19.5, days: [2,4], category: "Enseñanza", color: "bg-indigo-400" },
  { id: "p9", title: "Noches de Adoración", host: "Ministerio Manantial", description: "Adoración íntima, peticiones de oración y ministración en vivo.", start: "19:30", end: "21:30", startHour: 19.5, endHour: 21.5, days: [0,1,2,3,4,5,6], category: "Adoración", color: "bg-violet-400" },
  { id: "p10", title: "Clamor de Medianoche", host: "Equipo de Intercesión", description: "Vigilia radial: oramos por enfermos, familias y naciones. Llámanos.", start: "21:30", end: "23:30", startHour: 21.5, endHour: 23.5, days: [0,1,2,3,4,6], category: "Oración", color: "bg-slate-400" },
  { id: "p11", title: "Vigilia Manantial", host: "Todos los pastores", description: "Todos los viernes hasta la medianoche: liberación, testimonios y poder de Dios.", start: "21:30", end: "00:00", startHour: 21.5, endHour: 24, days: [5], category: "Oración", color: "bg-red-400" },
  { id: "p12", title: "Manantial Infantil", host: "Tía Ale y Tío Memo", description: "Historias bíblicas, canciones y concursos para los más pequeños.", start: "08:00", end: "10:00", startHour: 8, endHour: 10, days: [6], category: "Infantil", color: "bg-yellow-300" },
  { id: "p13", title: "Servicio Dominical en Vivo", host: "Iglesia Manantial de Vida", description: "Transmisión en directo desde nuestro auditorio central. ¡No te lo pierdas!", start: "10:00", end: "12:30", startHour: 10, endHour: 12.5, days: [0], category: "En Vivo", color: "bg-emerald-400" },
  { id: "p14", title: "Testimonios que Transforman", host: "Carolina Marín", description: "Historias reales de milagros, restauración y segundas oportunidades.", start: "17:00", end: "18:00", startHour: 17, endHour: 18, days: [0,6], category: "Testimonios", color: "bg-fuchsia-400" },
];

export function getCurrentProgram(now = new Date()): Program | null {
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const todays = PROGRAMS.filter(p => p.days.includes(day));
  // sort by start
  todays.sort((a,b)=>a.startHour-b.startHour);
  for (const p of todays) {
    if (h >= p.startHour && h < p.endHour) return p;
  }
  return null;
}

export function getNextProgram(now = new Date()): Program | null {
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const todays = PROGRAMS.filter(p => p.days.includes(day)).sort((a,b)=>a.startHour-b.startHour);
  for (const p of todays) {
    if (p.startHour > h) return p;
  }
  // buscar mañana
  for (let d=1; d<=7; d++) {
    const nd = (day+d)%7;
    const list = PROGRAMS.filter(p=>p.days.includes(nd)).sort((a,b)=>a.startHour-b.startHour);
    if (list.length) return list[0];
  }
  return null;
}

export type Host = {
  id: string;
  name: string;
  role: string;
  show: string;
  schedule: string;
  photo: string;
  bio: string;
  social: { instagram: string; facebook: string };
};

export const HOSTS: Host[] = [
  {
    id: "h1",
    name: "Pastor Elías Fuentes",
    role: "Director General",
    show: "Amanecer con Dios",
    schedule: "Lun - Vie · 5:00 AM",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "28 años predicando el evangelio. Fundador de Radio Manantial de Vida con un llamado a llevar agua viva a los hogares.",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: "h2",
    name: "Carolina Marín",
    role: "Conductora Estrella",
    show: "Manantial de la Mañana",
    schedule: "Lun - Vie · 6:00 AM",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    bio: "Comunicadora y adoradora. Su risa contagiosa despierta a miles cada mañana con esperanza.",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: "h3",
    name: "David Marín",
    role: "Locutor & Productor",
    show: "Manantial de la Mañana",
    schedule: "Lun - Vie · 6:00 AM",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Productor musical y voz comercial. Encargado de que todo suene impecable en cabina.",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: "h4",
    name: "Pastora Miriam Rosales",
    role: "Ministerio Femenil",
    show: "Mujer Virtuosa",
    schedule: "Lun · Mié · Vie · 9:00 AM",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
    bio: "Consejera familiar y conferencista. Acompaña a mujeres en restauración y propósito.",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: "h5",
    name: "Joel Torres",
    role: "Voz Juvenil",
    show: "Jóvenes en Sintonía",
    schedule: "Lun - Sáb · 2:00 PM",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    bio: "Líder de jóvenes, rapero y creador de contenido. Conecta fe y cultura urbana.",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: "h6",
    name: "Pastor Samuel Cordero",
    role: "Maestro Bíblico",
    show: "Palabra de Vida",
    schedule: "Lun - Vie · 1:00 PM",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    bio: "Teólogo y escritor de 3 libros. Enseñanza clara, profunda y aplicable a la vida diaria.",
    social: { instagram: "#", facebook: "#" }
  },
];

export type Episode = {
  id: string;
  title: string;
  preacher: string;
  category: string;
  date: string;
  duration: string;
  plays: string;
  description: string;
  audioUrl: string;
  image: string;
};

export const EPISODES: Episode[] = [
  { id: "e1", title: "El Manantial que Nunca se Agota", preacher: "Pastor Elías Fuentes", category: "Predicación", date: "22 Sep 2026", duration: "42:15", plays: "12.4k", description: "Juan 4:14 — Cómo beber del agua viva y no volver a tener sed jamás. Mensaje del domingo.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.pexels.com/photos/10024790/pexels-photo-10024790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: "e2", title: "Restaurando el Altar Familiar", preacher: "Pastora Miriam Rosales", category: "Familia", date: "18 Sep 2026", duration: "35:40", plays: "8.1k", description: "Claves prácticas para volver a orar juntos en casa y ver milagros en tus hijos.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.pexels.com/photos/34328505/pexels-photo-34328505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: "e3", title: "Fe en Medio del Desierto", preacher: "Pastor Samuel Cordero", category: "Enseñanza", date: "15 Sep 2026", duration: "48:02", plays: "9.7k", description: "Éxodo 17 — Dios saca agua de la roca. Lo que parece sequía es tu próximo milagro.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.pexels.com/photos/36117935/pexels-photo-36117935.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: "e4", title: "Jóvenes de Fuego: No te Conformws", preacher: "Joel Torres", category: "Juvenil", date: "12 Sep 2026", duration: "28:33", plays: "15.2k", description: "Romanos 12:2 — Cómo mantenerte puro y apasionado en una generación distraída.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.pexels.com/photos/34595035/pexels-photo-34595035.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: "e5", title: "Testimonio: De la Cárcel al Púlpito", preacher: "Carolina Marín entrevista", category: "Testimonio", date: "08 Sep 2026", duration: "51:20", plays: "21.8k", description: "La historia de Andrés: 7 años preso, un encuentro radial y una vida transformada.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.pexels.com/photos/10024790/pexels-photo-10024790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: "e6", title: "La Oración que Mueve Montañas", preacher: "Equipo Intercesión", category: "Oración", date: "05 Sep 2026", duration: "39:11", plays: "6.3k", description: "Vigilia completa del viernes: ministración, clamor por sanidad y palabra profética.", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.pexels.com/photos/34328505/pexels-photo-34328505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
];

export const TOP_SONGS = [
  { pos: 1, title: "Océanos de Gracia", artist: "Manantial Worship", plays: "48.2k", trend: "up" },
  { pos: 2, title: "Agua Viva", artist: "Sofía Reyes & Coro Celestial", plays: "41.7k", trend: "up" },
  { pos: 3, title: "No Tengo Sed", artist: "Joel Torres ft. Naty", plays: "38.9k", trend: "down" },
  { pos: 4, title: "Ríos en el Desierto", artist: "Adoradores Unidos", plays: "35.4k", trend: "up" },
  { pos: 5, title: "Manantial de Amor", artist: "Miriam Rosales", plays: "29.8k", trend: "same" },
  { pos: 6, title: "Llueve Sobre Mí", artist: "Generación Viva", plays: "27.1k", trend: "up" },
];

export const VERSES = [
  { text: "Mas el que bebiere del agua que yo le daré, no tendrá sed jamás; sino que el agua que yo le daré será en él una fuente de agua que salte para vida eterna.", ref: "Juan 4:14" },
  { text: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.", ref: "Mateo 5:6" },
  { text: "Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.", ref: "Salmos 23:1-2" },
  { text: "Si alguno tiene sed, venga a mí y beba. El que cree en mí, como dice la Escritura, de su interior correrán ríos de agua viva.", ref: "Juan 7:37-38" },
  { text: "Porque yo derramaré aguas sobre el sequedal, y ríos sobre la tierra árida; mi Espíritu derramaré sobre tu generación.", ref: "Isaías 44:3" },
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  { text: "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.", ref: "Jeremías 33:3" },
  { text: "El Señor te guiará siempre; te saciará en tierras resecas y fortalecerá tus huesos. Serás como jardín bien regado, como manantial cuyas aguas no se agotan.", ref: "Isaías 58:11" },
];

export const TESTIMONIES = [
  { id: "t1", name: "Rosa Jiménez", city: "Medellín, Colombia", text: "Escuchaba la Vigilia de Oración en el hospital con mi hijo enfermo. Esa noche los médicos no se explican su recuperación. ¡Dios lo sanó mientras sonaba la radio!", program: "Clamor de Medianoche", stars: 5 },
  { id: "t2", name: "Andrés Felipe Mora", city: "Quito, Ecuador", text: "Estaba a punto de quitarme la vida cuando sintonicé por error Manantial de Vida. La palabra del Pastor Elías me detuvo. Hoy sirvo en mi iglesia y soy libre.", program: "Palabra de Vida", stars: 5 },
  { id: "t3", name: "Familia Hernández", city: "Ciudad de México", text: "Nuestro matrimonio estaba roto. Mujer Virtuosa y La Hora Feliz nos enseñaron a perdonar. Celebramos 20 años restaurados.", program: "Mujer Virtuosa", stars: 5 },
  { id: "t4", name: "Kevin Salazar", city: "Lima, Perú", text: "Jóvenes en Sintonía me alejó de las drogas. Joel oró por mí en vivo y sentí fuego. Llevo 2 años limpio y estudio para pastor.", program: "Jóvenes en Sintonía", stars: 5 },
  { id: "t5", name: "Lucía Fernández", city: "Buenos Aires, Argentina", text: "Puse mi negocio en oración con el muro de oración de la web. En 3 meses se triplicaron mis ventas y pude donar para la radio. ¡Siembra y cosecha!", program: "Muro de Oración", stars: 5 },
];

export const INITIAL_PRAYERS = [
  { id: "pr1", name: "Marta E.", request: "Por la salud de mi madre que será operada el lunes. Creemos en sanidad completa.", time: "hace 12 min", amens: 47, category: "Salud" },
  { id: "pr2", name: "José Luis", request: "Por restauración de mi matrimonio de 15 años. Que Dios ablande corazones.", time: "hace 38 min", amens: 89, category: "Familia" },
  { id: "pr3", name: "Anónimo", request: "Por trabajo. Llevo 6 meses desempleado y tengo 3 hijos. Necesito provisión.", time: "hace 1 h", amens: 132, category: "Provisión" },
  { id: "pr4", name: "Daniela P.", request: "Por mi hijo adolescente que se alejó de Dios. Que vuelva al camino.", time: "hace 2 h", amens: 76, category: "Hijos" },
];
