import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WhatIfAnalysis = ({ windowWidth, scenarioAnalysis, getChartHeight }) => {
  // Always declare hooks at the top level
  const [selectedScenario, setSelectedScenario] = useState(0);
  
  // Add null check for scenarioAnalysis
  if (!scenarioAnalysis || !Array.isArray(scenarioAnalysis) || scenarioAnalysis.length === 0) {
    return (
      <div className="card mb-6 animate-fade-in">
        <div className="card-header">
          <h2 className="text-lg md:text-xl font-semibold">What-If Scenario Analysis</h2>
        </div>
        <div className="card-body">
          <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
            No scenario analysis data available.
          </p>
        </div>
      </div>
    );
  }

  // Transform the data to match the expected format if needed
  const formattedScenarios = scenarioAnalysis.map(scenario => {
    // Check if the data is already in the expected format
    if (scenario.name && scenario.description && scenario.advantages && scenario.risks && scenario.outcomes) {
      return scenario;
    }
    
    // Otherwise, transform the data
    return {
      name: scenario.scenario || 'Unknown Scenario',
      description: `This scenario analyzes the impact of a ${scenario.scenario || 'unknown'} strategy on match outcomes.`,
      advantages: [
        `Increases win probability to ${scenario.winProb || 0}%`,
        `Reduces loss probability to ${scenario.lossProb || 0}%`,
        'Provides tactical flexibility during the match'
      ],
      risks: [
        'May require specific player positioning',
        'Effectiveness depends on opponent adaptability',
        'Requires precise execution from the team'
      ],
      outcomes: [
        { name: 'Win', probability: scenario.winProb || 0 },
        { name: 'Draw', probability: scenario.drawProb || 0 },
        { name: 'Loss', probability: scenario.lossProb || 0 }
      ]
    };
  });
  
  // Get the current scenario data
  const currentScenario = formattedScenarios[selectedScenario];
  
  return (
    <div className="card mb-6 animate-fade-in">
      <div className="card-header">
        <h2 className="text-lg md:text-xl font-semibold">What-If Scenario Analysis</h2>
      </div>
      
      <div className="card-body">
        <div className="mb-4">
          <label htmlFor="scenarioSelect" className="form-label">Select Scenario:</label>
          <select
            id="scenarioSelect"
            className="form-select"
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(parseInt(e.target.value))}
          >
            {formattedScenarios.map((scenario, index) => (
              <option key={index} value={index}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
          <h3 className="font-semibold mb-2 text-sm md:text-base" style={{ color: 'var(--color-primary-700)' }}>
            {currentScenario.name}
          </h3>
          <p className="text-sm mb-3" style={{ color: 'var(--color-neutral-600)' }}>
            {currentScenario.description}
          </p>
          
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'white' }}>
                <h4 className="text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Advantages</h4>
                <ul className="space-y-2">
                  {currentScenario.advantages.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-success)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-xs md:text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 px-2">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'white' }}>
                <h4 className="text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--color-primary-600)' }}>Risks</h4>
                <ul className="space-y-2">
                  {currentScenario.risks.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-error)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <span className="text-xs md:text-sm" style={{ color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-sm md:text-base" style={{ color: 'var(--color-primary-700)' }}>
            Outcome Probabilities
          </h3>
          
          <ResponsiveContainer width="100%" height={getChartHeight(windowWidth, 'small')}>
            <BarChart
              data={currentScenario.outcomes}
              margin={{ 
                top: 5, 
                right: windowWidth < 480 ? 10 : (windowWidth < 640 ? 15 : 30), 
                left: windowWidth < 480 ? 5 : (windowWidth < 640 ? 10 : 20), 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
              <XAxis 
                dataKey="name" 
                tick={{
                  fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                  fill: 'var(--color-neutral-600)'
                }} 
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{
                  fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                  fill: 'var(--color-neutral-600)'
                }} 
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Probability']}
                contentStyle={{
                  backgroundColor: 'var(--color-neutral-800)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  color: 'white'
                }}
              />
              <Legend 
                wrapperStyle={{
                  fontSize: windowWidth < 480 ? 8 : (windowWidth < 640 ? 10 : 12),
                  color: 'var(--color-neutral-700)'
                }} 
              />
              <Bar 
                dataKey="probability" 
                name="Probability %" 
                fill="var(--color-primary-500)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WhatIfAnalysis;
