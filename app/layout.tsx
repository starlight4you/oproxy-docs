import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const suppliedHost = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const host = /^[a-z0-9.-]+(?::\d+)?$/i.test(suppliedHost) ? suppliedHost : "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const description = "基于 Oproxy 实际网页与控制台操作整理的本地文档，包含快速入门、API、计费、客户端配置与规则说明。";

  return {
    metadataBase,
    title: {
      default: "Oproxy Docs · 本地文档",
      template: "%s · Oproxy Docs",
    },
    description,
    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
        { url: "/logo.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon-32x32.png",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: "Oproxy Docs",
      description,
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "Oproxy Docs" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Oproxy Docs",
      description,
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
