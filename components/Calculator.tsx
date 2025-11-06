
import React, { useState, useCallback } from 'react';
import Display from './Display';
import CalcButton from './Button';
import { ButtonType } from '../types';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true);

  const calculate = useCallback((): string => {
    if (!previousValue || !operator) return currentValue;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return 'Error';

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) return 'Error';
        result = prev / current;
        break;
      default:
        return 'Error';
    }
    return result.toString();
  }, [currentValue, previousValue, operator]);

  const handleButtonClick = (type: ButtonType, value: string) => {
    if (currentValue === 'Error' && value !== 'AC') return;

    switch (type) {
      case ButtonType.NUMBER:
        handleNumber(value);
        break;
      case ButtonType.OPERATOR:
        handleOperator(value);
        break;
      case ButtonType.FUNCTION:
        handleFunction(value);
        break;
      case ButtonType.EQUALS:
        handleEquals();
        break;
    }
  };
  
  const handleNumber = (value: string) => {
    if (value === '.' && currentValue.includes('.')) return;
    
    if (overwrite) {
      setCurrentValue(value);
      setOverwrite(false);
    } else {
      if(currentValue.length >= 10) return;
      setCurrentValue(currentValue === '0' && value !== '.' ? value : currentValue + value);
    }
  };

  const handleOperator = (value: string) => {
    if (previousValue !== null && operator && !overwrite) {
        const result = calculate();
        setCurrentValue(result);
        setPreviousValue(result);
    } else {
        setPreviousValue(currentValue);
    }
    setOperator(value);
    setOverwrite(true);
  };
  
  const handleEquals = () => {
    if (operator && previousValue !== null) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(null);
      setOperator(null);
      setOverwrite(true);
    }
  };

  const handleFunction = (value: string) => {
    switch (value) {
      case 'AC':
        setCurrentValue('0');
        setPreviousValue(null);
        setOperator(null);
        setOverwrite(true);
        break;
      case '±':
        setCurrentValue((parseFloat(currentValue) * -1).toString());
        break;
      case '%':
        setCurrentValue((parseFloat(currentValue) / 100).toString());
        break;
    }
  };
  
  const buttonLayout = [
    { value: 'AC', type: ButtonType.FUNCTION, style: 'bg-slate-500 hover:bg-slate-400' },
    { value: '±', type: ButtonType.FUNCTION, style: 'bg-slate-500 hover:bg-slate-400' },
    { value: '%', type: ButtonType.FUNCTION, style: 'bg-slate-500 hover:bg-slate-400' },
    { value: '÷', type: ButtonType.OPERATOR, style: 'bg-amber-500 hover:bg-amber-400' },
    { value: '7', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '8', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '9', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '×', type: ButtonType.OPERATOR, style: 'bg-amber-500 hover:bg-amber-400' },
    { value: '4', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '5', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '6', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '-', type: ButtonType.OPERATOR, style: 'bg-amber-500 hover:bg-amber-400' },
    { value: '1', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '2', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '3', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '+', type: ButtonType.OPERATOR, style: 'bg-amber-500 hover:bg-amber-400' },
    { value: '0', type: ButtonType.NUMBER, style: 'col-span-2 bg-slate-700 hover:bg-slate-600' },
    { value: '.', type: ButtonType.NUMBER, style: 'bg-slate-700 hover:bg-slate-600' },
    { value: '=', type: ButtonType.EQUALS, style: 'bg-amber-500 hover:bg-amber-400' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-900/50 p-4 sm:p-6 space-y-4 border border-slate-700/50">
      <Display value={currentValue} />
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {buttonLayout.map((btn) => (
          <CalcButton
            key={btn.value}
            value={btn.value}
            onClick={() => handleButtonClick(btn.type, btn.value)}
            className={btn.style}
            span={btn.style.includes('col-span-2')}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
