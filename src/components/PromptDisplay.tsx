
import React from 'react';

interface PromptDisplayProps {
  prompt: string;
  isCorrect: boolean | null;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, isCorrect }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-2">Draw a:</h2>
      <div className="inline-block bg-white rounded-full px-8 py-3 text-3xl font-bold shadow-md border-2 border-gray-200">
        {prompt}
      </div>
      
      {isCorrect !== null && (
        <div className={`mt-4 text-xl font-bold ${isCorrect ? 'text-success' : 'text-secondary'}`}>
          {isCorrect ? 'Correct! Great job!' : 'Not quite! Try again.'}
        </div>
      )}
    </div>
  );
};

export default PromptDisplay;
