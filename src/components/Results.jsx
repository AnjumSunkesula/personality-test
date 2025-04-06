import React from 'react';
import traits from '../data/traits';
import { useLocation } from 'react-router-dom';
// import traitDescriptions from '../data/traits';

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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Personality Result</h2>

      {traitPercentages.map(({ trait, percent }) => (
        <div key={trait} className="mb-4">
          <p className="capitalize mb-1">{trait} ({percent}%)</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-500 h-4 rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      ))}

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
