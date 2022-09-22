import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import {Session} from "next-auth"


function MyApp({ Component, pageProps }: AppProps<{session: Session}>) {
  return (
    <>
      <Head>
        <title>HBO Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
