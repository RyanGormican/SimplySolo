"use client";
import { Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
};

const calculateColorDifference = (color1, color2) => {
  return (
    Math.abs(color1.r - color2.r) +
    Math.abs(color1.g - color2.g) +
    Math.abs(color1.b - color2.b)
  );
};

const adjustColor = (color, amount) => {
  let newColor = {
    r: Math.min(255, Math.max(0, color.r + amount)),
    g: Math.min(255, Math.max(0, color.g + amount)),
    b: Math.min(255, Math.max(0, color.b + amount)),
  };
  
  while (calculateColorDifference(newColor, color) <= 0) {
    newColor = {
      r: Math.min(255, Math.max(0, color.r + amount)),
      g: Math.min(255, Math.max(0, color.g + amount)),
      b: Math.min(255, Math.max(0, color.b + amount)),
    };
  }

  return newColor;
};

const Perception = () => {
  const [gridSize, setGridSize] = useState(2);
  const [color, setColor] = useState(getRandomColor());
  const [offIndex, setOffIndex] = useState(0);
  const [difference, setDifference] = useState(80);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const baseColor = getRandomColor();
    const newOffIndex = Math.floor(Math.random() * (gridSize * gridSize));
    setColor(baseColor);
    setOffIndex(newOffIndex);
    setStatus(null);
  };

  const handleClick = (index) => {
    if (index === offIndex) {
      setStatus("correct");
      setTimeout(() => {
        setGridSize(gridSize + 1);
        setDifference(Math.max(5, difference - 10));
        resetGame();
      }, 1000);
    } else {
      setStatus("wrong");
      setTimeout(() => {
        setGridSize(2);
        setDifference(80);
        resetGame();
      }, 1000);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      style={{
        padding: "10px",
      }}
    >
      {[...Array(gridSize * gridSize)].map((_, index) => {
        const cellColor = index === offIndex ? adjustColor(color, difference) : color;
        const borderColor = status === "correct" ? "green" : status === "wrong" ? "red" : "transparent";

        return (
          <Grid item xs={12 / gridSize} key={index}>
            <Card
              onClick={() => handleClick(index)}
              style={{
                backgroundColor: `rgb(${cellColor.r},${cellColor.g},${cellColor.b})`,
                minHeight: "10vh",
                cursor: "pointer",
                border: `5px solid ${borderColor}`,
              }}
            >
              <CardContent />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Perception;
