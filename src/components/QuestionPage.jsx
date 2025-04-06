import React, { useState } from 'react';
import questions from '../data/questions';
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';




function QuestionPage() {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); 

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  const handleOptionClick = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results', {state: { answers: newAnswers } })
    }
  };







  return(
    <>

      <div className='flex flex-col items-center justify-center gap-5 bg-gray-100 min-h-screen '>
        <div className='w-24 h-24 mb-6'> 
          <CircularProgressbar
            value={progressPercent}
            text={`${progressPercent}%`}
            styles={buildStyles({
              textColor: '#4f46e5',
              pathColor: '#4f46e5',
              trailColor: '#e5e7eb',
            })}
          />
        </div>
        <div className='bg-white rounded-2xl p-6 space-y-5 w-80 sm:w-md md:w-lg flex flex-col gap-4'>
          <div className='text-center font-semibold md:text-2xl'>{currentQuestion.question}</div>
          <div className='space-y-2'>
            {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className="text-left flex flex-col border border-gray-200 rounded-xl w-full py-4 ps-4 cursor-pointer hover:bg-indigo-500 hover:text-white hover:transition-all hover:ease-in-out hover:duration-500 hover:-translate-y-1 delay-0"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {option.text}
            </button>
          ))}
          </div>
        </div>
        <div className="mt-6 text-gray-500 text-sm">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>
      
    </>
  );
}
export default QuestionPage