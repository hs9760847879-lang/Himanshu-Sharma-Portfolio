import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himanshu Sharma — Automation & Catalog Management Expert",
  description:
    "Personal portfolio of Himanshu Sharma, Catalog Management Executive specializing in automation, workflow optimization, and data systems at Amber.",
  keywords: [
    "Himanshu Sharma",
    "Catalog Management",
    "Automation",
    "Workflow Optimization",
    "Google Sheets Automation",
    "Data Systems",
    "Portfolio",
  ],
  authors: [{ name: "Himanshu Sharma" }],
  openGraph: {
    title: "Himanshu Sharma — Automation & Process Optimization",
    description:
      "Building scalable automation systems that reduce manual workload and improve operational efficiency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
