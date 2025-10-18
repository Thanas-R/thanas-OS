import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (equation === '') {
      setEquation(`${inputValue} ${nextOperator}`);
    } else {
      const parts = equation.split(' ');
      const prevValue = parseFloat(parts[0]);
      const operator = parts[1];
      
      let newValue = prevValue;
      
      switch (operator) {
        case '+':
          newValue = prevValue + inputValue;
          break;
        case '-':
          newValue = prevValue - inputValue;
          break;
        case '×':
          newValue = prevValue * inputValue;
          break;
        case '÷':
          newValue = prevValue / inputValue;
          break;
      }
      
      setDisplay(String(newValue));
      setEquation(nextOperator === '=' ? '' : `${newValue} ${nextOperator}`);
    }
    
    setWaitingForOperand(true);
  };

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleClick = (btn: string) => {
    if (btn === 'AC') clear();
    else if (btn === '±') setDisplay(String(parseFloat(display) * -1));
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
    else if (['+', '-', '×', '÷', '='].includes(btn)) performOperation(btn);
    else if (btn === '.') inputDecimal();
    else inputDigit(btn);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-8 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-sm backdrop-blur-macos-heavy rounded-3xl p-6 shadow-macos-glass"
        style={{
          background: 'hsl(var(--macos-glass))',
          border: '1px solid hsl(var(--macos-glass-border))',
        }}
      >
        {/* Display */}
        <div className="mb-6 p-6 rounded-2xl bg-black/10 backdrop-blur-sm">
          {equation && (
            <div className="text-sm text-muted-foreground mb-1 text-right font-mono">
              {equation}
            </div>
          )}
          <div className="text-4xl font-light text-right font-mono tabular-nums truncate">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid gap-3">
          {buttons.map((row, i) => (
            <div key={i} className="grid gap-3" style={{ gridTemplateColumns: row.length === 3 ? '2fr 1fr 1fr' : 'repeat(4, 1fr)' }}>
              {row.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  variant={['÷', '×', '-', '+', '='].includes(btn) ? 'default' : 'outline'}
                  className={`h-16 text-xl font-medium backdrop-blur-sm ${
                    ['÷', '×', '-', '+', '='].includes(btn) ? 'bg-primary/80' : 'bg-background/40'
                  } hover:scale-105 transition-transform`}
                  style={{ gridColumn: btn === '0' ? 'span 2' : undefined }}
                >
                  {btn === 'AC' ? <Delete className="w-5 h-5" /> : btn}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
