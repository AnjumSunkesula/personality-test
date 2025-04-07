import React from 'react';
import traits from '../data/traits';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';



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
    [100, 100],  // 1st place fixed at 100%
    [80, 90],    // 2nd
    [70, 80],    // 3rd
    [60, 70],    // 4th
    [50, 60],    // 5th
    [40, 50],    // 6th
    [30, 40],    // 7th
    [20, 30],    // 8th
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

  const dominantTrait = topTraits[0];


  


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">

      <div className='bg-white rounded-xl pr-10 pl-5 w-full max-w-2xl'>
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
            interval={0}
          />
          
          <YAxis
            dataKey="trait"
            type="category"
            tick={{ fontSize: 14 }}
            width={100}
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


      <div className="mt-6 bg-indigo-100 p-10 rounded-xl text-indigo-800 font-semibold w-full max-w-2xl">
      <h3 className="text-4xl mb-2 text-center text-white font-bold">{traits[dominantTrait.trait]?.title}</h3>
      <p className="text-sm font-normal text-white">
        {traits[dominantTrait.trait]?.description}
      </p>
      </div>

    </div>
  );
}

export default Results;
