"use client";
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';
import { playData } from './PlayData';

export default function PlayGrid() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);  
  }, []);

  if (!isClient) return null;  

  const handleCardClick = (title) => {
    router.push(`/${title}`);
  };

  return (
  <Grid container spacing={4} justifyContent="center">
    {playData.map((card) => (
      <Grid item xs={12} sm={6} md={3} key={card.id}>
        <Card 
          onClick={() => handleCardClick(card.title)} 
          style={{ cursor: 'pointer', height: '30vh', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
       
            style={{ height: '70%', objectFit: 'cover' }}
          />
          <CardContent style={{ marginTop: 'auto' }}>
            <Typography variant="h6" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

}
