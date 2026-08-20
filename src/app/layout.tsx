import type { Metadata } from "next";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
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
