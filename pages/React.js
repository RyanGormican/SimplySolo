"use client";
import { Button, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const React = () => {
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const startGame = () => {
    setStatus("waiting");
    setMessage("Wait...");
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 3000) + 2000;
    const newTimeoutId = setTimeout(() => {
      setStatus("ready");
      setMessage("Now!");
      setStartTime(Date.now());
    }, delay);

    setTimeoutId(newTimeoutId);
  };

  const handleClick = () => {
    if (status === "waiting") {
      setMessage("Too Soon! Click to Try Again");
      clearTimeout(timeoutId);
    } else if (status === "ready") {
      setReactionTime(Date.now() - startTime);
      setMessage("");
    }
    setStatus("waiting");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
      <Typography variant="h5" sx={{ mb: 2 }}>{message}</Typography>
      {reactionTime !== null && (
        <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
          {reactionTime} ms
        </Typography>
      )}
      <Button 
        variant="contained" 
        color={status === "ready" ? "success" : "primary"} 
        onClick={status === "ready" ? handleClick : startGame}
        sx={{ width: 200, height: 80, fontSize: 20 }}
      >
        {status === "waiting" ? "Start" : "Click!"}
      </Button>
    </Box>
  );
};

export default React;
