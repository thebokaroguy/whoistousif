import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Engineering Future | Interactive AI Portfolio",
  description: "A cinematic journey through the career of a Robotics & AI Engineer. Explore key milestones, projects, and achievements in an immersive 3D experience.",
  keywords: ["Robotics", "AI", "Portfolio", "Engineer", "Three.js", "Interactive", "Developer"],
  openGraph: {
    title: "Engineering Future | Interactive AI Portfolio",
    description: "A cinematic journey through the career of a Robotics & AI Engineer.",
    type: "website",
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
