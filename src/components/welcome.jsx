import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/questions');  
  };



  return(
    <>
      <div className="flex flex-col justify-center items-center min-h-screen gap-8 bg-neutral-800">
        <div className="w-36 h-36 bg-gradient-to-r from-violet-800  to-pink-400 rounded-full animate-bounce" style={{
          animationDuration: "5s",
          animationTimingFunction: "ease-in-out"
        }}></div>
        <div className=" text-center font-sans capitalize bg-gradient-to-r from-violet-800 to-pink-400 bg-clip-text text-transparent text-5xl py-2 animate-pulse">discover your personality profile</div>
        <div className=" bg-neutral-50 py-3 px-8 rounded-full text-purple-800 shadow-xl inset-shadow-sm capitalize font-medium transition duration-700 ease-in-out hover:-translate-y-1">
          <button className="flex items-center gap-2 capitalize" onClick={handleClick}>start assessment<span className="pt-0.5"><FontAwesomeIcon icon={faArrowRight} /></span></button>
        </div>
      </div>
    </>
  );
}
export default Welcome;