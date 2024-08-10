// src/components/tests/InitialTestDetails.tsx
import TestLayout from './TestLayout';
import TestInstructions from './TestInstructions';

interface Test {
    id: string;
    name: string;
    description: string;
    timeLimits: {
        verbal1: number;
        verbal2: number;
        quantitative1: number;
        quantitative2: number;
        awa: number;
    };
}

interface Props {
    test: Test;
    onContinue: () => void;
}

const InitialTestDetails: React.FC<Props> = ({ test, onContinue }) => {
    return (
        <TestLayout currentSection="Test Details" onContinue={onContinue}>
            <div>
                <h1 className='dark:text-black'>{test.name}</h1>
                <TestInstructions />
            </div>
        </TestLayout>
    );
};

export default InitialTestDetails;
