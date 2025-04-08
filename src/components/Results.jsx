import React, {useState, useEffect} from 'react';
import traits from '../data/traits';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';
import confetti from 'canvas-confetti';


function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload; // Contains trait, percent, color
    const color = item.color || "#ccc"; // Fallback if color not found
    return (
      <div className="relative bg-black text-white shadow-md  rounded-sm p-1 text-sm">
        {/* Arrow */}
        <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-black"></div>

        {/* Content */}
        <div className="flex items-center space-x-2">
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

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



  const traitScores = {};
  answers.forEach(answer => {
    const trait = answer.trait;
    if (trait) {
      traitScores[trait] = (traitScores[trait] || 0) + 5;
    }
  });

  // Step 2: Sort by score (descending)
  const sortedTraits = Object.entries(traitScores).sort((a, b) => b[1] - a[1]);

  // Step 3: Define percentage bands based on rank
  const percentageBands = [
    [100, 100], 
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
      intuitive:'#f472b6' ,
      collaborative: '#22d3ee',
      creative: '#38bdf8',
      resilient: '#84cc16',
      organized: '#fb7185',
      flexible: '#6366f1',
      sensitive: '#10b981',
      selfAware: '#64748b',
      rational: '#2dd4bf',
      assertive: '#fb923c',
      analytical: '#e9d5ff',
      social: '#fbcfe8',
      structured: '#bbf7d0',
      practical: '#bae6fd',
      methodical: '#fde68a',
      adaptive: '#6b7280',
      strategic: '#166534',
      optimistic: '#f5deb3',
      communicative: '#a3a3a3',
      spontaneous: '#c084fc',
      ambitious: '#e0bbeb',
      curious: '#a7c7e7',
    };

  // Step 4: Map top 8 traits to tiered percentages
  const topTraits = sortedTraits.slice(0, 8).map(([trait], index) => {
    const [min, max] = percentageBands[index] || [10, 20];
    const percent = index === 0 ? 100 : Math.floor(Math.random() * (max - min + 1)) + min;
    const color = barColors[trait] || getRandomColor();
    return { 
      trait, 
      percent,
      color
    };
  });

 const topTraitsWithDescriptions = topTraits.filter(t => traits[t.trait]);
  const dominantTrait = topTraitsWithDescriptions[0];


  


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


      <div 
        className={`overflow-hidden bg-indigo-100 p-10 rounded-xl  font-semibold w-full max-w-3xl 
        relative before:absolute before:inset-0 before:rounded-[inherit] 
        before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%)] 
        before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat 
        before:animate-[continuous-shine_2.5s_linear_infinite]`}
        style={{
          background: `linear-gradient(to right, ${topTraits[0].color}, ${topTraits[topTraits.length - 1].color})`
        }}
      >
        <h3 className="text-4xl mb-2 text-center text-white font-bold">{traits[dominantTrait.trait]?.title}</h3>
        <p className="text-lg font-normal text-white text-center" style={{ fontFamily: "Poppins"}}>
          {traits[dominantTrait.trait]?.description}
        </p>
      </div>

      <div className='flex justify-around items-center w-full max-w-3xl'>
        
    

        <div className='bg-white px-5 py-3 rounded-3xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{color: dominantTrait.color}}>share results</div>
        <div 
          className='bg-white px-5 py-3 rounded-3xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{color: dominantTrait.color}}
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
