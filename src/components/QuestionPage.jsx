import { useState } from 'react';
import questions from '../data/questions';
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';




function QuestionPage() {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);               //track of current question index
  const [answers, setAnswers] = useState([]);                        // stores selected answers/options
  const [selectedOption, setSelectedOption] = useState(null);        //track of selected option's index for current question. null = no option is selected yet

  const currentQuestion = questions[currentIndex];                   //retrives the question at current index
  const totalQuestions = questions.length;
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  const handleOptionClick = (option, index) => {                       //"option" holds the  selected answer for the current question
    setSelectedOption(index);                                          //mark the clicked option as selected for styling
    const newAnswers = [...answers, option];                    // answers hold previously selected options, 'option' holds current selected option, ...answers is used to keep previous answers and add new option to it.all this creates a new array which we store in newAnswers. 

    setTimeout(() => {                                                     // Delay navigation to next question by 500ms to allow selection animation to complete
      setAnswers(newAnswers);
      
      if (currentIndex + 1 < totalQuestions) {                    //checking if there are more questions
        setCurrentIndex(currentIndex + 1);                        //move to the next question
        setSelectedOption(null);                                  //reset selected option for new question      
      } else {
        navigate('/results', {
          state: { 
            answers: newAnswers 
          } 
        });
      }
    }, 350);
  };


  return(
    <>
      <div className='flex items-center justify-center min-h-screen  bg-gray-100'>
        <div className='flex flex-col items-center justify-center m-3 gap-5'>
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
          <div 
            className='bg-white rounded-2xl p-6 space-y-5 w-80 sm:w-md md:w-lg flex flex-col gap-4 animate-slide-question'
            key={currentIndex}
          >
            <div className='text-center font-semibold text-lg md:text-2xl'>{currentQuestion.question}</div>
            <div className='space-y-2'>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option, index)}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  className="relative overflow-hidden w-full text-left border border-gray-200 rounded-xl py-4 ps-4 cursor-pointer"
                >
                  <span
                    className={`absolute inset-0 bg-indigo-500 transition-all duration-350 ease-out z-0 origin-left
                      ${selectedOption === index ? 'scale-x-100' : 'scale-x-0'}
                    `}
                    style={{ transformOrigin: 'left' }}
                  />
                  <span className={`relative transition-colors ${selectedOption === index ? 'text-white' : 'text-black'}`}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 text-gray-500 text-sm">
            Question { currentIndex + 1 } of {totalQuestions}
          </div>
        </div>
      </div>
    </>
  );
}
export default QuestionPage