export type CompetitionType = "Amistoso" | "Copa" | "Festival";
export type MatchKind = "match" | "holiday";
export type MatchStatus = "scheduled" | "cancelled";
export type PlayerPosition = "Goleiro" | "Fixo" | "Meia" | "Ala" | "Pivô";

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
  kind?: MatchKind;
  status?: MatchStatus;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  opponent: string | null;
  opponentLogo: string | null;
  competition: {
    type: CompetitionType;
    name?: string;
  };
  frameCount: 1 | 2;
  result: {
    frames: FrameResult[];
  } | null;
};

export type PlayerData = {
  name: string;
  position: PlayerPosition | null;
  photo: string | null;
};

const roster = [
  { name: "Fabio Lopes", position: "Ala", photo: null },
  { name: "Dudu Ferreira", position: "Pivô", photo: null },
  { name: "Bob", position: "Ala", photo: null },
  { name: "Gustavo Teixeira", position: "Fixo", photo: null },
  { name: "Jemerson Estevão", position: "Meia", photo: null },
  { name: "Leonardo Leite", position: "Meia", photo: null },
  { name: "Paulo Costa", position: "Goleiro", photo: null },
  { name: "Rodrigo Gomes", position: "Fixo", photo: null },
  { name: "Danillo Scalli", position: "Pivô", photo: null },
  { name: "Alex Zahra", position: "Fixo", photo: null },
  { name: "Hélio Júnior", position: "Fixo", photo: null },
  { name: "Guilherme Alves", position: "Meia", photo: null },
  { name: "Breno", position: "Meia", photo: null },
  { name: "Gabriel Parreira", position: "Pivô", photo: null },
  { name: "Guilherme Rodrigues", position: "Ala", photo: null },
  { name: "Marcos Vinicius", position: "Ala", photo: null },
  { name: "Pedro Gomes", position: "Ala", photo: null },
  { name: "Fellipe Santos", position: "Pivô", photo: null },
] satisfies PlayerData[];

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

  roster,

  schedule: {
    day: "Sábado",
    time: "10h",
  },

  matches: [
    {
      id: "2026-08-01-rancho",
      kind: "match",
      date: "2026-08-01",
      displayDate: "01/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "RANCHO",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-08-08-mud",
      kind: "match",
      date: "2026-08-08",
      displayDate: "08/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "MUD F.C",
      opponentLogo: "/images/opponents/mud-fc.png",
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: {
        frames: [
          {
            label: "2º quadro",
            celeste: 5,
            opponent: 2,
            scorers: [],
          },
          {
            label: "1º quadro",
            celeste: 7,
            opponent: 1,
            scorers: [],
          },
        ],
      },
    },
    {
      id: "2026-08-15-gandaia",
      kind: "match",
      status: "cancelled",
      date: "2026-08-15",
      displayDate: "15/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "GANDAIA F7",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-08-22-invictus-fc",
      kind: "match",
      date: "2026-08-22",
      displayDate: "22/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "INVICTUS FC",
      opponentLogo: "/images/opponents/invictus-fc.png",
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-08-29-israel-f7",
      kind: "match",
      date: "2026-08-29",
      displayDate: "29/08",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "ISRAEL F7",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-09-05-feriado",
      kind: "holiday",
      date: "2026-09-05",
      displayDate: "05/09",
      time: "—",
      venue: "CDC Rola Bola",
      opponent: "FERIADO",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 1,
      result: null,
    },
    {
      id: "2026-09-12-los-patrones",
      kind: "match",
      date: "2026-09-12",
      displayDate: "12/09",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "LOS PATRONES",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-09-19-los-patrones",
      kind: "match",
      date: "2026-09-19",
      displayDate: "19/09",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "LOS PATRONES",
      opponentLogo: null,
      competition: {
        type: "Amistoso",
      },
      frameCount: 2,
      result: null,
    },
    {
      id: "2026-09-26-los-patrones",
      kind: "match",
      date: "2026-09-26",
      displayDate: "26/09",
      time: "10h",
      venue: "CDC Rola Bola",
      opponent: "LOS PATRONES",
      opponentLogo: null,
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
    matchCardPhotos: [
      "/images/match-cards/celeste-01.jpg",
      "/images/match-cards/celeste-02.jpg",
      "/images/match-cards/celeste-03.jpg",
      "/images/match-cards/celeste-04.jpg",
      "/images/match-cards/celeste-05.jpg",
      "/images/match-cards/celeste-06.jpg",
      "/images/match-cards/celeste-07.jpg",
      "/images/match-cards/celeste-08.jpg",
      "/images/match-cards/celeste-09.jpg",
    ],
  },
} as const;
