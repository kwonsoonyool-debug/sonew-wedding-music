import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "쏘뉴웨딩 - 사회자+축가 번들",
  description: "결혼식 사회자와 축가를 한 번에! 쏘뉴웨딩 번들 패키지로 5만원 할인 혜택을 받아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${playfairDisplay.variable} antialiased font-sans bg-stone-50 text-stone-800`}
      >
        {children}
      </body>
    </html>
  );
}
