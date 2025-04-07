import React from 'react';
import traits from '../data/traits';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';




function Results() {
  const { state } = useLocation();
  const answers = state?.answers || [];

  // Count how many times each trait appears
  const traitCounts = {};
  answers.forEach(answer => {
    const trait = answer.trait;
    if (trait) {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    }
  });

  


  // Convert to percentages
  const total = answers.length;
  const traitPercentages = Object.entries(traitCounts).map(([trait, count]) => ({
    trait,
    percent: Math.round((count / total) * 100)
  }));

  // Find the top trait
  const dominantTrait = traitPercentages.reduce((max, curr) =>
  curr.percent > max.percent ? curr : max, traitPercentages[0]);

  // Sort traits by dominance
  // traitPercentages.sort((a, b) => b.percent - a.percent);

  // // Get top trait
  // const dominantTrait = traitPercentages[0];

  // Sort traits by percentage in descending order and get top 8
const topTraits = [...traitPercentages]
  .sort((a, b) => b.percent - a.percent)
  .slice(0, 8);



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
