import Image from "next/image";
import { HermesLoadingGate, JoinForm, RevealController, ThemeToggle } from "@/components/landing-interactions";

const playStyles = [
  {
    name: "Control",
    title: "Giữ cầu trong tầm tay.",
    titleLines: null,
    copy: "Nhịp đánh chắc, mặt vợt ổn định và từng cú chạm có chủ đích.",
    className: "style-control",
  },
  {
    name: "Speed",
    title: "Đi trước nửa nhịp.",
    titleLines: null,
    copy: "Tăng tốc ở lưới, đổi hướng gọn và sẵn sàng cho đường cầu kế tiếp.",
    className: "style-speed",
  },
  {
    name: "Power",
    title: "Đánh xuống dứt khoát.",
    titleLines: null,
    copy: "Tải lực mượt, thân vợt phản hồi rõ và điểm chạm đầy tự tin.",
    className: "style-power",
  },
  {
    name: "All round",
    title: "Một cây vợt, mọi thế trận.",
    titleLines: ["Một cây vợt,", "mọi thế trận."],
    copy: "Cân bằng giữa tấn công, phòng thủ và những pha cầu dài cần sự bền bỉ.",
    className: "style-allround",
  },
];

const kineticWords = ["SERVE", "CLEAR", "DRIVE", "SMASH", "RESET"];

export default function Home() {
  return (
    <>
      <HermesLoadingGate />
      <RevealController />
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="backdrop-filler" aria-hidden="true" />
      <div className="backdrop-vignette" aria-hidden="true" />
      <div className="backdrop-noise" aria-hidden="true" />

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
            <a className="header-cta" href="#join">Ghi danh</a>
          </div>

          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Điều hướng di động">
              <ThemeToggle />
              <a href="#play">Lối chơi</a>
              <a href="#gear">Trang bị</a>
              <a href="#sessions">Lịch sân</a>
              <a href="#join">Ghi danh</a>
            </nav>
          </details>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-system-meta" aria-label="Sân 01, trạng thái sẵn sàng">
                <p><span>Court</span><strong>01</strong></p>
                <p><span>Status</span><strong>Ready</strong></p>
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

                <path className="trajectory-flight" pathLength="1" d="M104 330C178 312 220 214 268 150C304 102 342 70 388 58" />

                <g className="trajectory-start" transform="translate(104 330)">
                  <circle r="8" />
                  <circle r="2.5" />
                  <path d="M-17 0H-8M8 0H17M0-17V-8M0 8V17" />
                </g>

                <g className="trajectory-checkpoint" transform="translate(268 150)">
                  <circle r="7" />
                  <circle r="2" />
                </g>

                <g className="trajectory-shuttle" transform="translate(388 58) rotate(42)">
                  <path d="M0 0L-22 8M0 0L-19 15M0 0L-14 21M-22 8L-14 21M-19 15L-8 25M-14 21L-3 28" />
                  <ellipse cx="2" cy="-1" rx="7" ry="5" />
                </g>

                <g className="trajectory-labels" aria-hidden="true">
                  <text x="88" y="318">01 / SERVE</text>
                  <text x="278" y="142">02</text>
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
                <a className="primary-button hero-ticket" href="#join">
                  <span>Vào đội hình</span>
                  <small aria-hidden="true">01</small>
                  <i aria-hidden="true">→</i>
                </a>
                <a className="text-link" href="#play">Chọn lối chơi</a>
              </div>

              <div className="hero-system-rail" aria-label="Hermes Club System, Hanoi 2026">
                <span><b>01</b> / Club system</span>
                <span>Hanoi / 2026</span>
                <a href="#play">Scroll <i aria-hidden="true">↓</i></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Hermes, hình tượng đại diện của câu lạc bộ">
              <span className="hero-monogram" aria-hidden="true">HB</span>
              <Image
                className="portal-figure"
                src="/images/portal-figure-hero-toned.png"
                alt="Chân dung minh họa đại diện cho cộng đồng Hermes Badminton"
                fill
                unoptimized
                priority
                sizes="(max-width: 760px) 100vw, 44vw"
              />
              <div className="visual-caption">
                <span>Club system</span>
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
            <div className="section-heading">
              <p className="play-system-meta"><span>01</span> Play systems</p>
              <div className="play-intro-copy">
                <h2>
                  <span>Chọn nhịp chơi</span>
                  <span>của bạn.</span>
                </h2>
                <p>Mỗi người có một cách thắng điểm. Hermes giúp bạn gọi đúng tên và luyện đúng hướng.</p>
              </div>
            </div>
            <div className="style-grid">
              {playStyles.map((style) => (
                <article className={`style-card ${style.className}`} key={style.name}>
                  <span className="style-name">{style.name}</span>
                  <div>
                    <h3>
                      {style.titleLines
                        ? style.titleLines.map((line) => <span key={line}>{line}</span>)
                        : style.title}
                    </h3>
                    <p>{style.copy}</p>
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
              <a className="text-link" href="#join">Nhận tư vấn chọn vợt</a>
            </div>
          </section>

          <section className="section sessions-section" id="sessions" data-reveal>
            <div className="sessions-intro">
              <p className="eyebrow">Open court</p>
              <h2>Ra sân đều. Lên tay thật.</h2>
              <p>Buổi chơi có người điều phối, ghép trình độ phù hợp và luôn dành thời gian cho kỹ thuật.</p>
            </div>
            <div className="session-board">
              <article className="session-featured">
                <div className="session-day"><span>Thứ ba</span><strong>After work</strong></div>
                <p>Đánh đôi luân phiên, nhịp vừa và ưu tiên người mới tham gia.</p>
                <span className="session-level">Mới chơi / Phong trào</span>
              </article>
              <div className="session-stack">
                <article>
                  <div className="session-day"><span>Thứ năm</span><strong>Fast court</strong></div>
                  <p>Nhịp nhanh, bài cầu ngắn và các trận đấu có mục tiêu.</p>
                  <span className="session-level">Trung bình / Khá</span>
                </article>
                <article>
                  <div className="session-day"><span>Cuối tuần</span><strong>Club mix</strong></div>
                  <p>Gặp gỡ cả đội, đánh tự do và thử trang bị mới.</p>
                  <span className="session-level">Mọi trình độ</span>
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
