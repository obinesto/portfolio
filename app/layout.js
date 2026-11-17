import localFont from "next/font/local";
import "./globals.css";
import "./styles.css";
import { ThemeProvider } from "../providers/theme-provider";

const inter = localFont({
  src: "../assets/fonts/Inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});
const robotoMono = localFont({
  src: "../assets/fonts/RobotoMono-latin.woff2",
  weight: "100 700",
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  metadataBase: new URL("https://me.obinestotech.com"),
  title: "Cyprian Obi — Full Stack Engineer",
  description:
    "Full Stack Engineer in Nigeria, building digital products from early requirements through delivery and continued improvement. Explore selected work and get in touch.",
  openGraph: {
    title: "Cyprian Obi — Full Stack Engineer",
    description:
      "Digital products built with care, from the experience people see to the systems they depend on. Selected work by Cyprian Obi.",
    url: "https://me.obinestotech.com",
    siteName: "Cyprian Obi",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1744,
        height: 1527,
        alt: "Cyprian Obi",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
