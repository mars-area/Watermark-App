import "./globals.css";
import { Providers } from "./redux/provider";

export const metadata = {
  title: "Watermark App",
  description: "To add watermark online documents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
