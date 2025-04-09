
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import DrawingCanvas from './DrawingCanvas';
import Timer from './Timer';
import PromptDisplay from './PromptDisplay';
import { getRandomPrompt, recognizeDrawing } from '@/utils/gameData';
import { normalizeCanvasData } from '@/utils/drawingUtils';

enum GameState {
  READY,
  PLAYING,
  RESULT,
}

const GameController: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt().word);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [maxRounds] = useState(5);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  
  const roundDuration = 60; // increase max time to 60 seconds

  useEffect(() => {
    if (round >= maxRounds) {
      toast.success(`Game Over! Final Score: ${score}/${maxRounds}`);
      if (bestTime !== null) {
        toast.success(`Your best recognition time: ${bestTime.toFixed(1)} seconds`);
      }
      resetGame();
    }
  }, [round, maxRounds, score, bestTime]);

  const startGame = () => {
    setGameState(GameState.PLAYING);
    setCurrentPrompt(getRandomPrompt().word);
    setIsCorrect(null);
    setTimeElapsed(0);
    toast.info(`Draw a ${currentPrompt} as quickly as possible!`);
  };

  const resetGame = () => {
    setGameState(GameState.READY);
    setScore(0);
    setRound(0);
    setIsCorrect(null);
    setTimeElapsed(0);
    setBestTime(null);
  };

  const handleDrawingComplete = (imageData: string) => {
    if (gameState !== GameState.PLAYING) return;
    
    // Normalize the canvas data
    const normalizedData = normalizeCanvasData(imageData);
    
    // Check if the drawing matches the prompt
    const result = recognizeDrawing(normalizedData, currentPrompt);
    
    if (result && isCorrect === null) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      
      // Track the time it took to get recognized
      if (bestTime === null || timeElapsed < bestTime) {
        setBestTime(timeElapsed);
      }
      
      toast.success(`Recognized in ${timeElapsed.toFixed(1)} seconds!`);
      setGameState(GameState.RESULT);
    }
  };

  const handleTimeEnd = () => {
    if (isCorrect === null) {
      setIsCorrect(false);
      toast.error("Time's up! AI couldn't recognize your drawing.");
    }
    
    setGameState(GameState.RESULT);
  };

  const updateTimer = (elapsedTime: number) => {
    setTimeElapsed(elapsedTime);
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    setCurrentPrompt(getRandomPrompt().word);
    setGameState(GameState.PLAYING);
    setIsCorrect(null);
    setTimeElapsed(0);
    toast.info(`Draw a ${currentPrompt} as quickly as possible!`);
  };

  const handleClearCanvas = () => {
    // This function is passed to the DrawingCanvas component
    // It will be called when the canvas is cleared
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center px-4">
        <div className="text-xl font-semibold">
          Round: {round + 1}/{maxRounds}
        </div>
        <div className="text-xl font-semibold">
          Score: {score}
        </div>
      </div>
      
      {(gameState === GameState.PLAYING || gameState === GameState.RESULT) && (
        <>
          <PromptDisplay prompt={currentPrompt} isCorrect={isCorrect} />
          
          {gameState === GameState.PLAYING && (
            <>
              <Timer 
                duration={roundDuration} 
                isRunning={gameState === GameState.PLAYING} 
                onTimeEnd={handleTimeEnd}
                onTimeUpdate={updateTimer} 
              />
              {timeElapsed > 0 && (
                <div className="text-lg font-medium">
                  Time: {timeElapsed.toFixed(1)}s
                </div>
              )}
            </>
          )}
          
          {gameState === GameState.RESULT && isCorrect && (
            <div className="text-lg font-medium mb-2">
              Time: {timeElapsed.toFixed(1)}s
              {bestTime === timeElapsed && (
                <span className="ml-2 text-success font-bold">New best time!</span>
              )}
            </div>
          )}
          
          <DrawingCanvas 
            isDrawingEnabled={gameState === GameState.PLAYING}
            onDrawingComplete={handleDrawingComplete}
            onClear={handleClearCanvas}
            width={400}
            height={400}
          />
          
          {gameState === GameState.RESULT && (
            <div className="mt-4">
              <button 
                onClick={nextRound}
                className="btn-primary"
              >
                {round < maxRounds - 1 ? 'Next Round' : 'See Final Results'}
              </button>
            </div>
          )}
        </>
      )}
      
      {gameState === GameState.READY && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Draw Dash</h1>
          <p className="text-lg mb-8">
            Draw the prompted object as FAST as you can and get our AI to recognize it!
          </p>
          <button 
            onClick={startGame}
            className="btn-primary text-lg px-8 py-3"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameController;
