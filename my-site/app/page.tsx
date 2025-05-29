/* app/page.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ModalKey = "side" | "casino" | null;

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href?: string;      // external link (if any)
  modal?: ModalKey;   // which modal to trigger
};

/* -------- details for the “side projects” modal -------- */
const sideProjects = [
  {
    title: "Wind-Turbine Simulator",
    blurb:
      "Interactive model estimating highway-side VAWT output under variable traffic patterns.",
    stack: ["TypeScript", "Three.js"],
  },
  {
    title: "SQL Tutor CLI",
    blurb:
      "Terminal coach that generates practice queries & checks answers against an in-memory SQLite DB.",
    stack: ["Python", "SQLite"],
  },
  {
    title: "Voice-Cloner",
    blurb:
      "FastSpeech-based tool for creating short custom TTS voices from 30-second samples.",
    stack: ["PyTorch", "Gradio"],
  },
];

/* ---------------- featured cards ---------------- */
const projects: Project[] = [
  {
    title: "PunchPredictor",
    description:
      "Solo-built UFC prediction platform with live scoring, leaderboards, and messaging. Grew to 120 beta users through user-driven iteration.",
    image: "/box_gloves.png",
    href: "https://punchpredictor.com",
    tags: ["JavaScript", "Firebase", "AWS Lambda"],
  },
  {
    title: "Casino Automation Bots",
    description:
      "Cloud-based VM fleet using Python, Selenium & PyAutoGUI to auto-play sweepstakes casino games; earned $60 k revenue in 6 months.",
    image: "/casino_bot.png",
    tags: ["AWS", "Selenium"],
    modal: "casino",          // → opens demo-video modal
  },
  {
    title: "Misc Side Projects",
    description:
      "Assorted experiments: wind-turbine simulator, SQL tutor CLI, voice-cloner, etc.",
    image: "/image3.jpg",
    tags: ["TypeScript", "Python", "ML"],
    modal: "side",            // → opens side-projects modal
  },
];

export default function Home() {
  const [modal, setModal] = useState<ModalKey>(null);

  /* ------------ reusable card component ------------ */
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
      {/* ---------- main page ---------- */}
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-slate-900 text-foreground">
        {/* Hero */}
        <header className="py-20 px-6 text-center sm:px-10">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Parker Miller
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            Computer-science senior @ Texas Tech. I build data-driven products
            that turn <span className="italic">edge cases</span> into
            opportunities.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="mailto:parker_millers@hotmail.com"
              className="rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Contact me
            </Link>
            <Link
              href="/resume.pdf"
              className="rounded-full border border-black/20 dark:border-white/20 px-5 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Résumé
            </Link>
          </div>
        </header>

        {/* Projects */}
        <main className="flex-1 px-6 pb-24 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
            Featured Work
          </h2>

          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.map((p) => (
              <li
                key={p.title}
                className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow bg-white/70 dark:bg-white/5 backdrop-blur"
              >
                {p.modal ? (
                  /* modal-trigger card */
                  <button
                    type="button"
                    onClick={() => setModal(p.modal!)}
                    className="text-left w-full"
                  >
                    {CardInner(p)}
                  </button>
                ) : (
                  /* external-link card */
                  <Link
                    href={p.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

      {/* ---------- SIDE-PROJECTS MODAL ---------- */}
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
                  <h3 className="font-medium">{sp.title}</h3>
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

      {/* ---------- CASINO-DEMO MODAL ---------- */}
      {modal === "casino" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Casino Automation Bots — Demo
            </h2>
            <video
              className="w-full rounded"
              src="/casino_demo.mp4"  /* place this file in /public */
              controls
              autoPlay
              muted
            />
            <p className="text-sm mt-4 text-muted-foreground">
              Screen-capture showing the distributed VM fleet auto-playing
              sweepstakes casino games via Selenium & PyAutoGUI.
            </p>

            <button
              onClick={() => setModal(null)}
              className="mt-6 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
