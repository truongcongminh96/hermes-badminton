"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HermesLoadingGate,
  JoinForm,
  RevealController,
  ThemeToggle,
  RacketMatcherModal,
  CourtBookingModal,
} from "@/components/landing-interactions";
import { HeroFigurePortal } from "@/components/hero-figure-portal";

const playStyles = [
  {
    code: "01",
    name: "Control",
    spec: "290mm / 4U-G5",
    tag: "Điều cầu & Cài lưới",
    title: "Giữ cầu trong tầm tay.",
    titleLines: null,
    copy: "Nhịp đánh chắc, mặt vợt ổn định và từng cú chạm có chủ đích.",
    className: "style-control",
  },
  {
    code: "02",
    name: "Speed",
    spec: "Head Light / 5U-G6",
    tag: "Tốc độ phản tạt",
    title: "Đi trước nửa nhịp.",
    titleLines: null,
    copy: "Tăng tốc ở lưới, đổi hướng gọn và sẵn sàng cho đường cầu kế tiếp.",
    className: "style-speed",
  },
  {
    code: "03",
    name: "Power",
    spec: "Head Heavy / 3U-G5",
    tag: "Tấn công dứt điểm",
    title: "Đánh xuống dứt khoát.",
    titleLines: null,
    copy: "Tải lực mượt, thân vợt phản hồi rõ và điểm chạm đầy tự tin.",
    className: "style-power",
  },
  {
    code: "04",
    name: "All round",
    spec: "Even Balance / 4U-G5",
    tag: "Công thủ toàn diện",
    title: "Một cây vợt, mọi thế trận.",
    titleLines: ["Một cây vợt,", "mọi thế trận."],
    copy: "Cân bằng giữa tấn công, phòng thủ và những pha cầu dài cần sự bền bỉ.",
    className: "style-allround",
  },
];

const kineticWords = ["SERVE", "CLEAR", "DRIVE", "SMASH", "RESET"];

const heroCharacters = [
  { id: "01", name: "Athlete Stance", src: "/images/hero-character-1.jpg", label: "01 / Dáng đứng toàn thân" },
  { id: "02", name: "Courtside Casual", src: "/images/hero-character-2.jpg", label: "02 / Bán thân năng động" },
  { id: "03", name: "Editorial Lookbook", src: "/images/hero-character-3.jpg", label: "03 / Tựa khung thanh lịch" },
  { id: "04", name: "Frontal Portal", src: "/images/hero-character-4.jpg", label: "04 / Giữ khung chính diện" },
];

