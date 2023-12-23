// import { useEffect, useState } from "react";
// import { quizData } from "./assets/quizData";
// import "./assets/styles/Quiz.css";

// const Quiz = () => {
//   const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   useEffect(() => {
//     setShuffledQuestions(shuffleArray([...quizData]));
//   }, []);

//   const [currentQuestion, setCurrentQuestion] = useState<number>(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [score, setScore] = useState<number>(0);
//   const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

//   const handleAnswer = (answer: string) => {
//     const isCorrect = answer === quizData[currentQuestion].correct;
//     setSelectedAnswer(answer);
//     setShowCorrectAnswer(!isCorrect);
//     if (isCorrect) {
//       setScore(score + 1);
//     }
//   };

//   const nextQuestion = () => {
//     setSelectedAnswer(null);
//     setShowCorrectAnswer(false);
//     setCurrentQuestion((current) => current + 1);
//   };

//   const isLastQuestion = currentQuestion === quizData.length - 1;

//   return (
//     <div className="quiz-container">
//       <div className="question">{quizData[currentQuestion].question}</div>
//       <div className="answers">
//         {quizData[currentQuestion].answers.map((answer) => (
//           <button
//             key={answer}
//             disabled={!!selectedAnswer}
//             onClick={() => handleAnswer(answer)}
//             className={
//               selectedAnswer === answer
//                 ? answer === quizData[currentQuestion].correct
//                   ? "correct"
//                   : "wrong"
//                 : ""
//             }
//           >
//             {answer}
//           </button>
//         ))}
//       </div>
//       {showCorrectAnswer && (
//         <div className="correct-answer">
//           Correct Answer: {quizData[currentQuestion].correct}
//         </div>
//       )}
//       {selectedAnswer && !isLastQuestion && (
//         <button onClick={nextQuestion}>Next Question</button>
//       )}
//       <div className="progress">
//         Question {currentQuestion + 1} of {quizData.length}
//       </div>
//       {isLastQuestion && selectedAnswer && (
//         <div className="final-score">
//           Your score: {score} out of {quizData.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

// import React, { useState, useEffect } from 'react';
// import { quizData, Question } from './quizData'; // Adjust the path if necessary

import { useEffect, useState } from "react";
import { Question, quizData } from "./assets/quizData";
import "./assets/styles/Quiz.css";

function shuffleArray(array: Question[]): Question[] {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizData));
  }, []);

  const handleAnswer = (answer: string) => {
    const isCorrect =
      answer === shuffledQuestions[currentQuestionIndex].correct;
    setSelectedAnswer(answer);
    setShowCorrectAnswer(!isCorrect);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer}
            disabled={!!selectedAnswer}
            onClick={() => handleAnswer(answer)}
            className={
              selectedAnswer === answer
                ? answer === currentQuestion.correct
                  ? "correct"
                  : "wrong"
                : ""
            }
          >
            {answer}
          </button>
        ))}
      </div>
      {showCorrectAnswer && (
        <div className="correct-answer">
          Correct Answer: {currentQuestion.correct}
        </div>
      )}
      {selectedAnswer && !isLastQuestion && (
        <button onClick={nextQuestion}>Next Question</button>
      )}
      <div className="progress">
        Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
      </div>
      {isLastQuestion && selectedAnswer && (
        <div className="final-score">
          Your score: {score} out of {shuffledQuestions.length}
        </div>
      )}
    </div>
  );
};

export default Quiz;
