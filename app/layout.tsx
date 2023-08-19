import { SpotifyProvider } from "./SpotifyContext";
import { YoutubeProvider } from "./YoutubeContext";
import "./globals.css";
import { Roboto_Mono } from "next/font/google";

const Roboto = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={Roboto.className}>
        <main className="flex min-h-screen flex-col bg-black">
          <SpotifyProvider>
            <YoutubeProvider>{children}</YoutubeProvider>
          </SpotifyProvider>
        </main>
      </body>
    </html>
  );
}
