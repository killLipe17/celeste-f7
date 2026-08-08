import Image from "next/image";
import { siteData } from "@/data/site";
import GameCenter from "@/components/GameCenter";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Jogos", href: "#jogos" },
  { label: "História", href: "#historia" },
  { label: "Elenco", href: "#elenco" },
  { label: "Patrocinadores", href: "#patrocinadores" },
  { label: "Localização", href: "#localizacao" },
];

const rosterPositions = ["Goleiro", "Fixo", "Meia", "Ala", "Pivô"] as const;

export default function Home() {
  const { team, board, schedule, location, social, images, sponsors, roster } = siteData;

  return (
    <main className="min-h-screen overflow-hidden bg-club-deep text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-club-deep/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a
            href="#inicio"
            className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-club-sky"
            aria-label="Voltar ao início"
          >
            <Image
              src={images.crest}
              alt="Escudo oficial do Celeste F7"
              width={489}
              height={510}
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
              preload
            />

            <span className="font-display text-2xl font-black uppercase tracking-[0.05em]">
              Celeste F7
            </span>
          </a>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-club-sky"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center gap-2 rounded-full bg-club-sky px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-club-deep transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
          >
            Fale com o time
            <ArrowUpRightIcon />
          </a>

          <details className="relative sm:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/15 bg-white/5 text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-club-sky [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Abrir menu</span>
              <MenuIcon />
            </summary>

            <nav
              className="absolute right-0 top-14 w-64 rounded-2xl border border-white/10 bg-club-navy p-3 shadow-2xl"
              aria-label="Navegação móvel"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              <a
                href={social.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-club-sky px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-club-deep"
              >
                Instagram
                <ArrowUpRightIcon />
              </a>
            </nav>
          </details>
        </div>
      </header>

      <section id="inicio" className="hero-surface relative isolate scroll-mt-20">
        <div className="uniform-stripes absolute inset-0 -z-10 opacity-70" />
        <div className="hero-grid absolute inset-0 -z-10" />
        <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-club-blue/30 blur-3xl" />
        <div className="absolute -right-28 bottom-0 -z-10 h-96 w-96 rounded-full bg-club-sky/20 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-club-sky/40 bg-club-sky/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-club-sky">
                Fundado em {team.foundingYear}
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">                Futebol 7
              </span>
            </div>

            <p className="mb-3 font-display text-xl font-bold uppercase tracking-[0.3em] text-club-sky sm:text-2xl">
              Tradição em campo
            </p>

            <h1 className="font-display text-[clamp(4.8rem,17vw,10rem)] font-black uppercase leading-[0.72] tracking-[-0.045em] text-white">
              Celeste
              <span className="ml-3 text-outline">F7</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Desde 2007, construindo uma história de união, identidade e paixão
              pelo Futebol 7 em São Paulo.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#historia"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-club-sky px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-club-deep transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Nossa história
                <ArrowDownIcon />
              </a>

              <a
                href={social.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club-sky"
              >
                {social.instagram.label}
                <InstagramIcon />
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm">
              <HeroStat value={String(team.foundingYear)} label="Fundação" />
              <HeroStat value={schedule.day} label="Dia de jogo" />
              <HeroStat value={schedule.time} label="Horário" />
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="absolute inset-x-8 bottom-0 h-20 rounded-[50%] bg-black/50 blur-2xl" />

            <div className="crest-stage relative aspect-square w-full max-w-[510px]">
              <div className="absolute inset-[7%] rounded-full border border-club-sky/20" />              <div className="absolute inset-[15%] rounded-full border border-white/10" />

              <Image
                src={images.crest}
                alt="Escudo oficial do Celeste F7"
                width={489}
                height={510}
                className="relative z-10 h-full w-full object-contain p-8 drop-shadow-[0_30px_35px_rgba(0,0,0,0.5)] sm:p-12"
                preload
              />

              <span className="absolute bottom-[8%] right-[2%] z-20 rounded-full border border-white/15 bg-club-deep/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                Desde 2007
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8 lg:px-10">
          <div className="chant-banner flex items-center justify-center rounded-2xl border border-club-sky/25 bg-club-sky/10 px-6 py-6 text-center">
            <div aria-label={team.chant}>
              <div className="chant-sequence font-display font-black uppercase tracking-[0.04em]">
                {team.chantParts.map((part) => (
                  <span key={part} className="chant-word">
                    {part}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GameCenter />

      <section
        id="historia"
        className="scroll-mt-20 bg-club-deep py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Nossa história"
              title="Uma identidade construída desde 2007"
              description="O Celeste F7 carrega tradição, união e presença em campo desde 2007."
              dark
            />

            <div className="mt-8 space-y-5 text-base leading-8 text-white/70 sm:text-lg">
              <p>
                O <strong className="text-white">Celeste F7</strong> foi fundado
                em {team.foundedAt}, na cidade de São Paulo.
              </p>

              <p>
                Com suas cores azuis e o leão no escudo, o time construiu sua
                identidade no Futebol 7 amador de São Paulo, mantendo a união do grupo
                como parte da sua essência.
              </p>

              <p>
                Aos sábados, às {schedule.time}, o Celeste entra em campo no{" "}
                {location.venue} e leva consigo o grito que já virou marca do
                time: <strong className="text-white">{team.chant}</strong>
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <HistoryFact label="Fundação" value={team.foundedAt} />
              <HistoryFact label="Casa do Celeste" value={location.venue} />
              <HistoryFact label="Nosso grito" value="1, 2, 3, Celeste!" />
            </div>
          </div>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-club-sky">                  Estrutura do clube
                </p>

                <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  Diretoria
                </h3>
              </div>

              <DirectorsIcon />
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
              A diretoria do Celeste F7 sustenta a organização do time e ajuda a
              manter viva a trajetória construída dentro e fora de campo.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {board.map((director) => (
                <article
                  key={director}
                  className="director-card rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <strong className="block font-display text-3xl font-black uppercase leading-none text-white">
                    {director}
                  </strong>

                  <span className="mt-2 block text-sm text-white/50">
                    Celeste F7
                  </span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        id="elenco"
        className="scroll-mt-20 bg-[#eaf5fb] py-20 text-club-deep sm:py-24"
        style={{ colorScheme: "light" }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Nosso grupo"
            title="Elenco Celeste F7"
            dark={false}
          />

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl bg-club-navy shadow-[0_22px_70px_rgba(3,17,38,0.18)] sm:aspect-[16/9]">
            <Image
              src={images.teamPhoto}
              alt="Foto do time Celeste F7 no campo"
              fill
              sizes="(max-width: 1280px) 94vw, 1200px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-club-deep/85 via-club-deep/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-club-sky">
                Celeste F7
              </span>
              <h3 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">
                Nosso time
              </h3>
            </div>
          </div>

          <div className="mt-10 space-y-12">
            {rosterPositions.map((position) => {
              const players = roster.filter(
                (player) => player.position === position,
              );

              if (players.length === 0) {
                return null;
              }

              return (
                <div key={position}>
                  <div className="mb-5 flex items-center gap-4">
                    <h3 className="font-display text-4xl font-black uppercase leading-none text-club-deep sm:text-5xl">
                      {position}
                    </h3>
                    <div className="h-px flex-1 bg-club-deep/10" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {players.map((player) => (
                      <article
                        key={player.name}
                        className="player-card group overflow-hidden rounded-3xl border border-club-deep/10 bg-white shadow-[0_12px_35px_rgba(3,17,38,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(3,17,38,0.1)]"
                      >
                        <div className="player-photo-frame relative aspect-[3/4] overflow-hidden bg-[linear-gradient(145deg,#dff6ff,#f7fbfe)]">
                          {player.photo ? (
                            <Image
                              src={player.photo}
                              alt={`Foto de ${player.name}`}
                              fill
                              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-club-blue/45">
                              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-club-blue/10 bg-white/70">
                                <PlayerIcon />
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                                Foto em breve
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-5">
                          <h4 className="font-display text-3xl font-black uppercase leading-none text-club-deep">
                            {player.name}
                          </h4>

                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="patrocinadores"
        className="scroll-mt-20 bg-white py-20 text-club-deep sm:py-24"
        style={{ backgroundColor: "#ffffff", colorScheme: "light" }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Quem joga junto"
            title="Patrocinadores"
            description="Marcas que apoiam o Celeste F7 dentro e fora de campo."
            dark={false}
          />

          <div
            className="sponsor-carousel mt-10 rounded-3xl border border-club-deep/10 bg-white py-6 sm:py-8"
            style={{ backgroundColor: "#ffffff", colorScheme: "light" }}
          >
            <div className="sponsor-track">
              <div className="sponsor-group">
                {sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>

              <div className="sponsor-group" aria-hidden="true">
                {sponsors.map((sponsor) => (
                  <SponsorCard
                    key={`duplicate-${sponsor.name}`}
                    sponsor={sponsor}
                    duplicate
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section
        id="localizacao"
        className="scroll-mt-20 bg-club-blue py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-club-ice">
              Nossa casa
            </p>

            <h2 className="mt-3 max-w-xl font-display text-5xl font-black uppercase leading-[0.92] sm:text-6xl">
              Onde o Celeste entra em campo
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Os jogos acontecem normalmente aos sábados, às {schedule.time}, no{" "}
              {location.venue}.
            </p>
          </div>

          <article className="rounded-3xl border border-white/20 bg-club-deep p-6 shadow-[0_24px_80px_rgba(1,10,26,0.3)] sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-club-sky text-club-deep">
              <MapPinIcon />
            </div>

            <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-club-sky">
              Campo oficial
            </p>

            <h3 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">
              {location.venue}
            </h3>

            <p className="mt-5 max-w-xl leading-7 text-white/65">
              {location.address}
            </p>

            <a
              href={location.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-club-deep transition hover:bg-club-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club-sky sm:w-auto"
            >
              Abrir no Google Maps
              <ArrowUpRightIcon />
            </a>
          </article>
        </div>
      </section>

      <section className="bg-club-deep py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center sm:px-8 lg:flex-row lg:px-10 lg:text-left">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-club-sky">
              Acompanhe o time
            </p>

            <h2 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">
              Siga o Celeste no Instagram
            </h2>
          </div>

          <a
            href={social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-club-sky px-8 py-4 text-base font-black uppercase tracking-[0.1em] text-club-deep transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
          >
            <InstagramIcon />
            {social.instagram.label}
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#020a18]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-5 py-8 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <div className="flex items-center gap-3">
            <Image
              src={images.crest}
              alt="Escudo do Celeste F7"
              width={489}
              height={510}
              className="h-12 w-auto object-contain"
            />

            <div>
              <p className="font-display text-xl font-black uppercase">
                Celeste F7
              </p>
              <p className="text-xs text-white/45">São Paulo • Futebol 7</p>
            </div>
          </div>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Celeste F7. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-white/10 px-3 py-5 text-center last:border-r-0 sm:px-5 sm:text-left">
      <strong className="block font-display text-xl font-black uppercase text-white sm:text-2xl">
        {value}
      </strong>

      <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-xs font-black uppercase tracking-[0.2em] ${
          dark ? "text-club-sky" : "text-club-blue"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`mt-3 font-display text-5xl font-black uppercase leading-[0.92] sm:text-6xl ${
          dark ? "text-white" : "text-club-deep"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
            dark ? "text-white/65" : "text-club-deep/60"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}



function HistoryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-club-sky">
        {label}
      </span>

      <strong className="mt-2 block font-display text-2xl font-black uppercase leading-tight text-white">
        {value}
      </strong>
    </div>
  );
}

function SponsorCard({
  sponsor,
  duplicate = false,
}: {
  sponsor: (typeof siteData.sponsors)[number];
  duplicate?: boolean;
}) {
  return (
    <article
      className="sponsor-card overflow-hidden rounded-2xl border border-club-deep/10 bg-white shadow-[0_12px_35px_rgba(3,17,38,0.08)]"
      style={{ backgroundColor: "#ffffff", colorScheme: "light" }}
    >
      <a
        href={sponsor.primaryUrl}
        target="_blank"
        rel="noreferrer"
        tabIndex={duplicate ? -1 : undefined}
        className="group block p-4 outline-none focus-visible:ring-2 focus-visible:ring-club-blue sm:p-5"
        aria-label={`Visitar ${sponsor.name}`}
      >
        <div className="flex h-44 items-center justify-center sm:h-52">
          <Image
            src={sponsor.image}
            alt={`Logo ${sponsor.name}`}
            width={900}
            height={450}
            sizes="(max-width: 640px) 82vw, 380px"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </div>

        <div className="mt-4 flex items-end justify-between gap-4 border-t border-club-deep/8 pt-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-club-blue">
              Patrocinador
            </span>
            <h3 className="mt-1 font-display text-2xl font-black uppercase leading-none text-club-deep">
              {sponsor.name}
            </h3>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-club-sky text-club-deep transition group-hover:bg-club-deep group-hover:text-white">
            <ArrowUpRightIcon />
          </span>
        </div>
      </a>

      <div
        className="flex flex-wrap gap-2 border-t border-club-deep/8 bg-white px-5 py-3 sm:px-6"
        style={{ backgroundColor: "#ffffff", colorScheme: "light" }}
      >
        {sponsor.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={duplicate ? -1 : undefined}
            className="rounded-full border border-club-deep/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-club-blue transition hover:border-club-blue hover:bg-club-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club-blue"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M7 17 17 7M7 7h10v10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="m6 9 6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


function PlayerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path
        d="M5 21c.8-4.2 3-6 7-6s6.2 1.8 7 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DirectorsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-10 w-10 text-club-sky"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="7.5" r="3.5" />
      <path
        d="M5 20c.8-3.8 3.1-5.5 7-5.5S18.2 16.2 19 20"
        strokeLinecap="round"
      />
      <path d="M4 9.5h2M18 9.5h2" strokeLinecap="round" />
    </svg>
  );
}