export default function Home() {
  const [matcherOpen, setMatcherOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSessionKey, setSelectedSessionKey] = useState("tue");
  const [activeHeroChar, setActiveHeroChar] = useState(2);

  const openBookingFor = (sessionKey: string) => {
    setSelectedSessionKey(sessionKey);
    setBookingOpen(true);
  };

  return (
    <>
      <HermesLoadingGate />
      <RevealController />
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-filler" aria-hidden="true" />
      <div className="backdrop-vignette" aria-hidden="true" />
      <div className="backdrop-noise" aria-hidden="true" />

      {/* Interactive Modals */}
      <RacketMatcherModal
        isOpen={matcherOpen}
        onClose={() => setMatcherOpen(false)}
        onOpenBooking={() => openBookingFor("tue")}
      />
      <CourtBookingModal
        isOpen={bookingOpen}
        sessionKey={selectedSessionKey}
        onClose={() => setBookingOpen(false)}
      />

      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Hermes Badminton, về đầu trang">
            <img className="brand-logo" src="/images/logo.svg" alt="" />
            <span>
              HERMES <b>/ BADMINTON</b>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Điều hướng chính">
            <a href="#play">Lối chơi</a>
            <a href="#gear">Trang bị</a>
            <a href="#sessions">Lịch sân</a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a
              className="header-cta"
              href="#join"
              onClick={(e) => {
                e.preventDefault();
                openBookingFor("tue");
              }}
            >
              Ghi danh
            </a>
          </div>

          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Điều hướng di động">
              <ThemeToggle />
              <a href="#play">Lối chơi</a>
              <a href="#gear">Trang bị</a>
              <a href="#sessions">Lịch sân</a>
              <a
                href="#join"
                onClick={(e) => {
                  e.preventDefault();
                  openBookingFor("tue");
                }}
              >
                Ghi danh
              </a>
            </nav>
          </details>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-system-meta" aria-label="Sân 01, trạng thái sẵn sàng">
                <p><span>Court</span><strong>01</strong></p>
                <p>
                  <span>Status</span>
                  <strong>
                    <i className="pulse-dot" aria-hidden="true" /> Ready
                  </strong>
                </p>
              </div>

              <svg
                className="hero-trajectory"
                viewBox="0 0 440 420"
                role="img"
                aria-label="Đường bay kỹ thuật của quả cầu từ điểm phát đến điểm rơi"
              >
                <g className="trajectory-grid">
                  <path d="M42 354H408M76 388V42" />
                  <path className="trajectory-grid-detail" d="M76 294H278M76 232H328M138 354V342M202 354V342M266 354V342M330 354V342" />
                  <path className="trajectory-grid-detail" d="M64 294H76M64 232H76M64 170H76M64 108H76" />
                  <path className="trajectory-court-fragment" d="M76 354V210H252V354M164 210V354" />
                </g>

                <g className="trajectory-secondary">
                  <path d="M76 318C146 258 216 258 286 318" />
                  <path d="M76 286C154 238 246 232 342 276" />
                </g>

                <path className="trajectory-glow-path" pathLength="1" d="M104 330C178 312 220 214 268 150C304 102 342 70 388 58" />
                <path className="trajectory-flight" pathLength="1" d="M104 330C178 312 220 214 268 150C304 102 342 70 388 58" />

                <g className="trajectory-start" transform="translate(104 330)">
                  <circle className="radar-ping-ring" r="14" />
                  <circle r="8" />
                  <circle r="2.5" />
                  <path d="M-17 0H-8M8 0H17M0-17V-8M0 8V17" />
                </g>

                <g className="trajectory-checkpoint" transform="translate(268 150)">
                  <circle className="radar-ping-ring" r="12" />
                  <circle r="7" />
                  <circle r="2" />
                </g>

                <g className="trajectory-target-node" transform="translate(388 58)">
                  <circle className="radar-ping-ring radar-ping-target" r="20" />
                  <circle className="radar-ping-ring radar-ping-secondary" r="11" />
                  <circle r="4" fill="var(--amber)" stroke="var(--cream)" strokeWidth="1" />
                  <path d="M-14 0H-6M6 0H14M0-14V-6M0 6V14" stroke="var(--amber)" strokeWidth="1.2" />
                  <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="var(--cream)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                </g>

                <g className="trajectory-labels" aria-hidden="true">
                  <text x="88" y="318">01 / SERVE</text>
                  <text x="278" y="142">02 / APEX</text>
                  <text x="358" y="92">03 / POINT</text>
                  <text className="trajectory-grid-detail" x="124" y="376">300</text>
                  <text className="trajectory-grid-detail" x="252" y="376">600</text>
                  <text className="trajectory-grid-detail" x="380" y="376">900</text>
                </g>
              </svg>

              <p className="eyebrow">Cầu lông, theo cách của bạn</p>
              <h1 id="hero-title">
                <span className="hero-title-line">PLAY THE</span>
                <span className="hero-title-line hero-title-line-warm">NEXT</span>
                <span className="hero-title-line hero-title-line-warm">POINT.</span>
              </h1>
              <p className="hero-summary">
                Cộng đồng cầu lông cho người chơi muốn tập đúng, đánh hay và tìm đồng đội cùng nhịp.
              </p>
              <div className="hero-actions">
                <button
                  className="primary-button hero-ticket"
                  type="button"
                  onClick={() => openBookingFor("tue")}
                >
                  <span>Vào đội hình</span>
                  <small aria-hidden="true">01</small>
                  <i aria-hidden="true">→</i>
                </button>
                <button
                  className="text-link hero-matcher-trigger"
                  type="button"
                  onClick={() => setMatcherOpen(true)}
                >
                  Tìm lối chơi & Vợt
                </button>
              </div>

              <div className="hero-system-rail" aria-label="Hermes Club System, Hanoi 2026">
                <span><b>01</b> / Club system</span>
                <span>Hanoi / 2026</span>
                <a href="#play">Scroll <i aria-hidden="true">↓</i></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Hermes, hình tượng đại diện của câu lạc bộ">
              <span className="hero-monogram" aria-hidden="true">HB</span>
              <div className="portal-atmosphere-overlay" aria-hidden="true" />
              <div className="portal-hud-bracket portal-hud-tl" aria-hidden="true">
                <span>PORTAL_01 // {heroCharacters[activeHeroChar].name.toUpperCase()}</span>
              </div>
              <div className="portal-hud-bracket portal-hud-tr" aria-hidden="true">
                <span>COORD 104.8°N</span>
              </div>
              <HeroFigurePortal
                characters={heroCharacters}
                activeIndex={activeHeroChar}
                onSelectCharacter={(idx) => setActiveHeroChar(idx)}
                autoPlayInterval={4500}
              />
              <div className="visual-caption">
                <div className="char-switcher-rail">
                  <span>FIGURE:</span>
                  <div className="char-switcher-btns">
                    {heroCharacters.map((char, index) => (
                      <button
                        key={char.id}
                        type="button"
                        className={`char-switcher-btn ${index === activeHeroChar ? "is-active" : ""}`}
                        onClick={() => setActiveHeroChar(index)}
                        aria-label={`Chọn nhân vật ${char.label}`}
                        title={char.label}
                      >
                        {char.id}
                      </button>
                    ))}
                  </div>
                </div>
                <strong>Hanoi / 2026</strong>
              </div>
            </div>
          </section>

          <div className="kinetic-strip" aria-hidden="true">
            <div className="kinetic-track">
              {[0, 1].map((group) => (
                <div className="kinetic-group" key={group}>
                  {kineticWords.map((word) => (
                    <span className="kinetic-item" key={`${group}-${word}`}>
                      <b>{word}</b><i>/</i>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <section className="section play-section" id="play" data-reveal>
            <div className="section-heading play-section-heading">
              <div className="play-heading-left">
                <p className="play-system-meta"><span>01</span> Play systems</p>
                <div className="play-intro-copy">
                  <h2>
                    <span>Chọn nhịp chơi</span>
                    <span>của bạn.</span>
                  </h2>
                  <p>Mỗi người có một cách thắng điểm. Hermes giúp bạn gọi đúng tên và luyện đúng hướng.</p>
                </div>
              </div>

              <div className="play-telemetry-hud" aria-label="Bảng thông số phân tích nhịp đấu">
                <div className="telemetry-header">
                  <div className="telemetry-title-block">
                    <span className="telemetry-tag">TACTICAL TELEMETRY</span>
                    <span className="telemetry-status">
                      <i className="pulse-dot" aria-hidden="true" /> LIVE HUD
                    </span>
                  </div>
                  <span className="telemetry-coords">SYS // HN-2026</span>
                </div>

                <div className="telemetry-metric-box">
                  <div className="metric-row">
                    <span className="metric-label">Rally Pace</span>
                    <strong className="metric-val">Fast / Aggressive</strong>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Tempo Index</span>
                    <strong className="metric-val">175 - 210 BPM</strong>
                  </div>
                </div>

                <div className="telemetry-bars">
                  <span className="telemetry-bars-title">Tactical Allocation (4 Styles)</span>

                  <div className="telemetry-bar-item">
                    <div className="bar-labels">
                      <span>01 / Control</span>
                      <strong>25%</strong>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill bar-fill-control" style={{ width: "25%" }} />
                    </div>
                  </div>

                  <div className="telemetry-bar-item">
                    <div className="bar-labels">
                      <span>02 / Speed</span>
                      <strong>25%</strong>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill bar-fill-speed" style={{ width: "25%" }} />
                    </div>
                  </div>

                  <div className="telemetry-bar-item">
                    <div className="bar-labels">
                      <span>03 / Power</span>
                      <strong>25%</strong>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill bar-fill-power" style={{ width: "25%" }} />
                    </div>
                  </div>

                  <div className="telemetry-bar-item">
                    <div className="bar-labels">
                      <span>04 / All-round</span>
                      <strong>25%</strong>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill bar-fill-allround" style={{ width: "25%" }} />
                    </div>
                  </div>
                </div>

                <div className="telemetry-footer">
                  <span>Hermes Tactical Engine</span>
                  <span className="telemetry-ver">v2.6 // Active Lineup</span>
                </div>
              </div>
            </div>
            <div className="style-grid">
              {playStyles.map((style) => (
                <article
                  className={`style-card ${style.className}`}
                  key={style.name}
                  onClick={() => setMatcherOpen(true)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMatcherOpen(true);
                    }
                  }}
                  aria-label={`Xem chi tiết lối chơi ${style.name}`}
                >
                  <div className="style-card-header">
                    <span className="style-name">{style.name}</span>
                    <span className="style-spec-tag">{style.spec}</span>
                  </div>
                  <div className="style-card-body">
                    <h3>
                      {style.titleLines
                        ? style.titleLines.map((line) => <span key={line}>{line}</span>)
                        : style.title}
                    </h3>
                    <p>{style.copy}</p>
                  </div>
                  <div className="style-card-footer">
                    <span className="style-tactical-focus">{style.tag}</span>
                    <span className="style-card-indicator" aria-hidden="true">
                      <i>✦</i>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section gear-section" id="gear" data-reveal>
            <div className="gear-visual">
              <Image
                src="/images/hermes-bg.webp"
                alt="Tranh in xanh mang tinh thần chuyển động của Hermes"
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
              <div className="gear-scanline" aria-hidden="true" />
            </div>
            <div className="gear-copy">
              <h2>Đúng dụng cụ. Đúng cảm giác.</h2>
              <p>
                Chúng tôi chọn vợt theo cách bạn di chuyển, tạo lực và xử lý cầu. Không chọn theo màu sơn hay lời quảng cáo.
              </p>
              <div className="gear-notes" aria-label="Ba tiêu chí chọn vợt">
                <div><span>Đầu vợt</span><strong>Linh hoạt</strong></div>
                <div><span>Thân vợt</span><strong>Phản hồi rõ</strong></div>
                <div><span>Cảm giác</span><strong>Hợp tay</strong></div>
              </div>
              <button
                className="text-link gear-consult-btn"
                type="button"
                onClick={() => setMatcherOpen(true)}
              >
                Nhận tư vấn chọn vợt
              </button>
            </div>
          </section>

          <section className="section sessions-section" id="sessions" data-reveal>
            <div className="sessions-intro">
              <p className="eyebrow">Open court</p>
              <h2>Ra sân đều. Lên tay thật.</h2>
              <p>Buổi chơi có người điều phối, ghép trình độ phù hợp và luôn dành thời gian cho kỹ thuật.</p>
            </div>
            <div className="session-board">
              <article
                className="session-featured session-clickable"
                onClick={() => openBookingFor("tue")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBookingFor("tue");
                  }
                }}
                aria-label="Đăng ký buổi Thứ ba After work"
              >
                <div className="session-header-row">
                  <div className="session-day"><span>Thứ ba</span><strong>After work</strong></div>
                  <div className="session-status-badge">
                    <span className="pulse-dot" aria-hidden="true" />
                    <span>Còn 2 chỗ</span>
                  </div>
                </div>
                <p>Đánh đôi luân phiên, nhịp vừa và ưu tiên người mới tham gia.</p>
                <div className="session-footer-row">
                  <span className="session-level">Mới chơi / Phong trào</span>
                  <span className="session-time">19:30 - 21:30 // Bấm để đặt slot →</span>
                </div>
              </article>
              <div className="session-stack">
                <article
                  className="session-clickable"
                  onClick={() => openBookingFor("thu")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openBookingFor("thu");
                    }
                  }}
                  aria-label="Xem đội hình buổi Thứ năm Fast court"
                >
                  <div className="session-header-row">
                    <div className="session-day"><span>Thứ năm</span><strong>Fast court</strong></div>
                    <div className="session-status-badge session-badge-calm">
                      <span className="status-dot-calm" aria-hidden="true" />
                      <span>Đủ đội hình</span>
                    </div>
                  </div>
                  <p>Nhịp nhanh, bài cầu ngắn và các trận đấu có mục tiêu.</p>
                  <div className="session-footer-row">
                    <span className="session-level">Trung bình / Khá</span>
                    <span className="session-time">20:00 - 22:00 // Xem danh sách →</span>
                  </div>
                </article>
                <article
                  className="session-clickable"
                  onClick={() => openBookingFor("weekend")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openBookingFor("weekend");
                    }
                  }}
                  aria-label="Đăng ký buổi Cuối tuần Club mix"
                >
                  <div className="session-header-row">
                    <div className="session-day"><span>Cuối tuần</span><strong>Club mix</strong></div>
                    <div className="session-status-badge session-badge-all">
                      <span className="pulse-dot-dark" aria-hidden="true" />
                      <span>Mở đăng ký</span>
                    </div>
                  </div>
                  <p>Gặp gỡ cả đội, đánh tự do và thử trang bị mới.</p>
                  <div className="session-footer-row">
                    <span className="session-level">Mọi trình độ</span>
                    <span className="session-time">Sáng CN / 08:30 // Đặt slot →</span>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="section club-section" data-reveal>
            <div className="club-portrait">
              <Image src="/images/identity.jpg" alt="Chân dung minh họa thành viên Hermes Badminton" fill sizes="(max-width: 760px) 100vw, 34vw" />
            </div>
            <div className="club-quote">
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>Điểm số kết thúc một pha cầu. Đồng đội khiến bạn muốn bắt đầu pha tiếp theo.</blockquote>
              <p>HERMES BADMINTON CLUB</p>
            </div>
          </section>

          <section className="section join-section" id="join" data-reveal>
            <div className="join-copy">
              <h2>Điểm tiếp theo bắt đầu ở đây.</h2>
              <p>Để lại email. Chúng tôi sẽ gửi lịch sân và gợi ý nhóm chơi phù hợp.</p>
            </div>
            <JoinForm />
          </section>
        </main>

        <footer className="footer">
          <a className="brand footer-brand" href="#top">
            <img className="brand-logo" src="/images/logo.svg" alt="" />
            <span>HERMES / BADMINTON</span>
          </a>
          <div className="footer-links">
            <a href="#play">Lối chơi</a>
            <a href="#gear">Trang bị</a>
            <a href="#sessions">Lịch sân</a>
          </div>
          <p>Prototype landing page. Hanoi, Vietnam.</p>
        </footer>
      </div>
    </>
  );
}
