"use client";
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Box, Button, Typography } from "@mui/material";

const generateColor = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "grey"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateWord = () => {
  const words = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Grey"];
  return words[Math.floor(Math.random() * words.length)];
};

const Deception = () => {
  const [word, setWord] = useState("");
  const [color, setColor] = useState("");
  const [gameStatus, setGameStatus] = useState("waiting");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(3);
  const [focusOption, setFocusOption] = useState("");

  useEffect(() => {
    if (gameStatus === "playing") {
      setWord(generateWord());
      setColor(generateColor());
      setTimer(3);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "playing") {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(countdown);  
        setGameStatus("gameover");
      }
      console.log(timer);
      return () => clearInterval(countdown);
    }
  }, [gameStatus, timer]);

  const startGame = () => {
    setScore(0);
    setFocusOption("");
    setGameStatus("waiting");
  };

  const handleFocusOption = (option) => {
    setFocusOption(option);
    setGameStatus("playing");
  };

  const handleClick = (clickedColor) => {
    let correctAnswer = false;

    if (focusOption === "Color") {
      correctAnswer = clickedColor === color;
    } else if (focusOption === "Text") {
      correctAnswer = clickedColor === word.toLowerCase();
    }

    if (correctAnswer) {
      setScore(score + 1);
      setWord(generateWord());
      setColor(generateColor());
      setTimer(3); 
    } else {
      setGameStatus("gameover");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
      {focusOption && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Score: {score}
        </Typography>
      )}

      {gameStatus === "waiting" && (
        <Box>
          <Button onClick={() => handleFocusOption("Color")} variant="contained" sx={{ mr: 2 }}>
            Color
          </Button>
          <Button onClick={() => handleFocusOption("Text")} variant="contained">
            Text
          </Button>
        </Box>
      )}

      {gameStatus === "playing" && focusOption && (
        <>
          <Typography variant="h5" color={color} sx={{ mb: 3 }}>
            {word}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {timer}s
          </Typography>
        </>
      )}

      {focusOption && (
        <Grid container spacing={2} justifyContent="center" style={{ width: "200px" }}>
          {["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "grey"].map((buttonColor) => (
            <Grid item xs={4} key={buttonColor}>
              <Card
                onClick={() => handleClick(buttonColor)}
                style={{
                  backgroundColor: buttonColor,
                  height: "60px",
                  cursor: gameStatus === "playing" ? "pointer" : "default",
                  opacity: gameStatus === "gameover" ? 0.5 : 1,
                  transition: "background-color 0.2s",
                }}
              >
                <CardContent />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {gameStatus === "gameover" && (
        <Button variant="contained" color="primary" onClick={startGame} sx={{ mt: 3 }}>
          Restart
        </Button>
      )}
    </Box>
  );
};

export default Deception;
