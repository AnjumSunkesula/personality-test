import React, {useState, useEffect} from 'react';
import traits from '../data/traits';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
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
  
    const barColors = [
      "#ec4899", // pink
      "#f97316", // orange
      "#facc15", // yellow
      "#ef4444", // red
      "#14b8a6", // teal
      "#8b5cf6", // purple
      "#f472b6", // light pink
      "#22d3ee", // cyan
    ];

  // Step 4: Map top 8 traits to tiered percentages
  const topTraits = sortedTraits.slice(0, 8).map(([trait], index) => {
    const [min, max] = percentageBands[index] || [10, 20];
    const percent = index === 0 ? 100 : Math.floor(Math.random() * (max - min + 1)) + min;
    return { 
      trait, 
      percent,
      color: barColors[index % barColors.length],
    };
  });

 const topTraitsWithDescriptions = topTraits.filter(t => traits[t.trait]);
  const dominantTrait = topTraitsWithDescriptions[0];


  const traitGradients = {
  introvert: "bg-gradient-to-r from-blue-100 to-blue-300",
  extrovert: "bg-gradient-to-r from-pink-600 via-pink-400 to-pink-200",
  analytical: "bg-gradient-to-r from-yellow-100 to-yellow-300",
  creative: "bg-gradient-to-r from-purple-100 to-purple-300",
  adaptable: "bg-gradient-to-r from-teal-100 to-teal-300",
  structured: "bg-gradient-to-r from-orange-100 to-orange-300",
  empathetic: "bg-gradient-to-r from-cyan-800 to-cyan-400"
};





  


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen gap-5">

      <div className='bg-white rounded-xl pr-10 pl-5 w-full max-w-3xl'>
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

          <Bar dataKey="percent" barSize={25}>
            {topTraits.map((_, index) => (                 //the first argument _ is intentionally unused
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
           {/* <LabelList dataKey="percent" position="right" formatter={(value) => `${value}%`} /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>


      <div className={`bg-indigo-100 p-10 rounded-xl  font-semibold w-full max-w-3xl ${traitGradients[dominantTrait.trait]}`}>
        <h3 className="text-4xl mb-2 text-center text-white font-bold">{traits[dominantTrait.trait]?.title}</h3>
        <p className="text-lg font-normal text-white" style={{ fontFamily: "Poppins"}}>
          {traits[dominantTrait.trait]?.description}
        </p>
      </div>

      <div className='flex justify-between items-center w-full max-w-3xl '>
        <div className='bg-white px-5 py-2 rounded-xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{color: dominantTrait.color}}>share results</div>
        <div 
          className='bg-white px-5 py-2 rounded-xl shadow-md capitalize cursor-pointer hover:-translate-y-1 ease-in-out duration-400' style={{color: dominantTrait.color}}
          onClick={handleClick}
        >
          retake test
        </div>
        

      </div>

    </div>
  );
}

export default Results;
