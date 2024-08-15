import React, { useState } from 'react';
import Draggable from 'react-draggable';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('0');
    const [memory, setMemory] = useState<number | null>(null);
    const [lastOperator, setLastOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

    const handleButtonClick = (value: string) => {
        if (['+', '-', '*', '/', '=', '√', '1/x'].includes(value)) {
            handleOperator(value);
        } else if (value === 'C') {
            setDisplay('0');
            setLastOperator(null);
            setWaitingForOperand(false);
        } else if (value === 'CE') {
            setDisplay('0');
        } else if (value === 'MC') {
            setMemory(null);
        } else if (value === 'MR') {
            if (memory !== null) {
                setDisplay(memory.toString());
                setWaitingForOperand(true);
            }
        } else if (value === 'M+') {
            setMemory((memory || 0) + parseFloat(display));
        } else if (value === 'M-') {
            setMemory((memory || 0) - parseFloat(display));
        } else if (value === '±') {
            setDisplay((parseFloat(display) * -1).toString());
        } else if (value === '.') {
            if (!display.includes('.')) {
                setDisplay(display + '.');
            }
        } else if (value === '←') {
            if (display.length > 1) {
                setDisplay(display.slice(0, -1));
            } else {
                setDisplay('0');
            }
        } else {
            if (waitingForOperand) {
                setDisplay(value);
                setWaitingForOperand(false);
            } else {
                setDisplay(display === '0' ? value : display + value);
            }
        }
    };

    const handleOperator = (operator: string) => {
        const current = parseFloat(display);

        if (operator === '√') {
            setDisplay(Math.sqrt(current).toString());
            return;
        }

        if (operator === '1/x') {
            setDisplay((1 / current).toString());
            return;
        }

        if (lastOperator) {
            const result = calculateResult(current);
            setDisplay(result.toString());
            setMemory(result);
        } else {
            setMemory(current);
        }

        setLastOperator(operator);
        setWaitingForOperand(true);
    };

    const calculateResult = (current: number) => {
        if (memory === null) return current;

        switch (lastOperator) {
            case '+':
                return memory + current;
            case '-':
                return memory - current;
            case '*':
                return memory * current;
            case '/':
                return memory / current;
            default:
                return current;
        }
    };

    return (
        <Draggable>
            <div className="calculator bg-gray-100 p-4 rounded-lg shadow-md w-64 cursor-move">
                <div className="display bg-white dark:text-black p-2 mb-4 text-right text-2xl font-mono border border-gray-300 rounded">
                    {display}
                </div>
                <div className="buttons grid grid-cols-4 gap-2 dark:text-black">
                    <button onClick={() => handleButtonClick('MC')} className="bg-blue-500 text-white p-2 rounded">MC</button>
                    <button onClick={() => handleButtonClick('MR')} className="bg-blue-500 text-white p-2 rounded">MR</button>
                    <button onClick={() => handleButtonClick('M+')} className="bg-blue-500 text-white p-2 rounded">M+</button>
                    <button onClick={() => handleButtonClick('M-')} className="bg-blue-500 text-white p-2 rounded">M-</button>

                    <button onClick={() => handleButtonClick('CE')} className="bg-red-500 text-white p-2 rounded">CE</button>
                    <button onClick={() => handleButtonClick('C')} className="bg-red-500 text-white p-2 rounded">C</button>
                    <button onClick={() => handleButtonClick('←')} className="bg-blue-500 text-white p-2 rounded">←</button>
                    <button onClick={() => handleButtonClick('/')} className="bg-blue-500 text-white p-2 rounded">÷</button>

                    <button onClick={() => handleButtonClick('7')} className="bg-gray-200 p-2 rounded">7</button>
                    <button onClick={() => handleButtonClick('8')} className="bg-gray-200 p-2 rounded">8</button>
                    <button onClick={() => handleButtonClick('9')} className="bg-gray-200 p-2 rounded">9</button>
                    <button onClick={() => handleButtonClick('*')} className="bg-blue-500 text-white p-2 rounded">×</button>

                    <button onClick={() => handleButtonClick('4')} className="bg-gray-200 p-2 rounded">4</button>
                    <button onClick={() => handleButtonClick('5')} className="bg-gray-200 p-2 rounded">5</button>
                    <button onClick={() => handleButtonClick('6')} className="bg-gray-200 p-2 rounded">6</button>
                    <button onClick={() => handleButtonClick('-')} className="bg-blue-500 text-white p-2 rounded">-</button>

                    <button onClick={() => handleButtonClick('1')} className="bg-gray-200 p-2 rounded">1</button>
                    <button onClick={() => handleButtonClick('2')} className="bg-gray-200 p-2 rounded">2</button>
                    <button onClick={() => handleButtonClick('3')} className="bg-gray-200 p-2 rounded">3</button>
                    <button onClick={() => handleButtonClick('+')} className="bg-blue-500 text-white p-2 rounded">+</button>

                    <button onClick={() => handleButtonClick('±')} className="bg-gray-200 p-2 rounded">±</button>
                    <button onClick={() => handleButtonClick('0')} className="bg-gray-200 p-2 rounded">0</button>
                    <button onClick={() => handleButtonClick('.')} className="bg-gray-200 p-2 rounded">.</button>
                    <button onClick={() => handleButtonClick('=')} className="bg-green-500 text-white p-2 rounded">=</button>
                </div>
            </div>
        </Draggable>
    );
};

export default Calculator;
