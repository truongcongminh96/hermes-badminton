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
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("HERMES-HN-042");
  const [copied, setCopied] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    const num = Math.floor(10 + Math.random() * 90);
    setMemberId(`HERMES-HN-0${num}`);
    window.setTimeout(() => setStatus("success"), 650);
  };

  const copyId = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(memberId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setEmail("");
    setStatus("idle");
    setCopied(false);
  };

  return (
    <div className="join-form-wrapper">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

      {status === "success" && (
        <div className="digital-club-pass-card" aria-label="Thẻ thành viên điện tử Hermes Badminton">
          <div className="club-pass-slot" aria-hidden="true" />
          <div className="club-pass-header">
            <div className="club-pass-brand">
              <img src="/images/logo.svg" alt="" />
              <span>HERMES / SYSTEM PASS</span>
            </div>
            <span className="club-pass-badge">VERIFIED // SQUAD 01</span>
          </div>

          <div className="club-pass-body">
            <div className="club-pass-id-block">
              <span className="club-pass-label">MEMBER IDENTIFICATION</span>
              <div className="club-pass-id-row">
                <strong className="club-pass-code">{memberId}</strong>
                <button
                  type="button"
                  className="club-pass-copy-btn"
                  onClick={copyId}
                  aria-label="Sao chép mã thẻ thành viên"
                >
                  {copied ? "Đã sao chép ✓" : "Sao chép ID"}
                </button>
              </div>
            </div>

            <div className="club-pass-grid">
              <div>
                <span>Thành viên</span>
                <strong>{email || "player@hermes.club"}</strong>
              </div>
              <div>
                <span>Cơ sở / Sân</span>
                <strong>Hanoi // Court 01-04</strong>
              </div>
              <div>
                <span>Hạng thành viên</span>
                <strong>Official Squad // Level 01</strong>
              </div>
              <div>
                <span>Thời hạn kích hoạt</span>
                <strong>Niên khóa 2026 // Active</strong>
              </div>
            </div>

            <div className="club-pass-barcode-row">
              <div className="club-pass-barcode-lines" aria-hidden="true" />
              <span className="club-pass-barcode-text">MIL-SPEC // {memberId} // AUTH-2026</span>
            </div>
          </div>

          <div className="club-pass-footer">
            <span className="club-pass-note">Xuất trình mã thẻ này khi đến sân tham gia buổi tập đầu tiên.</span>
            <button type="button" className="text-link club-pass-reset-btn" onClick={resetForm}>
              + Đăng ký email khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   PHASE 2: INTERACTIVE RACKET MATCHER MODAL
   ========================================================================= */

interface RacketProfile {
  name: string;
  code: string;
  tag: string;
  balance: string;
  flex: string;
  weight: string;
  tension: string;
  description: string;
  traits: string[];
}

const racketProfiles: Record<string, RacketProfile> = {
  speed: {
    name: "HERMES STRIVE 01 PROTO",
    code: "HB-RACKET-SPD-01",
    tag: "Tốc độ phản tạt & Chụp lưới",
    balance: "288 ± 2mm (Đầu nhẹ)",
    flex: "Thân cứng trung bình (Medium-Stiff)",
    weight: "5U-G6 (76 - 79g)",
    tension: "10.5 - 11.5 kg (23 - 25 lbs)",
    description: "Khung vợt khí động học vát gió kép. Giúp bạn đổi hướng và xoay trở vợt trước đối phương nửa nhịp.",
    traits: ["Lưới nhanh", "Phản tạt gọn", "Thoát cầu mượt"],
  },
  power: {
    name: "HERMES APEX 99 TITAN",
    code: "HB-RACKET-PWR-99",
    tag: "Tấn công uy lực & Smash cắm",
    balance: "305 ± 2mm (Nặng đầu)",
    flex: "Thân cứng (Stiff / Solid Core)",
    weight: "3U-G5 (86 - 89g)",
    tension: "11.5 - 12.5 kg (25 - 27.5 lbs)",
    description: "Được tối ưu cho người chơi có lực cổ tay tốt, phát lực toàn diện từ cầu sau để tung ra những cú đập cầu dứt điểm.",
    traits: ["Smash uy lực", "Đầm chắc", "Mặt vợt ổn định"],
  },
  control: {
    name: "HERMES VORTEX 07 CRAFT",
    code: "HB-RACKET-CTL-07",
    tag: "Kiểm soát nhịp độ & Gài cầu kỹ thuật",
    balance: "292 ± 2mm (Cân bằng nhẹ)",
    flex: "Thân dẻo vừa (Medium Flex)",
    weight: "4U-G5 (82 - 85g)",
    tension: "10.0 - 11.2 kg (22 - 24.5 lbs)",
    description: "Mặt vợt diện tích điểm ngọt (Sweet-spot) rộng, độ rung thân vợt triệt tiêu tối đa, cho từng cú chạm cầu chính xác từng centimet.",
    traits: ["Điều cầu chính xác", "Cài lưới tinh tế", "Triệt tiêu rung"],
  },
  allround: {
    name: "HERMES ECLIPSE PRO 00",
    code: "HB-RACKET-ALL-00",
    tag: "Công thủ toàn diện & Linh hoạt",
    balance: "295 ± 2mm (Even Balance)",
    flex: "Thân cứng trung bình (Medium)",
    weight: "4U-G5 (83 - 85g)",
    tension: "10.5 - 11.5 kg (23 - 25 lbs)",
    description: "Cây vợt toàn năng nhất của hệ thống Hermes. Dễ thuần, linh hoạt chuyển trạng thái từ phòng ngự sang tấn công chớp nhoáng.",
    traits: ["Dễ thuần", "Công thủ nhịp nhàng", "Bền bỉ thể lực"],
  },
};

export function RacketMatcherModal({
  isOpen,
  onClose,
  onOpenBooking,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string>("speed");
  const [wrist, setWrist] = useState<string>("moderate");
  const [priority, setPriority] = useState<string>("speed_priority");
  const [resultProfile, setResultProfile] = useState<RacketProfile | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCompute = () => {
    let matchedKey = "allround";
    if (role === "power" || priority === "power_priority") {
      matchedKey = "power";
    } else if (role === "speed" || priority === "speed_priority") {
      matchedKey = "speed";
    } else if (role === "control" || priority === "control_priority") {
      matchedKey = "control";
    } else {
      matchedKey = "allround";
    }
    setResultProfile(racketProfiles[matchedKey]);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setResultProfile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="tactical-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="matcher-modal-title">
      <div className="tactical-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="tactical-modal-window matcher-modal-window">
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-tag">01 / RACKET MATCHER</span>
            <span className="modal-coords">SPEC CONFIG // 2026</span>
          </div>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Đóng bảng tư vấn">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {step < 4 ? (
            <div className="matcher-flow">
              <div className="matcher-step-indicator">
                <span className={step === 1 ? "is-active" : ""}>01. Vai trò</span>
                <i>/</i>
                <span className={step === 2 ? "is-active" : ""}>02. Lực tay</span>
                <i>/</i>
                <span className={step === 3 ? "is-active" : ""}>03. Ưu tiên</span>
              </div>

              {step === 1 && (
                <div className="matcher-step-content">
                  <h3 id="matcher-modal-title">Vị trí và lối đánh ưa thích của bạn?</h3>
                  <p className="matcher-subtitle">Chọn vai trò bạn thường đảm nhận trong các trận cầu.</p>
                  <div className="matcher-options-grid">
                    <button
                      type="button"
                      className={`matcher-option-btn ${role === "speed" ? "is-selected" : ""}`}
                      onClick={() => setRole("speed")}
                    >
                      <strong>Đánh đôi // Đứng lưới & Phản tạt</strong>
                      <span>Tốc độ vung vợt nhanh, chớp thời cơ và chụp cầu ở tầm cao.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${role === "power" ? "is-selected" : ""}`}
                      onClick={() => setRole("power")}
                    >
                      <strong>Đánh đôi // Cầu sau & Tấn công</strong>
                      <span>Thích đập cầu uy lực, tạo áp lực liên tục từ phần sân sau.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${role === "control" ? "is-selected" : ""}`}
                      onClick={() => setRole("control")}
                    >
                      <strong>Đánh đơn // Điều cầu & Kỹ thuật</strong>
                      <span>Bền bỉ, kéo đối thủ vào những góc hiểm và làm chủ nhịp đấu.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${role === "allround" ? "is-selected" : ""}`}
                      onClick={() => setRole("allround")}
                    >
                      <strong>Toàn năng // Công thủ linh hoạt</strong>
                      <span>Vừa hỗ trợ thủ chắc chắn, vừa sẵn sàng dứt điểm khi có cơ hội.</span>
                    </button>
                  </div>
                  <div className="matcher-action-row">
                    <span className="matcher-progress-text">Bước 1 / 3</span>
                    <button className="primary-button" type="button" onClick={() => setStep(2)}>
                      Tiếp tục →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="matcher-step-content">
                  <h3>Lực cổ tay & Kinh nghiệm đánh cầu?</h3>
                  <p className="matcher-subtitle">Giúp hệ thống xác định độ cứng thân và trọng lượng vợt.</p>
                  <div className="matcher-options-grid">
                    <button
                      type="button"
                      className={`matcher-option-btn ${wrist === "moderate" ? "is-selected" : ""}`}
                      onClick={() => setWrist("moderate")}
                    >
                      <strong>Lực tay trung bình // Cần trợ lực</strong>
                      <span>Ưu tiên thân vợt dẻo vừa, đầu thoát lực để đánh sâu mà ít mỏi tay.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${wrist === "strong" ? "is-selected" : ""}`}
                      onClick={() => setWrist("strong")}
                    >
                      <strong>Lực tay khỏe // Thích vợt đầm</strong>
                      <span>Kiểm soát tốt vợt nặng đầu và thân cứng, phát lực dứt khoát.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${wrist === "flexible" ? "is-selected" : ""}`}
                      onClick={() => setWrist("flexible")}
                    >
                      <strong>Cổ tay dẻo // Đánh cầu kỹ thuật</strong>
                      <span>Thích các pha bỏ nhỏ, cắt cầu chém lưới và gài cầu tinh tế.</span>
                    </button>
                  </div>
                  <div className="matcher-action-row">
                    <button className="text-link" type="button" onClick={() => setStep(1)}>
                      ← Quay lại
                    </button>
                    <button className="primary-button" type="button" onClick={() => setStep(3)}>
                      Tiếp tục →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="matcher-step-content">
                  <h3>Tiêu chí quan trọng nhất khi cầm vợt?</h3>
                  <p className="matcher-subtitle">Quyết định cấu hình kỹ thuật cuối cùng cho bạn.</p>
                  <div className="matcher-options-grid">
                    <button
                      type="button"
                      className={`matcher-option-btn ${priority === "speed_priority" ? "is-selected" : ""}`}
                      onClick={() => setPriority("speed_priority")}
                    >
                      <strong>Tốc độ xoay chuyển & Thoát gió</strong>
                      <span>Mặt vợt lướt gió nhanh nhất có thể, chuẩn bị sớm cho quả sau.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${priority === "power_priority" ? "is-selected" : ""}`}
                      onClick={() => setPriority("power_priority")}
                    >
                      <strong>Gia tăng độ cắm & Uy lực smash</strong>
                      <span>Cầu đi nặng, đập phát ra tiếng nổ đanh và áp đảo đối phương.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${priority === "control_priority" ? "is-selected" : ""}`}
                      onClick={() => setPriority("control_priority")}
                    >
                      <strong>Độ ổn định & Cảm giác mặt vợt</strong>
                      <span>Cầu chạm mặt vợt phản hồi rõ ràng, hạn chế tối đa sai số.</span>
                    </button>
                    <button
                      type="button"
                      className={`matcher-option-btn ${priority === "balance_priority" ? "is-selected" : ""}`}
                      onClick={() => setPriority("balance_priority")}
                    >
                      <strong>Cân bằng & Dễ chơi bền bỉ</strong>
                      <span>Dễ thuần ngay từ trận đầu tiên, phù hợp nhiều thế trận.</span>
                    </button>
                  </div>
                  <div className="matcher-action-row">
                    <button className="text-link" type="button" onClick={() => setStep(2)}>
                      ← Quay lại
                    </button>
                    <button className="primary-button matcher-submit-btn" type="button" onClick={handleCompute}>
                      Phân tích cấu hình ✦
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            resultProfile && (
              <div className="matcher-result-sheet">
                <div className="result-header">
                  <span className="result-code">{resultProfile.code}</span>
                  <span className="result-badge">MATCHED 98.4%</span>
                </div>

                <div className="result-title-group">
                  <p className="result-tag-label">{resultProfile.tag}</p>
                  <h2>{resultProfile.name}</h2>
                  <p className="result-desc">{resultProfile.description}</p>
                </div>

                <div className="result-specs-table">
                  <div className="spec-row">
                    <span>Điểm cân bằng</span>
                    <strong>{resultProfile.balance}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Độ cứng thân vợt</span>
                    <strong>{resultProfile.flex}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Trọng lượng & Cán</span>
                    <strong>{resultProfile.weight}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Mức căng khuyến nghị</span>
                    <strong>{resultProfile.tension}</strong>
                  </div>
                </div>

                <div className="result-traits-row">
                  {resultProfile.traits.map((trait) => (
                    <span key={trait} className="result-trait-pill">
                      ✓ {trait}
                    </span>
                  ))}
                </div>

                <div className="result-footer-actions">
                  <button className="text-link" type="button" onClick={handleReset}>
                    ↺ Thử lại cấu hình khác
                  </button>
                  {onOpenBooking && (
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                    >
                      Thử vợt trực tiếp trên sân →
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PHASE 2: INTERACTIVE COURT BOOKING / LINEUP MODAL
   ========================================================================= */

export interface SessionData {
  id: string;
  day: string;
  title: string;
  time: string;
  court: string;
  level: string;
  availableSlots: number;
  totalSlots: number;
  roster: string[];
}

export const defaultSessions: Record<string, SessionData> = {
  tue: {
    id: "01",
    day: "Thứ ba",
    title: "After work",
    time: "19:30 - 21:30",
    court: "Sân 01 & Sân 02",
    level: "Mới chơi / Phong trào",
    availableSlots: 2,
    totalSlots: 8,
    roster: [
      "Minh T. (Control)",
      "Hải N. (Speed)",
      "Đức A. (Power)",
      "Trang V. (All-round)",
      "Bảo L. (Speed)",
      "Huy P. (Control)",
    ],
  },
  thu: {
    id: "02",
    day: "Thứ năm",
    title: "Fast court",
    time: "20:00 - 22:00",
    court: "Sân 03 (Yonex Mat)",
    level: "Trung bình / Khá",
    availableSlots: 0,
    totalSlots: 8,
    roster: [
      "Tuấn K. (Power)",
      "Quân M. (Speed)",
      "Thành B. (Power)",
      "Nam H. (Speed)",
      "Dũng L. (Control)",
      "Khánh N. (All-round)",
      "Việt T. (Power)",
      "Sơn Đ. (Speed)",
    ],
  },
  weekend: {
    id: "03",
    day: "Cuối tuần",
    title: "Club mix",
    time: "Sáng CN / 08:30 - 11:30",
    court: "Toàn bộ cụm sân 01 - 04",
    level: "Mọi trình độ",
    availableSlots: 5,
    totalSlots: 16,
    roster: [
      "Hermes Captain",
      "Lan Anh (Control)",
      "Hùng C. (Power)",
      "Phi H. (Speed)",
      "Phương N. (All-round)",
      "Tùng L. (Power)",
      "Hoàng M. (Speed)",
      "Cường N. (All-round)",
      "Anh D. (Control)",
      "Linh P. (All-round)",
      "Bách T. (Speed)",
    ],
  },
};

export function CourtBookingModal({
  isOpen,
  sessionKey,
  onClose,
}: {
  isOpen: boolean;
  sessionKey: string;
  onClose: () => void;
}) {
  const session = defaultSessions[sessionKey] || defaultSessions.tue;
  const [playerName, setPlayerName] = useState("");
  const [playerContact, setPlayerContact] = useState("");
  const [playStyleChoice, setPlayStyleChoice] = useState("Control");
  const [status, setStatus] = useState<"idle" | "submitting" | "confirmed">("idle");
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      setTicketId(`HB-HN-${session.id}${Math.floor(100 + Math.random() * 900)}`);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, session.id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("confirmed");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="tactical-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div className="tactical-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="tactical-modal-window booking-modal-window">
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-tag">02 / COURT LINEUP PASS</span>
            <span className="modal-coords">HANOI SYSTEM // {session.day.toUpperCase()}</span>
          </div>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Đóng bảng đặt sân">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {status !== "confirmed" ? (
            <div className="booking-layout">
              <div className="booking-session-info">
                <span className="session-tag">{session.day} // {session.title}</span>
                <h2 id="booking-modal-title">{session.title}</h2>
                <div className="session-data-grid">
                  <div>
                    <span>Khung giờ</span>
                    <strong>{session.time}</strong>
                  </div>
                  <div>
                    <span>Sân thi đấu</span>
                    <strong>{session.court}</strong>
                  </div>
                  <div>
                    <span>Trình độ gợi ý</span>
                    <strong>{session.level}</strong>
                  </div>
                  <div>
                    <span>Trạng thái slot</span>
                    <strong className={session.availableSlots > 0 ? "highlight-amber" : "highlight-muted"}>
                      {session.availableSlots > 0
                        ? `Còn ${session.availableSlots}/${session.totalSlots} chỗ`
                        : "Đã kín danh sách"}
                    </strong>
                  </div>
                </div>

                <div className="roster-preview">
                  <p className="roster-heading">Đội hình hiện tại ({session.roster.length} người chơi):</p>
                  <div className="roster-chips">
                    {session.roster.map((player) => (
                      <span key={player} className="roster-chip">
                        {player}
                      </span>
                    ))}
                    {session.availableSlots > 0 && (
                      <span className="roster-chip chip-open">
                        + {session.availableSlots} Slot mở
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="booking-form-panel">
                <form onSubmit={handleSubmit}>
                  <div className="field-group">
                    <label htmlFor="booking-name">Họ và tên / Biệt danh trên sân</label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="vd: Minh Trương"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="booking-contact">Số điện thoại / Zalo / Email</label>
                    <input
                      id="booking-contact"
                      type="text"
                      placeholder="0912 xxx xxx hoặc player@gmail.com"
                      required
                      value={playerContact}
                      onChange={(e) => setPlayerContact(e.target.value)}
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="booking-style">Lối chơi bạn muốn thể hiện</label>
                    <select
                      id="booking-style"
                      value={playStyleChoice}
                      onChange={(e) => setPlayStyleChoice(e.target.value)}
                      disabled={status === "submitting"}
                    >
                      <option value="Control">Control (Điều cầu & Cài lưới)</option>
                      <option value="Speed">Speed (Phản tạt & Lưới nhanh)</option>
                      <option value="Power">Power (Tấn công & Đập cầu)</option>
                      <option value="All round">All-round (Công thủ toàn diện)</option>
                    </select>
                  </div>

                  <button
                    className="primary-button form-button booking-submit-btn"
                    type="submit"
                    disabled={status === "submitting" || session.availableSlots === 0}
                  >
                    {status === "submitting"
                      ? "Đang vào đội hình..."
                      : session.availableSlots === 0
                      ? "Buổi chơi đã kín slot"
                      : "Xác nhận vào đội hình →"}
                  </button>

                  <p className="booking-disclaimer">
                    * Điều phối viên của Hermes sẽ liên hệ xác nhận vị trí sân trước giờ thi đấu 2 tiếng.
                  </p>
                </form>
              </div>
            </div>
          ) : (
            <div className="digital-match-pass">
              <div className="pass-top-rail">
                <div className="pass-brand">
                  <img src="/images/logo.svg" alt="" />
                  <span>HERMES BADMINTON // COURT PASS</span>
                </div>
                <span className="pass-number">{ticketId}</span>
              </div>

              <div className="pass-main-card">
                <div className="pass-section-left">
                  <span className="pass-label">Thành viên</span>
                  <h3>{playerName || "Vận động viên"}</h3>
                  <p className="pass-style-badge">LỐI CHƠI // {playStyleChoice.toUpperCase()}</p>

                  <div className="pass-grid-meta">
                    <div>
                      <span>Buổi chơi</span>
                      <strong>{session.day} // {session.title}</strong>
                    </div>
                    <div>
                      <span>Khung giờ</span>
                      <strong>{session.time}</strong>
                    </div>
                    <div>
                      <span>Khu vực sân</span>
                      <strong>{session.court}</strong>
                    </div>
                    <div>
                      <span>Địa điểm</span>
                      <strong>Hermes Sports Hub — Hà Nội</strong>
                    </div>
                  </div>
                </div>

                <div className="pass-section-right">
                  <div className="pass-barcode-box">
                    <div className="pass-barcode-lines" aria-hidden="true" />
                    <span className="barcode-number">{ticketId}</span>
                  </div>
                  <span className="pass-verified-badge">LINEUP CONFIRMED</span>
                </div>
              </div>

              <div className="pass-actions">
                <button className="primary-button" type="button" onClick={onClose}>
                  Hoàn tất & Đóng vé
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
