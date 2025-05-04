
import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Gamepad } from 'lucide-react';

export const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const choices = ['rock', 'paper', 'scissors'];

  const playGame = (choice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('Computer wins!');
    }
  };

  if (!playerChoice) {
    return (
      <div className="mb-4">
        <p className="mb-2 text-terminal-blue font-bold">Rock Paper Scissors Game</p>
        <p className="mb-2 text-terminal-gray">Choose your move:</p>
        <div className="flex gap-2">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Rock Paper Scissors Result</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="text-terminal-gray">You chose: <span className="text-terminal-green">{playerChoice}</span></p>
        <p className="text-terminal-gray">Computer chose: <span className="text-terminal-green">{computerChoice}</span></p>
        <p className="mt-2 text-terminal-blue font-bold">{result}</p>
        <button
          onClick={() => {
            setPlayerChoice(null);
            setComputerChoice(null);
            setResult(null);
          }}
          className="mt-2 px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition"
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export const DiceRoller = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 700);
  };

  const DiceIcon = () => {
    switch (diceValue) {
      case 1:
        return <Dice1 className="w-10 h-10 text-terminal-green" />;
      case 2:
        return <Dice2 className="w-10 h-10 text-terminal-green" />;
      case 3:
        return <Dice3 className="w-10 h-10 text-terminal-green" />;
      case 4:
        return <Dice4 className="w-10 h-10 text-terminal-green" />;
      case 5:
        return <Dice5 className="w-10 h-10 text-terminal-green" />;
      case 6:
        return <Dice6 className="w-10 h-10 text-terminal-green" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Dice Roller</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray flex flex-col items-start">
        <div className={`mt-2 ${rolling ? 'animate-spin' : ''}`}>
          <DiceIcon />
        </div>
        <p className="mt-2 text-terminal-gray">You rolled: <span className="text-terminal-green font-bold">{diceValue}</span></p>
        <button
          onClick={rollDice}
          disabled={rolling}
          className={`mt-2 px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition ${rolling ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {rolling ? 'Rolling...' : 'Roll dice'}
        </button>
      </div>
    </div>
  );
};

export const NumberGuesser = () => {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setMessage('Guess a number between 1 and 100');
    setGameOver(false);
    setGuess('');
  };

  useEffect(() => {
    if (targetNumber === null) {
      startGame();
    }
  }, [targetNumber]);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage('Please enter a valid number between 1 and 100');
      return;
    }

    setAttempts(attempts + 1);

    if (guessNum === targetNumber) {
      setMessage(`Congratulations! You guessed the correct number in ${attempts + 1} attempts!`);
      setGameOver(true);
    } else if (guessNum < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
    }
    setGuess('');
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Number Guessing Game</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="mb-2 text-terminal-gray">{message}</p>
        {!gameOver ? (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="bg-terminal-darkgray text-terminal-green px-2 py-1 rounded focus:outline-none"
              placeholder="Enter guess"
              min="1"
              max="100"
            />
            <button
              onClick={handleGuess}
              className="px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition"
            >
              Guess
            </button>
          </div>
        ) : (
          <button
            onClick={startGame}
            className="px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition"
          >
            Play again
          </button>
        )}
        <p className="mt-2 text-terminal-gray">Attempts: {attempts}</p>
      </div>
    </div>
  );
};

export const gamesHelp = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Available Games:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue">rps</td>
            <td className="text-terminal-gray">Play Rock Paper Scissors</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">dice</td>
            <td className="text-terminal-gray">Roll a dice</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">numguess</td>
            <td className="text-terminal-gray">Number Guessing Game</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
