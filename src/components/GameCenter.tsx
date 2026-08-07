"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { siteData, type MatchData } from "@/data/site";

type CardMode = "pre" | "post";
type ResultTone = "win" | "draw" | "loss";

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
      return siteData.matches[0] ?? null;
    }

    return siteData.matches.find((match) => match.date >= today) ?? null;
  }, [today]);

  const upcomingMatches = useMemo(() => {
    if (!today) {
      return siteData.matches;
    }

    return siteData.matches.filter((match) => match.date >= today);
  }, [today]);

  const results = useMemo(
    () =>
      [...siteData.matches]
        .filter((match) => match.result !== null)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  const nextStatus = nextMatch && today
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
          <p className="mt-5 max-w-2xl text-base leading-7 text-club-deep/60 sm:text-lg">
            Próximos compromissos, competição e resultados oficiais do time a partir de 08/08/2026.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="score-card relative overflow-hidden rounded-3xl bg-club-navy p-6 text-white shadow-[0_20px_70px_rgba(4,23,52,0.18)] sm:p-8">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent_20%,rgba(28,181,237,0.12)_20%,rgba(28,181,237,0.12)_45%,transparent_45%)]" />

            {nextMatch ? (
              <>
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-club-sky px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-club-deep">
                      {nextStatus}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/80">
                      {competitionLabel(nextMatch)}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    {nextMatch.displayDate}
                  </span>
                </div>

                <div className="relative z-10 my-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
                  <div className="flex flex-1 flex-col items-center gap-3 text-center">
                    <Image
                      src={siteData.images.crest}
                      alt="Escudo do Celeste F7"
                      width={489}
                      height={510}
                      className="h-24 w-auto object-contain sm:h-28"
                    />
                    <strong className="font-display text-2xl font-black uppercase sm:text-3xl">
                      Celeste F7
                    </strong>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-display text-4xl font-black text-club-sky">
                      VS
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      Sábado • {nextMatch.time}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-3 text-center">
                    <div className="w-full max-w-[250px] rounded-3xl border border-white/15 bg-white/5 px-5 py-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                        Adversário
                      </span>
                      <strong className="mt-2 block font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl">
                        {opponentName(nextMatch)}
                      </strong>
                    </div>
                  </div>
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
                <p className="mt-4 max-w-md text-white/60">
                  Assim que uma nova data for definida, o próximo confronto aparecerá automaticamente aqui.
                </p>
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

            <p className="text-sm leading-6 text-club-deep/60">
              Quando o adversário ainda não estiver definido, o site exibirá automaticamente “Adversário a confirmar”.
            </p>
          </article>
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
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-club-blue">
                Histórico oficial
              </p>
              <h3 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
                Últimos resultados
              </h3>
            </div>

            <span className="text-sm font-semibold text-club-deep/45">
              Registros a partir de 08/08/2026
            </span>
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

function CalendarRow({ match }: { match: MatchData }) {
  return (
    <div className="rounded-2xl border border-club-deep/8 bg-white px-4 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-club-blue">
            {match.displayDate} • {competitionLabel(match)}
          </span>
          <strong className="mt-1 block text-sm uppercase tracking-[0.06em] text-club-deep sm:text-base">
            vs {opponentName(match)}
          </strong>
        </div>

        <span className="rounded-full bg-club-deep/5 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-club-deep/60">
          {match.time}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
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

        <h4 className="mt-5 font-display text-3xl font-black uppercase sm:text-4xl">
          Celeste F7 <span className="text-club-sky">×</span> {opponentName(match)}
        </h4>
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
                  {frame.celeste} <span className="text-club-sky">×</span> {frame.opponent}
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
      aria-label={tone === "win" ? "Vitória" : tone === "draw" ? "Empate" : "Derrota"}
      title={tone === "win" ? "Vitória" : tone === "draw" ? "Empate" : "Derrota"}
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

async function generateMatchCard(match: MatchData, mode: CardMode) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas não disponível.");
  }

  const navy = "#031126";
  const blue = "#006fbd";
  const sky = "#20b9ee";
  const white = "#f8fbff";
  const muted = "#93a8bd";

  const gradient = context.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, navy);
  gradient.addColorStop(0.55, "#071c3f");
  gradient.addColorStop(1, "#052956");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1080, 1350);

  context.save();
  context.globalAlpha = 0.13;
  context.fillStyle = blue;
  context.beginPath();
  context.moveTo(610, 0);
  context.lineTo(830, 0);
  context.lineTo(360, 1350);
  context.lineTo(140, 1350);
  context.closePath();
  context.fill();

  context.fillStyle = sky;
  context.globalAlpha = 0.08;
  context.beginPath();
  context.moveTo(860, 0);
  context.lineTo(1080, 0);
  context.lineTo(650, 1350);
  context.lineTo(430, 1350);
  context.closePath();
  context.fill();
  context.restore();

  const crest = await loadImage(siteData.images.crest);
  const crestWidth = 190;
  const crestHeight = (crest.height / crest.width) * crestWidth;
  context.drawImage(crest, 445, 72, crestWidth, crestHeight);

  context.textAlign = "center";
  context.fillStyle = sky;
  context.font = "900 30px Arial";
  context.fillText(
    mode === "post" ? "RESULTADO" : "PRÓXIMO JOGO",
    540,
    330,
  );

  context.fillStyle = white;
  context.font = "900 58px Arial";
  context.fillText("CELESTE F7", 540, 400);

  context.fillStyle = muted;
  context.font = "700 24px Arial";
  context.fillText(competitionLabel(match).toUpperCase(), 540, 452);

  context.fillStyle = white;
  context.font = "900 36px Arial";
  context.fillText(`${match.displayDate} • SÁBADO • ${match.time}`, 540, 520);

  context.strokeStyle = "rgba(255,255,255,0.14)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(130, 560);
  context.lineTo(950, 560);
  context.stroke();

  if (mode === "pre" || !match.result) {
    context.fillStyle = white;
    drawFittedText(context, "CELESTE F7", 540, 700, 78, 360);

    context.fillStyle = sky;
    context.font = "900 48px Arial";
    context.fillText("VS", 540, 790);

    context.fillStyle = white;
    drawFittedText(
      context,
      opponentName(match).toUpperCase(),
      540,
      900,
      72,
      780,
    );

    context.fillStyle = muted;
    context.font = "700 26px Arial";
    context.fillText(match.venue.toUpperCase(), 540, 1035);

    context.fillStyle = sky;
    context.font = "900 22px Arial";
    context.fillText(
      match.frameCount === 1 ? "1 QUADRO" : "2º QUADRO + 1º QUADRO",
      540,
      1090,
    );
  } else {
    context.fillStyle = white;
    drawFittedText(
      context,
      `CELESTE F7 × ${opponentName(match).toUpperCase()}`,
      540,
      640,
      54,
      850,
    );

    let y = 735;

    for (const frame of match.result.frames) {
      context.fillStyle = "rgba(255,255,255,0.06)";
      context.fillRect(120, y - 55, 840, 180);

      context.textAlign = "left";
      context.fillStyle = muted;
      context.font = "900 24px Arial";
      context.fillText(frame.label.toUpperCase(), 155, y);

      context.textAlign = "right";
      context.fillStyle = white;
      context.font = "900 60px Arial";
      context.fillText(`${frame.celeste} × ${frame.opponent}`, 925, y + 10);

      context.textAlign = "left";
      context.fillStyle = white;
      context.font = "700 22px Arial";

      const scorerText =
        frame.scorers.length > 0
          ? frame.scorers
              .map((scorer) => `⚽ ${scorer.name}${scorer.goals > 1 ? ` ×${scorer.goals}` : ""}`)
              .join("   ")
          : "Gols do Celeste: —";

      drawWrappedText(context, scorerText, 155, y + 58, 760, 30, 2);

      y += 215;
    }
  }

  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,0.12)";
  context.fillRect(120, 1215, 840, 2);

  context.fillStyle = white;
  context.font = "900 24px Arial";
  context.fillText("@CELESTEF7", 540, 1270);

  context.fillStyle = muted;
  context.font = "700 18px Arial";
  context.fillText("FUTEBOL SOCIETY • SÃO PAULO", 540, 1310);

  return await canvasToBlob(canvas);
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

  while (size > 30) {
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
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Não foi possível carregar ${src}.`));
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
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
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

