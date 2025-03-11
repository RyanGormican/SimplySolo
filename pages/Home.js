"use client"; 

import { useEffect, useState } from 'react';
import Navigate from '../components/Navigate';
import PlayGrid from '../components/PlayGrid';
import '../styles/globals.css';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
 
  if (!isClient) return null; 

  return (
    <div>
      <Navigate />
      <h1 className="title">SimplySolo</h1>
      <PlayGrid />
    </div>
  );
}
