"use client"; 

import { useEffect, useState } from 'react';
import PlayGrid from '../components/PlayGrid';
import '../styles/globals.css';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="container">
      <div className="menu">

        <h3></h3>
      </div>
      <div className="play-grid">
        <PlayGrid />
      </div>
    </div>
  );
}
