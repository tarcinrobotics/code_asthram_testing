import React, { useState } from 'react';
import './FloatingMiniScreen.css';
import { FaImage, FaLightbulb, FaTimes, FaChevronLeft, FaChevronRight, FaQuestion } from 'react-icons/fa';

const FloatingScreen = ({ isVisible, toggleVisibility, content, hints, questions }) => {
  const [view, setView] = useState('image');
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  if (!isVisible) return null;

  const handleQuestionAnswer = (option) => {
    if (questions && option === questions[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
      setIsIncorrect(false);
      setTimeout(() => setIsCorrect(false), 3000); // Time delay before resetting
    } else {
      setIsIncorrect(true);
      setIsCorrect(false);
      setTimeout(() => setIsIncorrect(false), 3000); // Time delay before resetting
    }
  };

  return (
    <div className="floating-screen">
      <button onClick={toggleVisibility} className="close-button">
        <FaTimes />
      </button>
      
      {view !== 'image' && (
        <button onClick={() => setView('image')} className="back-to-image-button">
          <FaImage />
        </button>
      )}

      {view === 'image' && (
        <>
          <button onClick={() => setView('hints')} className="toggle-view-button hints-button">
            <FaLightbulb />
          </button>
          {questions && questions.length > 0 && (
            <button onClick={() => setView('questions')} className="toggle-view-button questions-button">
              <FaQuestion />
            </button>
          )}
          {content}
        </>
      )}

      {view === 'hints' && (
        <div className="project-hints">
          <button onClick={() => setCurrentHintIndex((currentHintIndex - 1 + hints.length) % hints.length)} className="hint-nav-button left">
            <FaChevronLeft />
          </button>
          <button onClick={() => setCurrentHintIndex((currentHintIndex + 1) % hints.length)} className="hint-nav-button right">
            <FaChevronRight />
          </button>
          <p>{hints[currentHintIndex]}</p>
        </div>
      )}

      {view === 'questions' && questions && questions.length > 0 && (
        <div className="project-questions">
          <p>{questions[currentQuestionIndex].questionText}</p>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleQuestionAnswer(option)} className="question-option">
              {option}
            </button>
          ))}
          {isCorrect && <div className="correct-answer">🌟 Spectacular! You nailed it! 🌟</div>}
          {isIncorrect && <div className="incorrect-answer">🔍 Almost there! Let's give it another shot! 🔍</div>}
        </div>
      )}
    </div>
  );
}

export default FloatingScreen;
