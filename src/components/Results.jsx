import React from 'react';
import traits from '../data/traits';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';




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

  // Step 4: Map top 8 traits to tiered percentages
  const topTraits = sortedTraits.slice(0, 8).map(([trait], index) => {
    const [min, max] = percentageBands[index] || [10, 20];
    const percent = index === 0 ? 100 : Math.floor(Math.random() * (max - min + 1)) + min;
    return { trait, percent };
  });

  const dominantTrait = topTraits[0];
  // bar colors

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


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Personality Result</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={topTraits}
          layout="vertical"
          margin={{ top: 20, right: 50, left: 80, bottom: 20 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          
          <YAxis
            dataKey="trait"
            type="category"
            tick={{ fontSize: 14 }}
            width={100}
          />
          <Tooltip
            formatter={(value) => `${value}%`}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
          />

          <Bar dataKey="percent" barSize={20}>
            {topTraits.map((_, index) => (                 //the first argument _ is intentionally unused
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
           <LabelList dataKey="percent" position="right" formatter={(value) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>


      <div className="mt-6 bg-indigo-100 p-4 rounded-lg text-indigo-800 font-semibold">
      <h3 className="text-xl mb-2">{traits[dominantTrait.trait]?.title}</h3>
      <p className="text-sm font-normal text-gray-700">
        {traits[dominantTrait.trait]?.description}
      </p>
      </div>

    </div>
  );
}

export default Results;
