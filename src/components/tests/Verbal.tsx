// src/components/tests/Verbal.tsx
import TestLayout from './TestLayout';

interface OptionsMap {
    [key: string]: string[];
}

interface Question {
    type: string;
    questionText: string;
    options: OptionsMap | string[];
    correctAnswer: string | string[];
    blanks?: number;
}

interface Test {
    sections: {
        verbal1: Question[];
        verbal2: Question[];
    };
}

interface Props {
    test: Test;
    section: 'verbal1' | 'verbal2';
    onContinue: () => void;
}

const Verbal: React.FC<Props> = ({ test, section, onContinue }) => {
    const questions = test.sections[section];

    console.log("Questions:", questions); // Log the structure of questions

    if (!Array.isArray(questions)) {
        return <div>Error: Questions data is not an array.</div>;
    }

    return (
        <TestLayout currentSection={`Verbal Section ${section === 'verbal1' ? 1 : 2}`} onContinue={onContinue} showAWAButtons={true}>
            <div>
                {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                        {question.type === 'text_completion' && question.blanks ? (
                            Array.from({ length: question.blanks }, (_, blankIndex) => (
                                <div key={blankIndex} className="mb-2">
                                    <p>{`Blank ${blankIndex + 1}:`}</p>
                                    {(question.options as OptionsMap)[`blank${blankIndex + 1}`].map((option, optIdx) => (
                                        <div key={optIdx}>
                                            <input type="radio" name={`question-${index}-blank-${blankIndex}`} value={option} /> {option}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            (question.options as string[]).map((option, idx) => (
                                <div key={idx}>
                                    <input type="radio" name={`question-${index}`} value={option} /> {option}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </TestLayout>
    );
};

export default Verbal;
