"use client";
import { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";

const generateCompleteGrid = () => {
  const grid = Array(9).fill(null).map(() => Array(9).fill(0));

  const isValid = (grid, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
      const subRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const subCol = 3 * Math.floor(col / 3) + (i % 3);
      if (grid[subRow][subCol] === num) return false;
    }
    return true;
  };

  const fillGrid = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          let numbers = [...Array(9)].map((_, i) => i + 1).sort(() => Math.random() - 0.5);
          for (let num of numbers) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillGrid(grid);
  return grid;
};

const createSudokuPuzzle = (grid, difficulty = 40) => {
  let puzzle = JSON.parse(JSON.stringify(grid));
  let given = Array(9).fill(null).map(() => Array(9).fill(false));

  let attempts = difficulty;
  while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      let num = Math.floor(Math.random() * 9) + 1;
      if (!puzzle[row].includes(num) && !puzzle.map(r => r[col]).includes(num)) {
        puzzle[row][col] = num;
        given[row][col] = true;
        attempts--;
      }
    }
  }
  return { puzzle, given };
};

const Sudoku = () => {
  const fullGrid = generateCompleteGrid();
  const { puzzle, given } = createSudokuPuzzle(fullGrid);
  const [userGrid, setUserGrid] = useState(JSON.parse(JSON.stringify(puzzle)));
  const [message, setMessage] = useState("");

  const handleCellChange = (e, row, col) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 1 && value <= 9) {
      const newGrid = JSON.parse(JSON.stringify(userGrid));
      newGrid[row][col] = value;
      setUserGrid(newGrid);
    }
  };

  const handleValidate = () => {
    setMessage(JSON.stringify(userGrid) === JSON.stringify(fullGrid) ? "Sudoku is solved!" : "Incorrect solution.");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
      <Grid container spacing={1} justifyContent="center">
        {userGrid.map((row, rowIndex) => (
          <Grid container item key={rowIndex} spacing={1} justifyContent="center">
            {row.map((cell, colIndex) => (
              <Grid item key={colIndex}>
                <TextField
                  type="number"
                  value={cell === 0 ? "" : cell}
                  onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                  inputProps={{
                    min: 1,
                    max: 9,
                    style: { textAlign: "center", fontSize: 24 },
                  }}
                  disabled={puzzle[rowIndex][colIndex] !== 0}
                  variant="outlined"
                  sx={{
                    width: auto,
                    height: auto,
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      fontWeight: "bold",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleValidate}>
          Validate Sudoku
        </Button>
      </Box>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
};

export default Sudoku;
