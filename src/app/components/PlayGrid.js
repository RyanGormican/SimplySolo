// components/PlayGrid.js
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { playData } from './PlayData';

export default function PlayGrid() {
  return (
    <Grid container spacing={4} justifyContent="center">
      {playData.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card>
            <CardMedia
    
            />
            <CardContent>
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
