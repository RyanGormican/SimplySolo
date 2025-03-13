"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigate from '../components/Navigate';
export default function App({ Component, pageProps }) {
  const router = useRouter();

 

  const handleTitleClick = () => {
    router.push('/Home');
  };

  return (
    <>
      <Head>
        <title>SimplySolo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </Head>
      
      <h1 className="title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
        SimplySolo
      </h1>
            <Navigate />
      <Component {...pageProps} />
    </>
  );
}
