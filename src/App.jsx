import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

const App = () => {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [roundWinner, setRoundWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const dealCards = () => {
    if (cardDeck.length < 2) {
      // Check who has the higher score when deck runs out
      if (player1Score > player2Score) {
        setRoundWinner("🏆 Player 1 is the Overall Winner! 🏆");
      } else if (player2Score > player1Score) {
        setRoundWinner("🏆 Player 2 is the Overall Winner! 🏆");
      } else {
        setRoundWinner("It's a Draw!");
      }
      setGameOver(true);
      return;
    }

    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setPlayer1Score(player1Score + 1);
      setRoundWinner("Player 1 Wins This Round!");
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      setPlayer2Score(player2Score + 1);
      setRoundWinner("Player 2 Wins This Round!");
    } else {
      setRoundWinner("It's a Tie!");
    }
  };

  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRoundWinner("");
    setGameOver(false);
  };

  return (
    <>
      <div className="card">
        <h2>React High Card 🚀</h2>

        {/* Display Player Cards */}
        <div className="player-cards">
          {currCards[0] && (
            <div className="card-container">
              <p className="card-title">Player 1</p>
              <p>{currCards[0].name}</p>
              <p>{currCards[0].suit}</p>
            </div>
          )}
          {currCards[1] && (
            <div className="card-container">
              <p className="card-title">Player 2</p>
              <p>{currCards[1].name}</p>
              <p>{currCards[1].suit}</p>
            </div>
          )}
        </div>

        {/* Display Round Winner and Scores */}
        <h3>{roundWinner}</h3>
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>

        {/* Buttons */}
        <button onClick={dealCards} disabled={gameOver}>Deal</button>
        {gameOver && <button onClick={restartGame}>Restart Game</button>}
      </div>
    </>
  );
};

export default App;
