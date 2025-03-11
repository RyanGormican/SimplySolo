"use client";
import { Grid, Card, CardContent } from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

const Matching = () => {
  const [icons, setIcons] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const generatePairs = () => {
      let pairs = [];
      
      for (let i = 0; i < 8; i++) {
        const icon = iconList[Math.floor(Math.random() * iconList.length)];
        const color = getRandomColor();

        pairs.push({ id: i, icon, color });
        pairs.push({ id: i, icon, color });
      }

      pairs.sort(() => Math.random() - 0.5);

      return pairs;
    };

    setIcons(generatePairs());
  }, []);

  
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

  return (
    <div>
      <h1 className="title">
        Matching
        <Icon 
          icon="mingcute:back-fill" 
          width="40" 
          color="black"
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/home')}
        />
      </h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {icons.map((iconData, index) => (
          <Grid item xs={3} key={index}>
            <Card
              onClick={() => handleCardClick(index)}
              style={{
                minHeight: '10vh',
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
    </div>
  );
};

export default Matching;
