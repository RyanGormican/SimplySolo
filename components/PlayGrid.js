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
   const sortedPlayData = [...playData].sort((a, b) => {
    if (a.color < b.color) return -1;
    if (a.color > b.color) return 1;
    return 0;
  });
  return (
    <Grid container spacing={2} justifyContent="center">
      {playData.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card
            onClick={() => handleCardClick(card.title)}
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: card.color || '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0px 8px 30px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <CardContent style={{ flex: 1, paddingBottom: '8px' }}>
              <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                {card.title}
              </Typography>
            </CardContent>
            <CardContent style={{ flex: 2, paddingBottom: '8px' }}>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardContent style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {card.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  color="primary"
                  style={{ fontWeight: 'bold', margin: '2px' }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
