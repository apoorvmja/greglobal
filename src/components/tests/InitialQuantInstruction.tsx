// src/components/InitialAWAInstructions.tsx
import TestLayout from './TestLayout';

interface Props {
    onContinue: () => void;
}

const InitialAWAInstructions: React.FC<Props> = ({ onContinue }) => {
    return (
        <TestLayout currentSection="Analytical Writing: Issue Essay" onContinue={onContinue}>
            <div className='min-h-[50vh] dark:text-black'>
                <h1>Quant Introduction</h1>
                <p>In this section, you will be given a brief statement on an issue of general interest and instructions on how to respond to the issue. You can discuss the issue from any perspective, making use of your own educational and personal background, examples from current or historical events, material that you’ve read, or even hypothetical situations. For this essay, you will develop your own argument.</p>
            </div>
        </TestLayout>
    );
};

export default InitialAWAInstructions;