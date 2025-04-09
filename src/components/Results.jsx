import React, {useState, useEffect} from 'react';
import traits from '../data/traits';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';
import confetti from 'canvas-confetti';


function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);                               //initializing state variable with current window width

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);                            //function toupdate the width state to the latest window width
    window.addEventListener("resize", handleResize);                                   //adds an event listener to window resize event.this calls handleresize whenever the window is resized
    return () => window.removeEventListener("resize", handleResize);                   //cleanup function. removes the function when done using it(unmounted/un-rendered)
  }, []);

  return width;                                                                        // Returning the current window width so it can be used in the component (e.g., for responsive layouts)

}

function getRandomColor() {
  const letters = "0123456789ABCDEF";                                                  //A string of hexadecimal digits to form color codes
  let color = "#";                                                                     //starting  color string with # to signify hex color code
  for (let i = 0; i < 6; i++) {                                                        //looping 6 times to generate (#ffffff)
    color += letters[Math.floor(Math.random() * 16)];                                  //1.Math.random() gives a random number between 0 and 1.2.We multiply that by 16 to get a number between 0 and 15.999...3.Math.floor() turns it into a whole number between 0 and 15.4.That number is used to pick a random character from the letters string (which has 16 characters: 0–9 and A–F).5.We add that character to the color string.6.This repeats 6 times to build a random color like #A1B2C3.
  }
  return color;                                                                        //return completed color (#3fAgf9)
}

const CustomTooltip = ({ active, payload }) => {                                       //payload is derived from Recharts.
  if (active && payload && payload.length) {
    const item = payload[0].payload; 
    const color = item.color || "#ccc"; 
    return (
      <div className="relative bg-black text-white shadow-md  rounded-sm p-1 text-sm">
        <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-black"></div>  {/* Arrow */}
        <div className="flex items-center space-x-2">   {/* Content */}
          <div
            style={{ backgroundColor: color, width: 15, height: 15 }}
          />
          <span className="capitalize">{item.trait}</span>
          <div>{item.percent}%</div>
        </div>
      </div>
    );
  }
  return null;
};



function Results() {

  useEffect(() => {
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.7 },
    });
  }, []);

  const { state } = useLocation();
  const answers = state?.answers || [];

  
  const width = useWindowWidth();
  
  // Adjust tick interval based on screen width
  let tickInterval;

  if (width <= 320) {
    tickInterval = 4;
  }  else if( width <= 375) {
    tickInterval = 2;
  } else if( width <= 430) {
    tickInterval = 1;
  } else {
    tickInterval = 0; // show all ticks on large screens
  }
  
  
  
  const traitScores = {};                                                            // an empty object to store total scores for each trait

  answers.forEach(answer => {
    const trait = answer.trait;                                                       //getting the trait associated with current answer

    if (trait) {
      traitScores[trait] = (traitScores[trait] || 0) + 5;                             //if answer has vaild trait,add 5 points to that triats score,or start from 0 if its not already in the object
    }
  });
  
  const sortedTraits = Object.entries(traitScores).sort((a, b) => b[1] - a[1]);       //converted the TraitScores{} into [] of [trait,score] pairs, then sorted them in descending order based on score
  
  // Define percentage bands based on rank
  const percentageBands = [
    [90, 100], 
    [80, 90],    
    [70, 80],    
    [60, 70],    
    [50, 60],    
    [40, 50],    
    [30, 40],    
    [20, 30],    
  ];
  
  const barColors = {
    introvert: '#f97316',
    extrovert: '#facc15',
    ambivert:  '#ec4899',
    empathetic: '#ef4444',
    disciplined: '#14b8a6',
    logical: '#8b5cf6',
    creative: '#38bdf8',
    resilient: '#84cc16',
    flexible: '#6366f1',
    analytical: '#e9d5ff',
    social: '#fbcfe8',
    structured: '#bbf7d0',
    adaptive: '#6b7280',
    optimistic: '#f5deb3',
    communicative: '#a3a3a3',
    spontaneous: '#c084fc',
    ambitious: '#e0bbeb',
    curious: '#a7c7e7',
  };
    
  const topTraits = sortedTraits.slice(0, 8).map(([trait], index) => {                                 //top 8 traits from the sorted list
    const [min, max] = percentageBands[index] || [10, 20];                                            //min and max % range for the current index from bands([10,20] default % band)
    const percent = index === 0 ? 100 : Math.floor(Math.random() * (max - min + 1)) + min;             // Assign 100% to the top trait, others get a random percentage between min and max
    const color = barColors[trait] || getRandomColor();
    return { 
      trait, 
      percent,
      color
    };
  });
  
  const topTraitsWithDescriptions = topTraits.filter(t => traits[t.trait]);                           //filter-out traits that have descriptions defined in "traits" object
  const dominantTrait = topTraitsWithDescriptions[0];                                                //pick the first one in the filtered list
  
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }
  


  return (
    <>
      <div className='bg-gray-100 flex justify-center items-center min-h-screen'>
        <div className="flex flex-col m-2 gap-5">
          <div className='bg-white rounded-xl pr-10 pl-5 w-full max-w-3xl '>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={topTraits}
                layout="vertical"
                margin={{ top: 60, right: 16, left: 0, bottom: 40 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                  interval={tickInterval}
                />
                
                <YAxis
                  dataKey="trait"
                  type="category"
                  tick={{ fontSize: 14 }}
                  width={120}
                  className='capitalize'
                />

                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />

                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  content={({ active, payload }) => (
                  <CustomTooltip active={active} payload={payload} colors={barColors} />
                  )}
                />

                <Bar 
                  dataKey="percent" 
                  barSize={25}
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  {topTraits.map((item, index) => (                 
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trait Description */}
          <div className={`overflow-hidden bg-indigo-100 p-10 rounded-xl  font-semibold w-full max-w-3xl 
            relative before:absolute before:inset-0 before:rounded-[inherit] 
            before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%)] 
            before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat 
            before:animate-[continuous-shine_2.5s_linear_infinite]`}
            style={{
              background: `linear-gradient(to right, ${topTraits[0].color}, ${topTraits[topTraits.length - 1].color})`
            }}
          >
            <h3 className="text-4xl mb-2 text-center text-white font-bold">{traits[dominantTrait.trait]?.title}</h3>
            <p className="text-lg font-normal text-white text-center" style={{ fontFamily: "Poppins"}}>{traits[dominantTrait.trait]?.description}</p>
          </div>

          {/* Buttons */}
          <div className='flex justify-around items-center w-full max-w-3xl'>
            <div className='bg-white px-5 py-3 rounded-3xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{ color: dominantTrait.color}}>share results</div>
            <div 
              className='bg-white px-5 py-3 rounded-3xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{ color: dominantTrait.color }}
              onClick={handleClick}
            >
              retake test
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
