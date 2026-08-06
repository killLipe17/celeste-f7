export const siteData = {
  team: {
    name: "Celeste F7",
    shortName: "Celeste",
    foundedAt: "7 de janeiro de 2007",
    foundingYear: 2007,
    founder: "Danillo Scalli",
    chant: "1, 2, 3, Celeste!",
    chantParts: ["1", "2", "3", "Celeste!"],
  },
  board: ["Danillo", "Hélio", "Bob", "Rodrigo", "Guilherme"],
  schedule: {
    day: "Sábado",
    time: "10h",
  },
  matches: {
    next: {
      date: "08/08",
      opponent: "MUD F.C",
      time: "10h",
      venue: "CDC Rola Bola",
    },
    upcoming: [
      { date: "08/08", opponent: "MUD F.C", time: "10h" },
      { date: "15/08", opponent: "GANDAIA F7", time: "10h" },
      { date: "22/08", opponent: "FESTIVAL R9", time: "10h" },
      { date: "29/08", opponent: "UNIDOS DA DELPI", time: "10h" },
    ],
  },
  location: {
    city: "São Paulo",
    state: "SP",
    venue: "CDC Rola Bola",
    address:
      "Rua Dr. Nelson Madureira, 260 — Vila Nhocuné, São Paulo — SP, 03560-000",
    mapUrl: "https://maps.app.goo.gl/u5HTDpfTW8BG9wXj7",
  },
  social: {
    instagram: {
      label: "@celestef7",
      url: "https://www.instagram.com/celestef7/",
    },
  },
  images: {
    crest: "/images/escudo-celeste.png",
    sponsors: "/images/patrocinadores-celeste.png",
  },
} as const;