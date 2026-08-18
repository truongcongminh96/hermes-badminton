"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";

const loadingStages = ["Căng dây", "Căn lưới", "Gọi cầu", "Mở sân"];

const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    const complete = () => resolve();
    image.onload = complete;
    image.onerror = complete;
    image.src = src;

    if (image.complete) {
      const decoded = image.decode?.();
      if (decoded) {
        void decoded.catch(() => undefined).finally(complete);
      } else {
        complete();
      }
    }
  });
}

export function HermesLoadingGate() {
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepDuration = reducedMotion ? 0 : 190;
    const minimumDuration = reducedMotion ? 0 : 1_650;
    const startedAt = performance.now();

    const updateStage = (nextStage: number) => {
      if (!cancelled) setStage(nextStage);
    };

    const finish = async () => {
      if (cancelled) return;
      setExiting(true);
      delete document.documentElement.dataset.loadingGate;
      await wait(reducedMotion ? 0 : 520);
      if (!cancelled) setVisible(false);
    };

    const boot = async () => {
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const visualsReady = Promise.all([
        preloadImage("/images/logo.svg"),
        preloadImage("/images/portal-figure-hero-toned.png"),
      ]);

      updateStage(0);
      await wait(stepDuration);
      updateStage(1);
      await Promise.race([fontsReady, wait(720)]);
      await wait(stepDuration);
      updateStage(2);
      await Promise.race([visualsReady, wait(980)]);
      await wait(stepDuration);
      updateStage(3);
      await wait(Math.max(0, minimumDuration - (performance.now() - startedAt)));
      await finish();
    };

    void boot();
    return () => {
      cancelled = true;
      delete document.documentElement.dataset.loadingGate;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`hermes-loader ${exiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Đang chuẩn bị sân. ${loadingStages[stage]}.`}
      style={{
        "--loader-progress": `${(stage + 1) / loadingStages.length}`,
        "--loader-progress-position": `${((stage + 1) / loadingStages.length) * 100}%`,
      } as CSSProperties}
    >
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-inner">
        <div className="loader-brand">
          <img src="/images/logo.svg" alt="" />
          <span>Hermes / Badminton</span>
        </div>
        <div className="loader-court" aria-hidden="true">
          <span className="loader-monogram">HB</span>
          <span className="loader-axis"><i /></span>
          <span className="loader-marker" />
        </div>
        <div className="loader-readout">
          <p>Prepare the court</p>
          <strong>{loadingStages[stage]}</strong>
          <span>{String(stage + 1).padStart(2, "0")} / {String(loadingStages.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

export function RevealController() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"night" | "day">("night");

  useEffect(() => {
    const saved = window.localStorage.getItem("hermes-badminton-theme");
    const nextTheme = saved === "day" ? "day" : "night";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "night" ? "day" : "night";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("hermes-badminton-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      <span>Mode</span>
      <strong>{theme === "night" ? "Night" : "Day"}</strong>
    </button>
  );
}

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 650);
  };

  return (
    <form className="join-form" onSubmit={submit}>
      <div className="field-group">
        <label htmlFor="player-email">Email của bạn</label>
        <input
          id="player-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="player@hermes.club"
          required
          disabled={status !== "idle"}
        />
        <span className="field-help">Lịch sân và buổi tập mới sẽ được gửi qua email.</span>
      </div>
      <button className="primary-button form-button" type="submit" disabled={status !== "idle"}>
        {status === "idle" && "Vào đội hình"}
        {status === "loading" && "Đang ghi danh"}
        {status === "success" && "Đã ghi danh"}
      </button>
      <p className={`form-status form-status-${status}`} aria-live="polite">
        {status === "loading" && <><span>Lineup in progress</span><i aria-hidden="true" /></>}
        {status === "success" && "Court ready. Hẹn gặp bạn trên sân."}
      </p>
    </form>
  );
}
