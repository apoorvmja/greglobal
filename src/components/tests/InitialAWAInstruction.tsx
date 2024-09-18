// src/components/InitialAWAInstructions.tsx
import TestLayout from './TestLayout';

interface Props {
    onContinue: () => void;
}

const InitialAWAInstructions: React.FC<Props> = ({ onContinue }) => {
    return (
        <TestLayout currentSection="Analytical Writing: Issue Essay" onContinue={onContinue}>
            <div className='min-h-[50vh]'>
                <div className='verbal-instructions dark:text-black'>
                    <h1>Analyze an Issue</h1>
                    <p>In this section, you will be given a brief statement on an issue of general interest and instructions on how to respond to the issue. You can discuss the issue from any perspective, making use of your own educational and personal background, examples from current or historical events, material that you’ve read, or even hypothetical situations. For this essay, you will develop your own argument.</p>
                    <p>The standard time for this section is 30 minutes.</p>
                </div>
            </div>
            <style jsx>
                {`
        .verbal-instructions {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
          margin-top: 20px;
        }
        .verbal-instructions h1 {
          margin-bottom: 15px;
        }
        .verbal-instructions p {
          margin-bottom: 10px;
        }
                `}
            </style>
        </TestLayout>
    );
};

export default InitialAWAInstructions;
