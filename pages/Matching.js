"use client";
import { Grid, Card, CardContent, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const iconList = [
  'material-symbols:square',
  'material-symbols:circle',
  'material-symbols:hexagon',
  'mdi:triangle',
  'material-symbols:star',
  "mdi:octagon",
  "material-symbols:pentagon",
  "mdi:rhombus",
  "mdi:heart",
];

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const boardSizes = [
  { label: '4x4', rows: 4, cols: 4 },
  { label: '4x6', rows: 4, cols: 6 },
  { label: '6x6', rows: 6, cols: 6 },
  { label: '6x8', rows: 6, cols: 8 },
  { label: '8x8', rows: 8, cols: 8 },
];

const Matching = () => {
  const [gridSize, setGridSize] = useState(null);
  const [icons, setIcons] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!gridSize) return;

    const totalPairs = (gridSize.rows * gridSize.cols) / 2;
    let pairs = [];

    for (let i = 0; i < totalPairs; i++) {
      const icon = iconList[i % iconList.length];
      const color = getRandomColor();
      pairs.push({ id: i, icon, color });
      pairs.push({ id: i, icon, color });
    }

    pairs.sort(() => Math.random() - 0.5);
    setIcons(pairs);
    setFlipped([]);
    setMatched([]);
  }, [gridSize]);

  const handleCardClick = (index) => {
    if (waiting || flipped.includes(index) || matched.some(match => match.index === index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (icons[firstIndex].id === icons[secondIndex].id) {
        setMatched((prev) => [...prev, icons[firstIndex]]);
        setFlipped([]);
      } else {
        setWaiting(true);
        setTimeout(() => {
          setFlipped([]);
          setWaiting(false);
        }, 1000);
      }
    }
  };

  if (!gridSize) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {boardSizes.map((size) => (
          <Grid item key={size.label}>
            <Button variant="contained" onClick={() => setGridSize(size)}>
              {size.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {icons.map((iconData, index) => (
          <Grid item key={index} xs={12 / gridSize.cols}>
            <Card
              onClick={() => handleCardClick(index)}
              style={{
                minHeight: '8vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: flipped.includes(index) || matched.some(match => match.id === iconData.id) ? 'white' : 'gray',
              }}
            >
              <CardContent
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  visibility: flipped.includes(index) || matched.some(match => match.id === iconData.id) ? 'visible' : 'hidden',
                }}
              >
                <Icon icon={iconData.icon} width="40" height="40" style={{ color: iconData.color }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={() => setGridSize(null)}>RESET</Button>
      </Grid>
    </div>
  );
};

export default Matching;
