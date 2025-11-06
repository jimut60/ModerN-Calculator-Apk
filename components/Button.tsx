
import React from 'react';

interface ButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
}

const CalcButton: React.FC<ButtonProps> = ({ value, onClick, className = '' }) => {
  const baseClasses =
    'flex items-center justify-center text-white text-3xl font-medium rounded-full aspect-square focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500 transition-all duration-150 ease-in-out active:scale-95';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {value}
    </button>
  );
};

export default CalcButton;
