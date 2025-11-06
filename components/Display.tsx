
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  // Function to format the number for better readability
  const formatDisplayValue = (val: string): string => {
    if (val === 'Error') return 'Error';
    if (val.length > 10) {
      try {
        const num = parseFloat(val);
        return num.toExponential(5);
      } catch {
        return 'Error';
      }
    }
    return val;
  };

  const displayValue = formatDisplayValue(value);
  const textSizeClass = displayValue.length > 7 ? 'text-5xl' : 'text-7xl';


  return (
    <div className="bg-slate-900/60 rounded-xl p-4 mb-4 text-right overflow-hidden h-28 flex items-end justify-end">
      <h1 className={`text-white font-light transition-all duration-200 ${textSizeClass} break-all`}>
        {displayValue}
      </h1>
    </div>
  );
};

export default Display;
