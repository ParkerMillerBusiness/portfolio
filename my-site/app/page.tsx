/* app/page.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Modal identifiers
type ModalKey = "side" | "casino" | "punch" | null;

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href?: string;
  modal?: ModalKey;
}

interface SideProject {
  title: string;
  blurb: string;
  stack: string[];
  href?: string;
}

// ---------------- side‑projects details ----------------
const sideProjects: SideProject[] = [
  {
    title: "AI‑Generated Wild West Story Game",
    blurb:
      "HackWesTX 2024 project: a web game that asks ChatGPT to weave a fresh Wild West narrative after every player choice.",
    stack: ["JavaScript", "HTML/CSS", "OpenAI API"],
    href: "https://bobsfightnews.github.io/",
  },
  {
    title: "Auto MCQ Solver",
    blurb:
      "Desktop tool that screenshots multiple‑choice questions, queries ChatGPT for the answer, then uses PyAutoGUI to click the correct option automatically.",
    stack: ["Python", "PyAutoGUI", "OpenAI API"],
  },
  {
    title: "Movie Booking System",
    blurb:
      "Fully‑functional class project letting users reserve seats and pay via Stripe checkout; built with Next.js.",
    stack: ["Next.js", "Stripe"],
    href: "https://movie-booking-system-ten.vercel.app/",
  },
];

// -------- featured cards --------
const projects: Project[] = [
  {
    title: "PunchPredictor",
    description:
      "Solo‑built UFC prediction platform with live scoring, leaderboards, and messaging. Grew to 120 beta users through user‑driven iteration.",
    image: "/box_gloves.png",
    tags: ["JavaScript", "Firebase", "AWS Lambda"],
    modal: "punch",
  },
  {
    title: "Casino Automation Bots",
    description:
      "Cloud‑based VM fleet using Python, Selenium & PyAutoGUI to auto‑play sweepstakes casino games; $60 k revenue in 6 months.",
    image: "/casino_bot.png",
    tags: ["AWS", "Selenium"],
    modal: "casino",
  },
  {
    title: "Misc Side Projects",
    description: "Assorted experiments: AI-powered story games, automated question solvers, full-stack booking platforms, and more.",
    image: "/misc_projects.jpg",
    tags: ["TypeScript", "Python", "ML"],
    modal: "side",
  },
];

export default function Home() {
  const [modal, setModal] = useState<ModalKey>(null);

  // Card component
  const CardInner = (p: Project) => (
    <>
      <div className="relative h-48 sm:h-40">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width:640px) 50vw, 100vw"
          priority
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ───────── main layout ───────── */}
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-slate-900 text-foreground">
        {/* Hero */}
        <header className="py-20 px-6 text-center sm:px-10">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Parker Miller</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            CS senior @ Texas Tech. I prototype and ship AI-powered tools, automated workflows, and dynamic web apps—turning edge cases into opportunity.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="mailto:parker_millers@hotmail.com"
              className="rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Contact me
            </Link>
<Link
  href="/Resume 2025.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full border border-black/20 dark:border-white/20 px-5 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
>
  Résumé
</Link>
          </div>
        </header>

        {/* Projects */}
        <main className="flex-1 px-6 pb-24 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">Featured Work</h2>

          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.map((p) => (
              <li
                key={p.title}
                className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow bg-white/70 dark:bg-white/5 backdrop-blur"
              >
                {p.modal ? (
                  <button type="button" onClick={() => setModal(p.modal!)} className="text-left w-full">
                    {CardInner(p)}
                  </button>
                ) : (
                  <Link href={p.href ?? "#"} target="_blank" rel="noopener noreferrer">
                    {CardInner(p)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Parker Miller • Built with Next.js & Vercel
        </footer>
      </div>

{/* ───────── side‑projects modal ───────── */}
{modal === "side" && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
    onClick={() => setModal(null)}
  >
    <div
      className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold mb-4">Misc Side Projects</h2>
      <ul className="space-y-5">
        {sideProjects.map((sp) => (
          <li key={sp.title}>
            {sp.href ? (
              <Link
                href={sp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium underline hover:no-underline"
              >
                {sp.title}
              </Link>
            ) : (
              <h3 className="text-lg font-medium">{sp.title}</h3>
            )}
            <p className="text-sm text-muted-foreground">{sp.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {sp.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setModal(null)}
        className="mt-6 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
      >
        Close
      </button>
    </div>
  </div>
)}



      {/* ───────── Casino Bot demo modal ───────── */}
      {modal === "casino" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" onClick={() => setModal(null)}>
          <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Casino Automation Bots — Demo</h2>
            <video className="w-full rounded" src="/sweeps_bot.mp4" controls autoPlay muted />
            <p className="text-sm mt-4 text-muted-foreground">Demo‑video showing the distributed VM fleet auto‑playing sweepstakes casino games via Selenium & PyAutoGUI.</p>

            <button onClick={() => setModal(null)} className="mt-6 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* ───────── PunchPredictor demo modal ───────── */}
      {modal === "punch" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" onClick={() => setModal(null)}>
          <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">PunchPredictor — Demo</h2>
            <video className="w-full rounded" src="/punchpredictor.mp4" controls autoPlay muted />
            <p className="text-sm mt-4 text-muted-foreground">Walkthrough of real‑time scoring, leaderboards, and social features powering the UFC prediction experience.</p>
            <Link href="https://punchpredictor.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 underline font-medium">
              Visit PunchPredictor.com ↗
            </Link>
            <button onClick={() => setModal(null)} className="mt-6 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
