export type CompetitionType = "Amistoso" | "Copa" | "Festival";

export type GoalScorer = {
  name: string;
  goals: number;
};

export type FrameResult = {
  label: "1º quadro" | "2º quadro";
  celeste: number;
  opponent: number;
  scorers: GoalScorer[];
};

export type MatchData = {
  id: string;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  opponent: string | null;
  competition: {
    type: CompetitionType;
    name?: string;
  };
  frameCount: 1 | 2;
  result: {
    frames: FrameResult[];
  } | null;
};

export const siteData = {
  team: {
    name: "Celeste F7",
    shortName: "Celeste",
    foundedAt: "7 de janeiro de 2007",
    foundingYear: 2007,
    chant: "1, 2, 3, Celeste!",
    chantParts: ["1", "2", "3", "Celeste!"],
  },

  board: ["Danillo", "Hélio", "Bob", "Rodrigo", "Guilherme"],

  roster: [
    { name: "Fabio Lopes", status: "Mensalista", position: null },
    { name: "Dudu Ferreira", status: "Mensalista", position: null },
    { name: "Bob", status: "Mensalista", position: null },
    { name: "Gustavo Teixeira", status: "Mensalista", position: null },
    { name: "Jemerson", status: "Mensalista", position: null },
    { name: "Leonardo Leite", status: "Mensalista", position: null },
    { name: "Paulo Costa", status: "Mensalista", position: "Goleiro" },
    { name: "Rodrigo Gomes", status: "Mensalista", position: null },
    { name: "Danillo Scalli", status: "Mensalista", position: null },
    { name: "Alex Zahra", status: "Mensalista", position: null },
    { name: "Hélio Júnior", status: "Mensalista", position: null },
    { name: "Guilherme Alves", status: "Mensalista", position: null },
    { name: "Breno", status: "Mensalista", position: null },
    { name: "Gabriel Parreira", status: "Mensalista", position: null },
    { name: "Guilherme Rodrigue", status: "Mensalista", position: null },
    { name: "Marcos Vinicius", status: "Mensalista", position: null },
    { name: "Pedro Gomes", status: "Mensalista", position: null },
    { name: "Fellipe Santos", status: "Mensalista", position: null },
  ],

  schedule: {
    day: "Sábado",
    time: "10h",
  },

  matches: [
    {
      id: "2026-08-08-mud",
      date: "2026-08-08",
      displayDate: "08/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "MUD F.C",
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-08-15-gandaia",
      date: "2026-08-15",
      displayDate: "15/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "GANDAIA F7",
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-08-22-festival-r9",
      date: "2026-08-22",
      displayDate: "22/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "FESTIVAL R9",
      competition: {
        type: "Festival",
        name: "Festival R9",
      },
      frameCount: 1,
      result: null,
    },
    {
      id: "2026-08-29-unidos-delpi",
      date: "2026-08-29",
      displayDate: "29/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "UNIDOS DA DELPI",
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
  ] satisfies MatchData[],

  sponsors: [
    {
      name: "Conlicitar",
      image: "/images/sponsors/conlicitar.png",
      primaryUrl: "https://www.instagram.com/conlicitar/",
      links: [
        {
          label: "Instagram",
          url: "https://www.instagram.com/conlicitar/",
        },
      ],
    },
    {
      name: "Cacife Brand",
      image: "/images/sponsors/cacife-brand.png",
      primaryUrl: "https://www.cacifebrand.com.br/",
      links: [
        {
          label: "Site",
          url: "https://www.cacifebrand.com.br/",
        },
        {
          label: "Instagram",
          url: "https://www.instagram.com/cacifebrand/",
        },
      ],
    },
    {
      name: "Selva Pub",
      image: "/images/sponsors/selva-pub.png",
      primaryUrl: "https://www.instagram.com/selvapub__/",
      links: [
        {
          label: "Instagram",
          url: "https://www.instagram.com/selvapub__/",
        },
      ],
    },
  ],

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
    teamPhoto: "/images/time-celeste.jpg",
  },
} as const;
