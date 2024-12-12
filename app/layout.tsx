// ./app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "잡메이트",
    description: "알바생과 점주를 위한 급여 정보 시스템",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            {/* todo: remove vsc-initialized */}
            <body className={`${inter.className} vsc-initialized`}>
                {children}
            </body>
        </html>
    );
}
