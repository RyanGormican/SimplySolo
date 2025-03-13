"use client";
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Box, Button, Typography } from "@mui/material";

const generateSequence = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 9));
};

const Sequence = () => {
  const [sequence, setSequence] = useState([Math.floor(Math.random() * 9)]);
  const [userInput, setUserInput] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashingIndex, setFlashingIndex] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStatus === "showing") {
      showSequence();
    }
  }, [gameStatus]);

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 9)];
    setSequence(newSequence);
    setUserInput([]);
    setCurrentIndex(0);
    setScore(0);
    setGameStatus("showing");
  };

  const showSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      setFlashingIndex(sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFlashingIndex(null);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    setGameStatus("playing");
  };

  const handleTileClick = (index) => {
    if (gameStatus !== "playing") return;

    const newUserInput = [...userInput, index];
    setUserInput(newUserInput);

    if (sequence[newUserInput.length - 1] !== index) {
      setGameStatus("gameover");
    } else if (newUserInput.length === sequence.length) {
      setTimeout(() => {
        setSequence([...sequence, Math.floor(Math.random() * 9)]);
        setUserInput([]);
        setGameStatus("showing");
        setScore(score + 1);
      }, 500);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
      {gameStatus === "gameover" && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Score: {score}
        </Typography>
      )}

      <Grid container spacing={1} justifyContent="center" style={{ width: "200px" }}>
        {[...Array(9)].map((_, index) => (
          <Grid item xs={4} key={index}>
            <Card
              onClick={() => handleTileClick(index)}
              style={{
                backgroundColor: flashingIndex === index ? "#27ae60" : "#95a5a6", // Green flashing
                height: "60px",
                cursor: gameStatus === "playing" ? "pointer" : "default",
                transition: "background-color 0.2s",
              }}
            >
              <CardContent />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={startGame} sx={{ mt: 3 }}>
        {gameStatus === "waiting" || gameStatus === "gameover" ? "Start" : "Restart"}
      </Button>
    </Box>
  );
};

export default Sequence;
