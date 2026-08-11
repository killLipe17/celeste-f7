"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { siteData, type MatchData } from "@/data/site";

type CardMode = "pre" | "post";
type ResultTone = "win" | "draw" | "loss";

type CalendarMonthData = {
  key: string;
  label: string;
  year: string;
  entries: MatchData[];
};

const ONE_DAY = 86_400_000;

export default function GameCenter() {
  const [today, setToday] = useState<string | null>(null);
  const [cardMessage, setCardMessage] = useState("");

  useEffect(() => {
    const updateToday = () => setToday(getSaoPauloDate());
    updateToday();

    const timer = window.setInterval(updateToday, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const nextMatch = useMemo(() => {
    if (!today) {
      return (
        siteData.matches.find(
          (match) => match.kind === "match" && match.result === null,
        ) ?? null
      );
    }

    return (
      siteData.matches.find(
        (match) =>
          match.kind === "match" &&
          match.result === null &&
          match.date >= today,
      ) ?? null
    );
  }, [today]);

  const upcomingMatches = useMemo(() => {
    if (!today) {
      return siteData.matches.filter(
        (match) => match.kind === "match" && match.result === null,
      );
    }

    return siteData.matches.filter(
      (match) =>
        match.kind === "match" &&
        match.result === null &&
        match.date >= today,
    );
  }, [today]);

  const results = useMemo(
    () =>
      [...siteData.matches]
        .filter((match) => match.result !== null)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  const calendarMonths = useMemo(
    () => buildCalendarMonths([...siteData.matches]),
    [],
  );

  const nextStatus =
    nextMatch && today
      ? getNextMatchStatus(nextMatch.date, today)
      : "Próximo jogo";

  async function handleCard(match: MatchData, mode: CardMode, share: boolean) {
    try {
      setCardMessage("");

      const blob = await generateMatchCard(match, mode);
      const filename = buildCardFilename(match, mode);

      if (share) {
        const file = new File([blob], filename, { type: "image/png" });

        if (
          typeof navigator.share === "function" &&
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({
            files: [file],
            title:
              mode === "post"
                ? `Resultado Celeste F7 - ${opponentName(match)}`
                : `Próximo jogo Celeste F7 - ${opponentName(match)}`,
            text: `Celeste F7 • ${competitionLabel(match)}`,
          });
          return;
        }

        downloadBlob(blob, filename);
        setCardMessage(
          "O compartilhamento de imagem não está disponível neste navegador. O card foi baixado para você.",
        );
        return;
      }

      downloadBlob(blob, filename);
      setCardMessage("Card gerado e baixado em PNG.");
    } catch (error) {
      console.error(error);
      setCardMessage("Não foi possível gerar o card agora. Tente novamente.");
    }
  }

  async function handleCalendarCard(month: CalendarMonthData, share: boolean) {
    try {
      setCardMessage("");

      const blob = await generateCalendarCard(month);
      const filename = buildCalendarFilename(month);

      if (share) {
        const file = new File([blob], filename, { type: "image/png" });

        if (
          typeof navigator.share === "function" &&
          typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({
            files: [file],
            title: `Agenda Celeste F7 - ${month.label} ${month.year}`,
            text: `Agenda de jogos do Celeste F7 • ${month.label} ${month.year}`,
          });
          return;
        }

        downloadBlob(blob, filename);
        setCardMessage(
          "O compartilhamento de imagem não está disponível neste navegador. A agenda foi baixada para você.",
        );
        return;
      }

      downloadBlob(blob, filename);
      setCardMessage("Agenda gerada e baixada em PNG.");
    } catch (error) {
      console.error(error);
      setCardMessage("Não foi possível gerar a agenda agora. Tente novamente.");
    }
  }

  return (
    <section
      id="jogos"
      className="scroll-mt-20 bg-white py-20 text-club-deep sm:py-24"
      style={{ colorScheme: "light" }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-club-blue">
            Central de jogos
          </p>
          <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.92] text-club-deep sm:text-6xl">
            Acompanhe o Celeste
          </h2>
        </div>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="score-card relative overflow-hidden rounded-3xl bg-club-navy p-6 text-white shadow-[0_20px_70px_rgba(4,23,52,0.18)] sm:p-8">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent_20%,rgba(28,181,237,0.12)_20%,rgba(28,181,237,0.12)_45%,transparent_45%)]" />

            {nextMatch ? (
              <>
                <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                    <span className="flex min-h-10 items-center justify-center rounded-full bg-club-sky px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-club-deep sm:px-4 sm:text-xs sm:tracking-[0.16em]">
                      {nextStatus}
                    </span>
                    <span className="flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white/80 sm:px-4 sm:text-xs sm:tracking-[0.14em]">
                      {competitionLabel(nextMatch)}
                    </span>
                  </div>

                  <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-white/50 sm:inline">
                    {nextMatch.displayDate}
                  </span>
                </div>

                <div className="relative z-10 mt-8 sm:hidden">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <MiniTeamMark
                      name="Celeste F7"
                      logo={siteData.images.crest}
                      alt="Escudo do Celeste F7"
                    />

                    <span className="font-display text-2xl font-black text-club-sky">
                      VS
                    </span>

                    <MiniTeamMark
                      name={opponentName(nextMatch)}
                      logo={nextMatch.opponentLogo}
                      alt={`Escudo de ${opponentName(nextMatch)}`}
                    />
                  </div>
                </div>

                <div className="relative z-10 my-12 hidden items-center gap-8 sm:grid sm:grid-cols-[1fr_auto_1fr]">
                  <TeamMark
                    name="Celeste F7"
                    logo={siteData.images.crest}
                    alt="Escudo do Celeste F7"
                  />

                  <div className="flex flex-col items-center">
                    <span className="font-display text-4xl font-black text-club-sky">
                      VS
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Sábado • {nextMatch.time}
                    </span>
                  </div>

                  <TeamMark
                    name={opponentName(nextMatch)}
                    logo={nextMatch.opponentLogo}
                    alt={`Escudo de ${opponentName(nextMatch)}`}
                    opponent
                  />
                </div>

                <div className="relative z-10 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/65 sm:grid-cols-3">
                  <InfoLine label="Data" value={nextMatch.displayDate} />
                  <InfoLine label="Horário" value={nextMatch.time} />
                  <InfoLine label="Local" value={nextMatch.venue} />
                </div>

                <div className="relative z-10 mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleCard(nextMatch, "pre", false)}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-club-sky px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-club-deep transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <DownloadIcon />
                    Baixar card
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCard(nextMatch, "pre", true)}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club-sky"
                  >
                    <ShareIcon />
                    Compartilhar
                  </button>
                </div>
              </>
            ) : (
              <div className="relative z-10 flex min-h-[410px] flex-col items-center justify-center text-center">
                <span className="rounded-full bg-club-sky px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-club-deep">
                  Agenda em atualização
                </span>
                <h3 className="mt-7 font-display text-5xl font-black uppercase">
                  Próximo jogo a confirmar
                </h3>
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-club-deep/10 bg-[#f3f8fc] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-club-blue">
                  Calendário
                </p>
                <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none">
                  Próximos jogos
                </h3>
              </div>

              <CalendarIcon />
            </div>

            <div className="my-9 space-y-3">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map((match) => (
                  <CalendarRow key={match.id} match={match} />
                ))
              ) : (
                <div className="rounded-2xl border border-club-deep/8 bg-white px-4 py-5 text-sm text-club-deep/55">
                  Novas datas serão publicadas assim que forem confirmadas.
                </div>
              )}
            </div>
          </article>
        </div>

        <div className="mt-12">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-club-blue">
              Agenda para compartilhar
            </p>
            <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
              Calendários mensais
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-club-deep/55 sm:text-base">
              Baixe ou compartilhe a agenda completa de cada mês com todos os compromissos no mesmo padrão visual.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {calendarMonths.map((month) => (
              <MonthlyAgendaCard
                key={month.key}
                month={month}
                onDownload={() => handleCalendarCard(month, false)}
                onShare={() => handleCalendarCard(month, true)}
              />
            ))}
          </div>
        </div>

        {cardMessage ? (
          <p
            className="mt-4 rounded-2xl border border-club-blue/10 bg-club-blue/5 px-4 py-3 text-sm text-club-deep/65"
            role="status"
          >
            {cardMessage}
          </p>
        ) : null}

        <div className="mt-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-club-blue">
              Histórico oficial
            </p>
            <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
              Últimos resultados
            </h3>
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {results.map((match) => (
                <ResultCard
                  key={match.id}
                  match={match}
                  onDownload={() => handleCard(match, "post", false)}
                  onShare={() => handleCard(match, "post", true)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MonthlyAgendaCard({
  month,
  onDownload,
  onShare,
}: {
  month: CalendarMonthData;
  onDownload: () => void;
  onShare: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-club-deep/10 bg-club-navy text-white shadow-[0_18px_55px_rgba(3,17,38,0.12)]">
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-club-sky">
              Agenda de jogos
            </span>
            <h4 className="mt-1 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
              {month.label} {month.year}
            </h4>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-club-sky">
            <CalendarIcon />
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4 sm:p-5">
        {month.entries.map((entry) => (
          <div
            key={entry.id}
            className="grid grid-cols-[82px_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3"
          >
            <span className="font-display text-xl font-black text-club-sky">
              {entry.displayDate}
            </span>
            <strong className="truncate text-sm font-black uppercase tracking-[0.06em] text-white sm:text-base">
              {calendarEntryLabel(entry)}
            </strong>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
        Sábado • 10h • CDC Rola Bola
      </div>

      <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2 sm:p-5">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-club-sky px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-club-deep transition hover:bg-white"
        >
          <DownloadIcon />
          Baixar agenda
        </button>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-white/10"
        >
          <ShareIcon />
          Compartilhar
        </button>
      </div>
    </article>
  );
}

function TeamMark({
  name,
  logo,
  alt,
  opponent = false,
}: {
  name: string;
  logo: string | null;
  alt: string;
  opponent?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:gap-3">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/7 sm:h-32 sm:w-32 ${
          logo
            ? opponent
              ? "p-1 sm:p-1.5"
              : "p-2 sm:p-3"
            : "p-2 sm:p-4"
        }`}
      >
        {logo ? (
          <Image
            src={logo}
            alt={alt}
            width={489}
            height={510}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-white/25 text-white/35">
            <ShieldIcon />
          </div>
        )}
      </div>

      <strong className="max-w-[130px] font-display text-base font-black uppercase leading-[0.95] sm:max-w-[220px] sm:text-3xl sm:leading-none">
        {name}
      </strong>
    </div>
  );
}

function CalendarRow({ match }: { match: MatchData }) {
  return (
    <div className="rounded-2xl border border-club-deep/8 bg-white px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-club-deep/8 bg-[#f3f8fc] p-1 text-club-blue/35">
          {match.opponentLogo ? (
            <Image
              src={match.opponentLogo}
              alt={`Escudo de ${opponentName(match)}`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          ) : (
            <ShieldIcon />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-club-blue">
            {match.displayDate} • {competitionLabel(match)}
          </span>
          <strong className="mt-1 block truncate text-sm uppercase tracking-[0.06em] text-club-deep sm:text-base">
            vs {opponentName(match)}
          </strong>
        </div>

        <span className="shrink-0 rounded-full bg-club-deep/5 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-club-deep/60">
          {match.time}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 pl-[4.5rem]">
        <span className="rounded-full bg-club-sky/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-club-blue">
          {match.frameCount === 1 ? "1 quadro" : "2 quadros"}
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  match,
  onDownload,
  onShare,
}: {
  match: MatchData;
  onDownload: () => void;
  onShare: () => void;
}) {
  if (!match.result) {
    return null;
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-club-deep/10 bg-club-navy text-white shadow-[0_18px_55px_rgba(3,17,38,0.14)]">
      <div className="border-b border-white/10 px-6 py-5 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-club-sky px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-club-deep">
            {competitionLabel(match)}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
            {match.displayDate}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <MiniTeamMark
            name="Celeste F7"
            logo={siteData.images.crest}
            alt="Escudo do Celeste F7"
          />
          <span className="font-display text-2xl font-black text-club-sky">×</span>
          <MiniTeamMark
            name={opponentName(match)}
            logo={match.opponentLogo}
            alt={`Escudo de ${opponentName(match)}`}
          />
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {match.result.frames.map((frame) => {
          const tone = resultTone(frame.celeste, frame.opponent);

          return (
            <div
              key={frame.label}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ResultDot tone={tone} />
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-white/55">
                    {frame.label}
                  </span>
                </div>

                <strong className="font-display text-4xl font-black text-white">
                  {frame.celeste}{" "}
                  <span className="text-club-sky">×</span>{" "}
                  {frame.opponent}
                </strong>
              </div>

              {frame.scorers.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {frame.scorers.map((scorer) => (
                    <span
                      key={`${frame.label}-${scorer.name}`}
                      className="rounded-full bg-white/7 px-3 py-2 text-xs font-bold text-white/80"
                    >
                      ⚽ {scorer.name}
                      {scorer.goals > 1 ? ` ×${scorer.goals}` : ""}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2 sm:p-5">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-club-sky px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-club-deep transition hover:bg-white"
        >
          <DownloadIcon />
          Baixar resultado
        </button>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-white/10"
        >
          <ShareIcon />
          Compartilhar
        </button>
      </div>
    </article>
  );
}

function MiniTeamMark({
  name,
  logo,
  alt,
}: {
  name: string;
  logo: string | null;
  alt: string;
}) {
  return (
    <div className="min-w-0 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/7 p-1.5 text-white/30">
        {logo ? (
          <Image
            src={logo}
            alt={alt}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        ) : (
          <ShieldIcon />
        )}
      </div>
      <strong className="mt-2 block truncate text-xs font-black uppercase tracking-[0.06em] text-white/75">
        {name}
      </strong>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 sm:block sm:text-center">
      <span className="font-bold uppercase tracking-[0.08em] text-white/40">
        {label}
      </span>
      <strong className="block text-white/80 sm:mt-1">{value}</strong>
    </div>
  );
}

function ResultDot({ tone }: { tone: ResultTone }) {
  const classes = {
    win: "bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.35)]",
    draw: "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.3)]",
    loss: "bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.3)]",
  };

  return (
    <span
      className={`h-3 w-3 shrink-0 rounded-full ${classes[tone]}`}
      aria-label={
        tone === "win" ? "Vitória" : tone === "draw" ? "Empate" : "Derrota"
      }
      title={
        tone === "win" ? "Vitória" : tone === "draw" ? "Empate" : "Derrota"
      }
    />
  );
}

function opponentName(match: MatchData) {
  return match.opponent?.trim() || "Adversário a confirmar";
}

function competitionLabel(match: MatchData) {
  if (match.competition.name) {
    return `${match.competition.type} • ${match.competition.name}`;
  }

  return match.competition.type;
}

function cardCompetitionLabel(match: MatchData) {
  return match.competition.name?.trim() || match.competition.type;
}

const MONTH_LABELS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

function buildCalendarMonths(matches: MatchData[]): CalendarMonthData[] {
  const grouped = new Map<string, CalendarMonthData>();
  const sorted = [...matches].sort((a, b) => a.date.localeCompare(b.date));

  for (const match of sorted) {
    const [year, month] = match.date.split("-");
    const monthIndex = Number(month) - 1;
    const label = MONTH_LABELS[monthIndex] ?? month;
    const key = `${year}-${month}`;

    const current = grouped.get(key);

    if (current) {
      current.entries.push(match);
      continue;
    }

    grouped.set(key, {
      key,
      label,
      year,
      entries: [match],
    });
  }

  return [...grouped.values()];
}

function calendarEntryLabel(match: MatchData) {
  return match.kind === "holiday" ? "FERIADO" : `VS ${opponentName(match)}`;
}

function resultTone(celeste: number, opponent: number): ResultTone {
  if (celeste > opponent) return "win";
  if (celeste < opponent) return "loss";
  return "draw";
}

function getSaoPauloDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

function getNextMatchStatus(matchDate: string, today: string) {
  const difference = dateDiffInDays(matchDate, today);

  if (difference === 0) {
    return "Hoje é dia de Celeste";
  }

  if (difference === 1) {
    return "Amanhã";
  }

  return "Próximo jogo";
}

function dateDiffInDays(target: string, current: string) {
  const targetTime = Date.parse(`${target}T12:00:00Z`);
  const currentTime = Date.parse(`${current}T12:00:00Z`);

  return Math.round((targetTime - currentTime) / ONE_DAY);
}

function buildCardFilename(match: MatchData, mode: CardMode) {
  const opponent = opponentName(match)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `celeste-f7-${mode === "post" ? "resultado" : "jogo"}-${opponent}.png`;
}

function buildCalendarFilename(month: CalendarMonthData) {
  const monthSlug = month.label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `celeste-f7-agenda-${monthSlug}-${month.year}.png`;
}

async function generateCalendarCard(month: CalendarMonthData) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas não disponível.");
  }

  const white = "#ffffff";
  const sky = "#20b9ee";
  const muted = "#c9d7e5";

  drawCalendarBackground(context);

  context.textAlign = "center";
  context.fillStyle = sky;
  context.font = "900 54px Arial";
  context.fillText("AGENDA DE JOGOS", 540, 92);

  context.fillStyle = white;
  drawFittedText(
    context,
    `${month.label} ${month.year}`.toUpperCase(),
    540,
    158,
    64,
    850,
  );

  context.fillStyle = muted;
  context.font = "700 18px Arial";
  context.fillText("CELESTE F7 • FUTEBOL 7 • SÃO PAULO", 540, 198);

  const crest = await loadImage(siteData.images.crest);

  context.save();
  context.shadowColor = "rgba(32,185,238,0.28)";
  context.shadowBlur = 24;
  drawImageContain(context, crest, 420, 215, 240, 250);
  context.restore();

  const listCenterY = 744;
  const listAvailableHeight = 570;
  const gap = 14;
  const count = Math.max(month.entries.length, 1);
  const rowHeight = Math.min(
    96,
    (listAvailableHeight - gap * Math.max(count - 1, 0)) / count,
  );
  const totalHeight = rowHeight * count + gap * Math.max(count - 1, 0);
  let rowY = listCenterY - totalHeight / 2;

  for (const entry of month.entries) {
    roundedRect(context, 140, rowY, 800, rowHeight, 22);
    context.fillStyle = "rgba(255,255,255,0.075)";
    context.fill();
    context.strokeStyle = "rgba(255,255,255,0.12)";
    context.lineWidth = 1.5;
    context.stroke();

    context.textAlign = "left";
    context.fillStyle = sky;
    context.font = "900 34px Arial";
    context.fillText(entry.displayDate, 182, rowY + rowHeight / 2 + 12);

    context.strokeStyle = "rgba(255,255,255,0.12)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(315, rowY + 20);
    context.lineTo(315, rowY + rowHeight - 20);
    context.stroke();

    context.fillStyle = white;
    drawFittedText(
      context,
      calendarEntryLabel(entry).toUpperCase(),
      350,
      rowY + rowHeight / 2 + 12,
      34,
      535,
    );

    rowY += rowHeight + gap;
  }

  context.textAlign = "center";
  context.fillStyle = white;
  context.font = "900 28px Arial";
  context.fillText("SÁBADO • 10H", 540, 1110);

  context.fillStyle = muted;
  context.font = "900 24px Arial";
  context.fillText("CDC ROLA BOLA", 540, 1152);

  context.fillStyle = "rgba(255,255,255,0.14)";
  context.fillRect(120, 1205, 840, 2);

  const sponsorAssets: Array<{ name: string; image: HTMLImageElement }> = [];

  for (const sponsor of siteData.sponsors) {
    try {
      sponsorAssets.push({
        name: sponsor.name,
        image: await loadImage(sponsor.image),
      });
    } catch {
      // Se uma logo não carregar, a agenda continua sendo gerada com as demais.
    }
  }

  drawSponsorFooter(context, sponsorAssets);

  context.fillStyle = white;
  context.font = "900 19px Arial";
  context.fillText("@CELESTEF7  •  FUTEBOL 7", 540, 1322);

  return await canvasToBlob(canvas);
}

function drawCalendarBackground(context: CanvasRenderingContext2D) {
  const gradient = context.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, "#04152f");
  gradient.addColorStop(0.5, "#071f43");
  gradient.addColorStop(1, "#020b1b");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1080, 1350);

  context.save();
  context.fillStyle = "rgba(32,185,238,0.07)";
  context.beginPath();
  context.moveTo(0, 120);
  context.lineTo(470, 0);
  context.lineTo(710, 0);
  context.lineTo(0, 330);
  context.closePath();
  context.fill();

  context.beginPath();
  context.moveTo(1080, 260);
  context.lineTo(1080, 590);
  context.lineTo(610, 1350);
  context.lineTo(390, 1350);
  context.closePath();
  context.fill();

  context.strokeStyle = "rgba(255,255,255,0.055)";
  context.lineWidth = 3;
  context.strokeRect(82, 245, 916, 760);

  context.beginPath();
  context.moveTo(540, 245);
  context.lineTo(540, 1005);
  context.stroke();

  context.beginPath();
  context.arc(540, 625, 132, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.arc(540, 625, 7, 0, Math.PI * 2);
  context.fillStyle = "rgba(255,255,255,0.07)";
  context.fill();

  context.strokeStyle = "rgba(32,185,238,0.07)";
  context.lineWidth = 2;
  for (let y = 80; y < 1180; y += 120) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(1080, y + 210);
    context.stroke();
  }

  context.restore();
}

async function generateMatchCard(match: MatchData, mode: CardMode) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas não disponível.");
  }

  const white = "#ffffff";
  const sky = "#20b9ee";
  const navy = "#031126";
  const muted = "#c9d7e5";

  const photoPaths = siteData.images.matchCardPhotos;
  const photoPath =
    photoPaths[Math.floor(Math.random() * photoPaths.length)] ??
    siteData.images.teamPhoto;

  const background = await loadImage(photoPath);
  drawImageCover(context, background, 0, 0, canvas.width, canvas.height);

  const topShade = context.createLinearGradient(0, 0, 0, 1350);
  topShade.addColorStop(0, "rgba(3,17,38,0.22)");
  topShade.addColorStop(0.42, "rgba(3,17,38,0.12)");
  topShade.addColorStop(0.68, "rgba(3,17,38,0.72)");
  topShade.addColorStop(1, "rgba(3,17,38,0.98)");
  context.fillStyle = topShade;
  context.fillRect(0, 0, 1080, 1350);

  const sideShade = context.createLinearGradient(0, 0, 1080, 0);
  sideShade.addColorStop(0, "rgba(3,17,38,0.32)");
  sideShade.addColorStop(0.5, "rgba(3,17,38,0.04)");
  sideShade.addColorStop(1, "rgba(3,17,38,0.32)");
  context.fillStyle = sideShade;
  context.fillRect(0, 0, 1080, 1350);

  context.textAlign = "center";

  context.fillStyle = sky;
  context.font = "900 56px Arial";
  context.fillText("MATCH DAY", 540, 112);

  context.fillStyle = white;
  drawFittedText(
    context,
    cardCompetitionLabel(match).toUpperCase(),
    540,
    162,
    36,
    820,
  );

  context.fillStyle = muted;
  context.font = "700 18px Arial";
  context.fillText("FUTEBOL 7 • SÃO PAULO", 540, 198);

  const crest = await loadImage(siteData.images.crest);

  if (mode === "pre" || !match.result) {
    drawLogoPlate(context, crest, 300, 655, 190, 24);

    if (match.opponentLogo) {
      const opponentLogo = await loadImage(match.opponentLogo);
      drawLogoPlate(context, opponentLogo, 780, 655, 190, 13);
    } else {
      drawOpponentPlaceholder(context, 780, 655, 190, opponentName(match));
    }

    context.fillStyle = white;
    context.font = "900 48px Arial";
    context.fillText("VS", 540, 680);

    context.fillStyle = white;
    drawFittedText(context, "CELESTE F7", 300, 805, 38, 330);
    drawFittedText(
      context,
      opponentName(match).toUpperCase(),
      780,
      805,
      38,
      330,
    );

    context.fillStyle = sky;
    context.font = "900 48px Arial";
    context.fillText(
      `${match.displayDate} • ${match.time.toUpperCase()}`,
      540,
      930,
    );

    context.fillStyle = white;
    context.font = "900 28px Arial";
    context.fillText("SÁBADO", 540, 980);

    context.fillStyle = muted;
    drawFittedText(
      context,
      match.venue.toUpperCase(),
      540,
      1035,
      28,
      820,
    );

  } else {
    drawLogoPlate(context, crest, 300, 580, 170, 21);

    if (match.opponentLogo) {
      const opponentLogo = await loadImage(match.opponentLogo);
      drawLogoPlate(context, opponentLogo, 780, 580, 170, 12);
    } else {
      drawOpponentPlaceholder(context, 780, 580, 170, opponentName(match));
    }

    context.fillStyle = sky;
    context.font = "900 42px Arial";
    context.fillText("×", 540, 605);

    context.fillStyle = white;
    drawFittedText(context, "CELESTE F7", 300, 710, 34, 320);
    drawFittedText(
      context,
      opponentName(match).toUpperCase(),
      780,
      710,
      34,
      320,
    );

    context.textAlign = "center";
    context.fillStyle = sky;
    context.font = "900 26px Arial";
    context.fillText(
      "RESULTADO FINAL",
      540,
      match.result.frames.length === 1 ? 810 : 770,
    );

    let y = match.result.frames.length === 1 ? 890 : 835;

    for (const frame of match.result.frames) {
      roundedRect(context, 245, y - 56, 590, 112, 24);
      context.fillStyle = "rgba(3,17,38,0.82)";
      context.fill();

      context.textAlign = "center";
      context.fillStyle = white;
      context.font = "900 72px Arial";
      context.fillText(`${frame.celeste} × ${frame.opponent}`, 540, y + 24);

      y += 132;
    }

    context.textAlign = "center";
    context.fillStyle = sky;
    context.font = "900 28px Arial";
    context.fillText(
      `${match.displayDate} • ${match.venue.toUpperCase()}`,
      540,
      1125,
    );
  }

  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,0.14)";
  context.fillRect(120, 1205, 840, 2);

  const sponsorAssets: Array<{ name: string; image: HTMLImageElement }> = [];

  for (const sponsor of siteData.sponsors) {
    try {
      sponsorAssets.push({
        name: sponsor.name,
        image: await loadImage(sponsor.image),
      });
    } catch {
      // Se uma logo não carregar, o card continua sendo gerado com as demais.
    }
  }

  drawSponsorFooter(context, sponsorAssets);

  context.fillStyle = white;
  context.font = "900 19px Arial";
  context.fillText("@CELESTEF7  •  FUTEBOL 7", 540, 1322);

  return await canvasToBlob(canvas);
}

function drawSponsorFooter(
  context: CanvasRenderingContext2D,
  sponsors: Array<{ name: string; image: HTMLImageElement }>,
) {
  if (sponsors.length === 0) {
    return;
  }

  const visibleSponsors = sponsors.slice(0, 3);
  const areaX = 120;
  const areaY = 1220;
  const areaWidth = 840;
  const areaHeight = 84;

  // Fundo branco devolve contraste total às três marcas em qualquer foto.
  context.save();
  roundedRect(context, areaX, areaY, areaWidth, areaHeight, 18);
  context.fillStyle = "rgba(255,255,255,0.96)";
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.72)";
  context.lineWidth = 1;
  context.stroke();
  context.restore();

  const slotWidth = areaWidth / visibleSponsors.length;

  visibleSponsors.forEach((sponsor, index) => {
    const slotCenterX = areaX + slotWidth * index + slotWidth / 2;
    const sizing = sponsorFooterSizing(sponsor.name);

    const scale = Math.min(
      sizing.maxWidth / sponsor.image.width,
      sizing.maxHeight / sponsor.image.height,
    );
    const drawWidth = sponsor.image.width * scale;
    const drawHeight = sponsor.image.height * scale;
    const drawX = slotCenterX - drawWidth / 2;
    const drawY = areaY + (areaHeight - drawHeight) / 2;

    context.save();
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.drawImage(sponsor.image, drawX, drawY, drawWidth, drawHeight);
    context.restore();
  });
}

function sponsorFooterSizing(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("conlicitar")) {
    return { maxWidth: 255, maxHeight: 70 };
  }

  if (normalized.includes("cacife")) {
    return { maxWidth: 198, maxHeight: 48 };
  }

  if (normalized.includes("selva")) {
    return { maxWidth: 215, maxHeight: 82 };
  }

  return { maxWidth: 190, maxHeight: 58 };
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function drawLogoPlate(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  centerX: number,
  centerY: number,
  size: number,
  padding = 20,
) {
  context.save();
  context.beginPath();
  context.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
  context.fillStyle = "rgba(255,255,255,0.94)";
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.45)";
  context.lineWidth = 3;
  context.stroke();
  context.restore();

  drawImageContain(
    context,
    image,
    centerX - size / 2 + padding,
    centerY - size / 2 + padding,
    size - padding * 2,
    size - padding * 2,
  );
}

function drawOpponentPlaceholder(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  name: string,
) {
  context.save();
  context.beginPath();
  context.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
  context.fillStyle = "rgba(255,255,255,0.92)";
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.45)";
  context.lineWidth = 3;
  context.stroke();

  context.fillStyle = "#071c3f";
  context.textAlign = "center";
  context.font = "900 42px Arial";
  context.fillText(getInitials(name), centerX, centerY + 14);
  context.restore();
}

function drawImageContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function getInitials(name: string) {
  if (name === "Adversário a confirmar") {
    return "?";
  }

  const parts = name
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 3).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function drawFittedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  startSize: number,
  maxWidth: number,
) {
  let size = startSize;

  while (size > 20) {
    context.font = `900 ${size}px Arial`;
    if (context.measureText(text).width <= maxWidth) {
      break;
    }
    size -= 2;
  }

  context.fillText(text, x, y);
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  let lines = 0;

  for (let index = 0; index < words.length; index += 1) {
    const testLine = `${line}${words[index]} `;

    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line.trim(), x, currentY);
      line = `${words[index]} `;
      currentY += lineHeight;
      lines += 1;

      if (lines >= maxLines - 1) {
        break;
      }
    } else {
      line = testLine;
    }
  }

  if (line && lines < maxLines) {
    context.fillText(line.trim(), x, currentY);
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error(`Não foi possível carregar ${src}.`));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Não foi possível criar o PNG."));
      }
    }, "image/png");
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-10 w-10 text-club-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
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
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M12 3 5.5 5.5v5.7c0 4.6 2.5 7.7 6.5 9.8 4-2.1 6.5-5.2 6.5-9.8V5.5L12 3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
