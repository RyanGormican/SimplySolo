"use client"; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    router.push('/Home');  
  }, [router]);

  if (!isClient) return null;

  return (
    <div>
      <h1 className="title">SimplySolo</h1>
    </div>
  );
}
