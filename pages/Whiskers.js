"use client";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Icon } from '@iconify/react';

const generateRandomPosition = (excluded) => {
  let position;
  do {
    position = Math.floor(Math.random() * 9);
  } while (excluded.includes(position));
  return position;
};

const Whiskers = () => {
  const [score, setScore] = useState(0);
  const [catPosition, setCatPosition] = useState(generateRandomPosition([]));
  const [bombPositions, setBombPositions] = useState([generateRandomPosition([catPosition])]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);

    const moveCatAndBombs = setInterval(() => {
      if (!isGameOver) {
        setCatPosition(generateRandomPosition(bombPositions));
        setBombPositions((prevBombs) => {
          const newBombs = prevBombs.map(bomb => generateRandomPosition([catPosition, ...prevBombs.filter(b => b !== bomb)]));
          if (timeLeft % 10 === 0 && newBombs.length < 8) {
            newBombs.push(generateRandomPosition([catPosition, ...newBombs]));
          }
          return newBombs;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(moveCatAndBombs);
    };
  }, [timeLeft, isGameOver, catPosition, bombPositions]);

  const handleClick = (index) => {
    if (isGameOver) return;
    if (index === catPosition) {
      setScore(score + 1);
    } else if (bombPositions.includes(index)) {
      setTimeLeft(0);
      setIsGameOver(true);
    }
  };

  const renderCell = (index) => {
    if (index === catPosition) {
      return (
        <Box
          onClick={() => handleClick(index)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "60px",
            backgroundColor: "#ffeb3b",
            borderRadius: "8px",
          }}
        >
          <Icon icon="mdi:cat" style={{ fontSize: "36px" }} />
        </Box>
      );
    } else if (bombPositions.includes(index)) {
      return (
        <Box
          onClick={() => handleClick(index)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "60px",
            backgroundColor: "#f44336",
            borderRadius: "8px",
          }}
        >
          <Icon icon="material-symbols:bomb" style={{ fontSize: "36px" }} />
        </Box>
      );
    } else {
      return (
        <Box
          onClick={() => handleClick(index)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "60px",
            backgroundColor: "#c8e6c9",
            borderRadius: "8px",
          }}
        />
      );
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(120);
    setIsGameOver(false);
    setCatPosition(generateRandomPosition([]));
    setBombPositions([generateRandomPosition([catPosition])]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
      <Typography variant="h6">{timeLeft}s</Typography>
      <Typography variant="h6">Score: {score}</Typography>

      <Grid container spacing={0} sx={{ marginTop: 2, width: '180px' }}>
        {[...Array(9)].map((_, index) => (
          <Grid item key={index} xs={4}>
            {renderCell(index)}
          </Grid>
        ))}
      </Grid>

      {isGameOver && (
        <Box mt={3} display="flex" justifyContent="center">

          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart Game
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Whiskers;
