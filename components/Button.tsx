
import React from 'react';

interface ButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  span?: boolean;
}

const CalcButton: React.FC<ButtonProps> = ({ value, onClick, className = '', span = false }) => {
  const baseClasses =
    'flex items-center justify-center text-white text-3xl font-medium rounded-full h-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500 transition-all duration-150 ease-in-out active:scale-95';
  
  const spanClass = span ? 'w-full' : 'w-20';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${spanClass} ${className}`}
    >
      {value}
    </button>
  );
};

export default CalcButton;
