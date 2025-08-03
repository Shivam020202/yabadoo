import React, { useState, useEffect } from "react";

const KidsMemoryGame: React.FC = () => {
  const emojis: string[] = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first] === cards[second]) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  // Check win condition
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards]);

  const initializeGame = (): void => {
    const shuffledCards: string[] = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index: number): void => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }
    setFlippedCards((prev) => [...prev, index]);
  };

  const resetGame = (): void => {
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎮 Memory Game 🎮
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-xl md:text-2xl font-semibold text-white">
              Moves: {moves}
            </p>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto mb-8">
          {cards.map((emoji, index) => {
            const isFlipped =
              flippedCards.includes(index) || matchedCards.includes(index);
            const isMatched = matchedCards.includes(index);

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`
                  aspect-square rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105
                  ${
                    isFlipped
                      ? isMatched
                        ? "bg-gradient-to-br from-green-300 to-green-500 shadow-lg"
                        : "bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg"
                      : "bg-gradient-to-br from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 shadow-md"
                  }
                  flex items-center justify-center text-3xl md:text-4xl
                  border-4 border-white/30
                `}
              >
                {isFlipped ? (
                  <span className="animate-bounce">{emoji}</span>
                ) : (
                  <span className="text-white text-2xl md:text-3xl">❓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="text-center mb-8">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transform transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95"
          >
            🔄 New Game
          </button>
        </div>

        {/* Win Message */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 transform ">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-600 mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You won in {moves} moves!
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full text-lg transform transition-all duration-200 hover:scale-110"
              >
                🎮 Play Again
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">How to Play:</h3>
          <p className="text-lg text-white/90">
            Click on the cards to flip them over. Find matching pairs of
            animals! 🐾
          </p>
        </div>
      </div>
    </div>
  );
};

export default KidsMemoryGame;
