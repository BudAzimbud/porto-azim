import React, { useState, useEffect, useRef } from "react";

const FlashlightGame = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [buttonPositions, setButtonPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isJumpscareVisible, setIsJumpscareVisible] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds to answer
  const [isTimeUp, setIsTimeUp] = useState(false); // Flag for timeout
  const [isGameOver, setIsGameOver] = useState(false); // Flag for game over state

  const audioRef = useRef(null); // Reference for the background audio
  const timerRef = useRef(null); // Reference for the timer interval

  const questions = [
    {
      question: "Which of the following frontend frameworks has Azim worked with?",
      correct: "React, Vue, Angular",
      options: ["React, Vue, Angular", "React, Ember, Vue", "Angular, Svelte, React", "NextJS, Node.js, Laravel"]
    },
    {
      question: "Which project did Azim work on as a Lead Frontend React Developer?",
      correct: "Life by IFG",
      options: ["Eroses", "Retail FX Currency", "Life by IFG", "Kata Konsumen"]
    },
    {
      question: "In which project did Azim integrate Appsflyer in a web React application?",
      correct: "Life by IFG",
      options: ["Eroses", "Life by IFG", "Fishlog WMS", "Response Reminder CMS"]
    },
    {
      question: "Which platform did Azim use for deploying the 'Kata Konsumen' project?",
      correct: "Google Cloud",
      options: ["AWS", "Azure", "Google Cloud", "IBM Cloud"]
    },
    {
      question: "Which backend framework did Azim use in the Sherpa project?",
      correct: "NestJS",
      options: ["NestJS", "Ruby on Rails", "Laravel", "Express.js"]
    },
    {
      question: "Which database did Azim use in the Fishlog WMS project?",
      correct: "PostgreSQL",
      options: ["MongoDB", "PostgreSQL", "SQL Lite", "MySQL"]
    },
    {
      question: "What was the main focus of the 'Tweakmove Pass' project Azim worked on?",
      correct: "Sanboxing application for gym check-ins",
      options: ["Sanboxing application for gym check-ins", "Sales forecasting", "Retail currency management", "Insurance product app"]
    },
    {
      question: "Which technology did Azim use to build Rest APIs in multiple projects?",
      correct: "Node.js",
      options: ["Node.js", "Ruby on Rails", "Laravel", "NextJS"]
    },
    {
      question: "What was Azim's role in the Life by IFG project?",
      correct: "Lead Frontend React Developer",
      options: ["Frontend Developer", "React Developer", "Lead Frontend React Developer", "Fullstack Developer"]
    }
  ];

  const shuffleOptions = (options) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  const [shuffledOptions, setShuffledOptions] = useState(
    shuffleOptions(questions[currentQuestionIndex].options)
  );

  // Generate random positions for buttons (only on client-side)
  const generateButtonPositions = (numButtons) => {
    if (isClient) {
      return Array.from({ length: numButtons }, () => ({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 50),
      }));
    }
    return [];
  };

  useEffect(() => {
    setIsClient(true); // Set to true once client-side
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (isClient) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      setShuffledOptions(shuffleOptions(questions[currentQuestionIndex].options));
      setButtonPositions(generateButtonPositions(questions[currentQuestionIndex].options.length));
    }
  }, [currentQuestionIndex, isClient]);

  useEffect(() => {
    if (isGameStarted && !isTimeUp) {
      // Start the countdown timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsTimeUp(true);
            playJumpscare(); // Trigger jumpscare on timeout
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // Cleanup timer on unmount
  }, [isGameStarted, isTimeUp]);

  // Start the game and play background sound
  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false); // Reset game over state
    setIsTimeUp(false); // Reset timeup flag
    setTimeLeft(10); // Reset timer to 10 seconds
    setCurrentQuestionIndex(0); // Start from the first question
    setScore(0); // Reset score
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
  };

  // Play a sound and show jumpscare
  const playJumpscare = () => {
    setIsJumpscareVisible(true);
    setTimeout(() => {
      setIsJumpscareVisible(false); // Hide jumpscare after 3 seconds
      setIsGameOver(true); // Set game over state after jumpscare
    }, 3000);
  };

  const playSound = () => {
    const audio = new Audio("/sound-kunti.mp3");
    audio.play();
    setTimeout(() => {
      setIsJumpscareVisible(true);
    }, 900);
    setTimeout(() => {
      audio.pause();
    }, 3000);
  };

  const handleAnswerClick = (selectedOption) => {
    if (isTimeUp) return; // Prevent answering after time runs out

    if (selectedOption === questions[currentQuestionIndex].correct) {
      setScore(score + 1); // Correct answer, increase score
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setIsTimeUp(false); // Reset timeout flag when answered
      setTimeLeft(10); // Reset timer
    } else {
      playSound(); // Play sound for incorrect answer
      setTimeout(() => {
        setIsJumpscareVisible(false); // Hide jumpscare image after 3 seconds
      }, 3000);
      setCurrentQuestionIndex(0); // Reset to the first question
      setScore(0); // Reset the score
      setIsGameOver(true); // Set game over state after wrong answer
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden text-gray-700">
      {/* Flashlight Effect */}
      {isClient && (
        <div
          className="pointer-events-none fixed top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 255, 255, 0.4) 60px, rgba(0, 0, 0, 0.85) 150px, rgba(0, 0, 0, 1) 300px)`,
            zIndex: 50,
          }}
        ></div>
      )}

      {/* Jumpscare Image */}
      {isJumpscareVisible && (
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <img src="/maxresdefault.jpg" alt="Jumpscare" className="w-1/2 h-auto" />
        </div>
      )}

      {/* Game Content */}
      <div className="relative z-10 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Flashlight Quiz Game</h1>
        {!isGameStarted ? (
          <div>
            <p className="text-2xl mb-4">Click to start the game!</p>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            {isGameOver ? (
              <div>
                <p className="text-2xl mb-4">Game Over!</p>
                <p className="text-lg mb-4">Your final score is: {score}/{questions.length}</p>
                <button
                  onClick={startGame} // Reset and start the game
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <>
                {currentQuestionIndex < questions.length ? (
                  <div>
                    <p className="text-lg mb-4">
                      Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
                    </p>

                    <p className="text-xl mb-4">Time Left: {timeLeft}s</p> {/* Display Timer */}

                    {/* Render buttons at fixed random positions */}
                    {shuffledOptions.map((option, index) => {
                      const position = buttonPositions[index] || { x: 0, y: 0 };
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(option)}
                          style={{
                            position: "absolute",
                            top: `${position.y}px`,
                            left: `${position.x}px`,
                            zIndex: 10,
                          }}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl mb-4">Game Over!</p>
                    <p className="text-lg mb-4">Your final score is: {score}/{questions.length}</p>
                    <button
                      onClick={startGame}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Background Music */}
      <audio ref={audioRef} src="/backsound.mp3" />
    </div>
  );
};

export default FlashlightGame;
