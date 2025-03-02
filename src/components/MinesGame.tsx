import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Diamond, Bomb, Crown } from 'lucide-react';

interface Cell {
  isMine: boolean;
  isDiamond: boolean;
  isRevealed: boolean;
  isSpecial: boolean;
}

const GRID_SIZE = 4;

const MinesGame = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initialize grid with one mine and diamonds
  const initializeGrid = () => {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isDiamond: false,
        isRevealed: false,
        isSpecial: false
      }))
    );

    // Place one mine randomly
    const mineRow = Math.floor(Math.random() * GRID_SIZE);
    const mineCol = Math.floor(Math.random() * GRID_SIZE);
    newGrid[mineRow][mineCol].isMine = true;

    // Place one special diamond (crown)
    let specialRow, specialCol;
    do {
      specialRow = Math.floor(Math.random() * GRID_SIZE);
      specialCol = Math.floor(Math.random() * GRID_SIZE);
    } while (specialRow === mineRow && specialCol === mineCol);
    newGrid[specialRow][specialCol].isSpecial = true;

    // Fill rest with diamonds
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!newGrid[i][j].isMine && !newGrid[i][j].isSpecial) {
          newGrid[i][j].isDiamond = true;
        }
      }
    }

    return newGrid;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isMine) {
      setGameOver(true);
      // Reveal all cells on game over
      newGrid.forEach(row => row.forEach(cell => cell.isRevealed = true));
    } else if (newGrid[row][col].isSpecial) {
      setGameWon(true);
      // Reveal all cells on win
      newGrid.forEach(row => row.forEach(cell => cell.isRevealed = true));
    }

    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-violet-200 mb-1">Birthday Treasure Hunt</h3>
        <p className="text-violet-300 text-sm">Find the crown, avoid the bomb! 👑</p>
      </div>

      <div className="grid grid-cols-4 gap-1 bg-violet-900/30 p-2 rounded-lg backdrop-blur-sm">
        {grid.map((row, i) => (
          row.map((cell, j) => (
            <motion.button
              key={`${i}-${j}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-12 h-12 rounded-md flex items-center justify-center
                ${cell.isRevealed 
                  ? cell.isMine 
                    ? 'bg-red-500/50' 
                    : cell.isSpecial 
                      ? 'bg-yellow-500/50'
                      : 'bg-violet-700/30' 
                  : 'bg-violet-800/50 hover:bg-violet-600/50'}
                transition-colors duration-300
              `}
              onClick={() => handleCellClick(i, j)}
            >
              {cell.isRevealed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {cell.isMine ? (
                    <Bomb className="w-6 h-6 text-red-300" />
                  ) : cell.isSpecial ? (
                    <Crown className="w-6 h-6 text-yellow-300" />
                  ) : (
                    <Diamond className="w-5 h-5 text-blue-300" />
                  )}
                </motion.div>
              )}
            </motion.button>
          ))
        ))}
      </div>

      <AnimatePresence>
        {(gameOver || gameWon) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className={`text-lg font-bold mb-2 ${gameWon ? 'text-yellow-300' : 'text-red-300'}`}>
              {gameWon ? (
                <span className="flex items-center gap-2 justify-center">
                  Crown Found! <Sparkles className="w-4 h-4" />
                </span>
              ) : (
                'Boom! Try again!'
              )}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-4 py-2 bg-violet-600 text-white rounded-full
                hover:bg-violet-500 transition-colors duration-300
                flex items-center gap-2 mx-auto text-sm mb-6"
            >
              Play Again
              <Sparkles className="w-4 h-4" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <h2 className="text-2xl font-bold text-violet-200 mb-4">
                What's your wish?
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block ml-2"
                >
                  ✨
                </motion.span>
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MinesGame; 