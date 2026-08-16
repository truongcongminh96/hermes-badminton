import Image from "next/image";
import { HermesLoadingGate, JoinForm, RevealController, ThemeToggle } from "@/components/landing-interactions";

const playStyles = [
  {
    name: "Control",
    title: "Giữ cầu trong tầm tay.",
    copy: "Nhịp đánh chắc, mặt vợt ổn định và từng cú chạm có chủ đích.",
    className: "style-control",
  },
  {
    name: "Speed",
    title: "Đi trước nửa nhịp.",
    copy: "Tăng tốc ở lưới, đổi hướng gọn và sẵn sàng cho đường cầu kế tiếp.",
    className: "style-speed",
  },
  {
    name: "Power",
    title: "Đánh xuống dứt khoát.",
    copy: "Tải lực mượt, thân vợt phản hồi rõ và điểm chạm đầy tự tin.",
    className: "style-power",
  },
  {
    name: "All round",
    title: "Một cây vợt, mọi thế trận.",
    copy: "Cân bằng giữa tấn công, phòng thủ và những pha cầu dài cần sự bền bỉ.",
    className: "style-allround",
  },
];

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
              <p className="eyebrow">Cầu lông, theo cách của bạn</p>
              <h1 id="hero-title">
                PLAY THE <span>NEXT POINT.</span>
              </h1>
              <p className="hero-summary">
                Cộng đồng cầu lông cho người chơi muốn tập đúng, đánh hay và tìm đồng đội cùng nhịp.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#join">Vào đội hình</a>
                <a className="text-link" href="#play">Chọn lối chơi</a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Hermes, hình tượng đại diện của câu lạc bộ">
              <span className="hero-monogram" aria-hidden="true">HB</span>
              <Image
                className="portal-figure"
                src="/images/portal-figure.webp"
                alt="Hình tượng Hermes đón đường cầu"
                fill
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
            <div>
              <span>SERVE</span><i>/</i><span>CLEAR</span><i>/</i><span>DRIVE</span><i>/</i><span>SMASH</span><i>/</i><span>RESET</span><i>/</i>
              <span>SERVE</span><i>/</i><span>CLEAR</span><i>/</i><span>DRIVE</span><i>/</i><span>SMASH</span><i>/</i><span>RESET</span><i>/</i>
            </div>
          </div>

          <section className="section play-section" id="play" data-reveal>
            <div className="section-heading">
              <h2>Chọn nhịp chơi của bạn.</h2>
              <p>Mỗi người có một cách thắng điểm. Hermes giúp bạn gọi đúng tên và luyện đúng hướng.</p>
            </div>
            <div className="style-grid">
              {playStyles.map((style) => (
                <article className={`style-card ${style.className}`} key={style.name}>
                  <span className="style-name">{style.name}</span>
                  <div>
                    <h3>{style.title}</h3>
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
