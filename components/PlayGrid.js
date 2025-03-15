"use client";
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';
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
    <Grid container spacing={1.5} justifyContent="center">
      {playData.map((card) => (
        <Grid item xs={12} sm={6} md={2.5} key={card.id}>
          <Card
            onClick={() => handleCardClick(card.title)}
            style={{
              cursor: 'pointer',
              height: '30vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: card.color || '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <CardContent style={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {card.title}
              </Typography>
            </CardContent>
            <CardContent style={{ flex: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardContent style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {card.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" color="primary" />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
