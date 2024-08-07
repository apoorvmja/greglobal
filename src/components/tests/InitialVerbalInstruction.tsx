import TestLayout from './TestLayout';

interface Props {
    onContinue: () => void;
}

const InitialVerbalInstructions: React.FC<Props> = ({ onContinue }) => {
    return (
        <TestLayout currentSection="Verbal Section Instructions" onContinue={onContinue}>
            <div className="verbal-instructions">
                <h1>Verbal Section Instructions</h1>
                <p>12 Questions</p>
                <p>18 Minutes</p>
                <p>
                    For each question indicate the best answer using the directions given. If you need more detailed directions, click
                    Help at any time. If a question has answer choices with ovals , then the correct answer consists of a single
                    choice. If a question has answer choices with square boxes , then the correct answer consists of one or more answer
                    choices. Read the directions for each question carefully.
                </p>
                <p>Click Continue to proceed.</p>
            </div>
            <style jsx>{`
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
      `}</style>
        </TestLayout>
    );
};

export default InitialVerbalInstructions;
