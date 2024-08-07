// src/components/tests/Quantitative.tsx
import TestLayout from './TestLayout';

interface Question {
    type: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
}

interface Test {
    sections: {
        quantitative1: Question[];
        quantitative2: Question[];
    };
}

interface Props {
    test: Test;
    section: 'quantitative1' | 'quantitative2';
    onContinue: () => void;
}

const Quantitative: React.FC<Props> = ({ test, section, onContinue }) => {
    const questions = test.sections[section];

    return (
        <TestLayout currentSection={`Quantitative Section ${section === 'quantitative1' ? 1 : 2}`} onContinue={onContinue}>
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <p>{question.questionText}</p>
                        {question.options.map((option, idx) => (
                            <div key={idx}>
                                <input type="radio" name={`question-${index}`} value={option} /> {option}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </TestLayout>
    );
};

export default Quantitative;
