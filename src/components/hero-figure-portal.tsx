"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export interface HeroCharacter {
  id: string;
  name: string;
  src: string;
  label: string;
}

interface HeroFigurePortalProps {
  characters: HeroCharacter[];
  activeIndex: number;
  onSelectCharacter: (index: number) => void;
  autoPlayInterval?: number; // 4500ms
}

export function HeroFigurePortal({
  characters,
  activeIndex,
  onSelectCharacter,
  autoPlayInterval = 4500,
}: HeroFigurePortalProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipFromIndex, setFlipFromIndex] = useState(activeIndex);
  const [flipKey, setFlipKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const triggerFlip = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || isFlipping) return;
    setFlipFromIndex(activeIndexRef.current);
    setIsFlipping(true);
    setFlipKey((k) => k + 1);
    onSelectCharacter(nextIndex);

    window.setTimeout(() => {
      setIsFlipping(false);
    }, 850);
  }, [isFlipping, onSelectCharacter]);

  // Auto-play loop
  useEffect(() => {
    if (isPaused || isFlipping) return;

    timerRef.current = window.setInterval(() => {
      const next = (activeIndexRef.current + 1) % characters.length;
      triggerFlip(next);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPaused, isFlipping, characters.length, autoPlayInterval, triggerFlip]);

  return (
    <div
      className="hero-portal-canvas-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => {
        const next = (activeIndexRef.current + 1) % characters.length;
        triggerFlip(next);
      }}
      aria-label="Hình tượng đại diện Hermes với hiệu ứng lật trang 3D (bấm để lật trang)"
      title="Bấm để lật trang sang nhân vật tiếp theo"
    >
      <div className={`editorial-book-stage ${isFlipping ? "is-flipping" : ""}`}>
        {/* Underneath Target Page */}
        <div className="book-page book-page-under">
          <div className="book-page-inner">
            <Image
              src={characters[activeIndex].src}
              alt={characters[activeIndex].label}
              fill
              priority
              unoptimized
              className="portal-figure-img"
              sizes="(max-width: 760px) 100vw, 44vw"
            />
            <div className="book-page-under-shadow" />
          </div>
        </div>

        {/* Turning Top Page (Only mounted during active forward flip) */}
        {isFlipping && (
          <div key={flipKey} className="book-page book-page-turning is-active-flip">
            {/* Front of the turning page */}
            <div className="book-page-face book-page-front">
              <Image
                src={characters[flipFromIndex].src}
                alt={characters[flipFromIndex].label}
                fill
                priority
                unoptimized
                className="portal-figure-img"
                sizes="(max-width: 760px) 100vw, 44vw"
              />
              <div className="book-page-crease-highlight" />
              <div className="book-page-curl-shadow" />
            </div>

            {/* Back of the turning page (Fine Art Paper Texture & Monogram) */}
            <div className="book-page-face book-page-back">
              <div className="book-back-paper">
                <span className="book-back-monogram">HB</span>
                <div className="book-back-grid" />
                <div className="book-back-caption">
                  <span>HERMES BADMINTON // EDITORIAL LOOKBOOK</span>
                  <small>PLATE 0{flipFromIndex + 1} // 2026</small>
                </div>
              </div>
              <div className="book-page-back-shadow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
