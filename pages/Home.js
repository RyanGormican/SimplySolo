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
    <div>
      <PlayGrid />
    </div>
  );
}
