import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermes Badminton | Play the next point",
  description:
    "Cộng đồng cầu lông cho người chơi muốn tập đúng, đánh hay và tìm đồng đội cùng nhịp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-loading-gate="active" suppressHydrationWarning>
      <body>
        {children}
        <noscript>
          <style>{`html[data-loading-gate="active"] .hero-copy > *, html[data-loading-gate="active"] .portal-figure { opacity: 1 !important; animation: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
