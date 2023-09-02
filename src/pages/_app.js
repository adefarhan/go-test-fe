import "@/styles/globals.css";
import Head from "next/head";
import { Montserrat } from "next/font/google";

const monsterrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mont",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${monsterrat.variable} w-full min-h-screen bg-yellow-200`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
