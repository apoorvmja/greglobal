import { useState } from 'react';
import TestLayout from './TestLayout';

interface OptionsMap {
    [key: string]: string[];
}

interface VerbalQuestion {
    type: 'text_completion' | 'sentence_equivalence' | 'reading_comprehension' | 'reading_comprehension_multiple' | 'reading_comprehension_select' | 'reading_comprehension_highlighted';
    questionText: string;
    passage?: string;
    options?: OptionsMap | string[];
    highlighted?: string[];
    correctAnswer: string | string[];
    blanks?: number;
}

interface VerbalTest {
    sections: {
        verbal1: { [key: string]: VerbalQuestion };
        verbal2: { [key: string]: VerbalQuestion };
    };
}

interface Props {
    test: VerbalTest;
    section: 'verbal1' | 'verbal2';
    onContinue: () => void;
    onBack: () => void;
}

const Verbal: React.FC<Props> = ({ test, section, onContinue, onBack }) => {
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedSentence, setSelectedSentence] = useState<string | null>(null);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedSentence(null); // Reset selected sentence
        } else {
            onContinue();
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedSentence(null); // Reset selected sentence
        }
    };

    const handleExitSection = () => {
        onContinue(); // Navigate to the next section
    };

    const handleSentenceClick = (sentence: string) => {
        setSelectedSentence(sentence);
    };

    const renderTextCompletion = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            <div className='flex flex-row gap-10 justify-center items-center mt-10'>
                {question.blanks && question.blanks > 1 ? (
                    Array.from({ length: question.blanks }, (_, blankIndex) => (
                        <div key={blankIndex} className="mb-2">
                            <p>{`Blank ${blankIndex + 1}:`}</p>
                            <div className="flex flex-col items-center mt-4">
                                {(question.options as OptionsMap)?.[`blank${blankIndex + 1}`]?.map((option, optIdx) => (
                                    <label key={optIdx} className="min-w-[200px] p-4 border border-black text-center cursor-pointer bg-white hover:bg-gray-200">
                                        <input type="radio" name={`question-${index}-blank-${blankIndex}`} value={option} className="mr-2" /> {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center mt-4">
                        {(question.options as string[])?.map((option, idx) => (
                            <label key={idx} className="min-w-[200px] p-4 border border-black text-center cursor-pointer bg-white hover:bg-gray-200">
                                <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderSentenceEquivalence = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {(question.options as string[])?.map((option, idx) => (
                <div key={idx}>
                    <input type="checkbox" name={`question-${index}`} value={option} className="mr-2" /> {option}
                </div>
            ))}
        </div>
    );

    const renderReadingComprehension = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.passage && <div className="border p-4 mb-4">{question.passage}</div>}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {(question.options as string[])?.map((option, idx) => (
                <div key={idx}>
                    <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                </div>
            ))}
        </div>
    );

    const renderReadingComprehensionMultiple = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.passage && <div className="border p-4 mb-4">{question.passage}</div>}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {(question.options as string[])?.map((option, idx) => (
                <div key={idx}>
                    <input type="checkbox" name={`question-${index}`} value={option} className="mr-2" /> {option}
                </div>
            ))}
        </div>
    );

    const renderReadingComprehensionSelect = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.passage && (
                <div className="border p-4 mb-4">
                    {question.passage.split('. ').map((sentence, idx) => (
                        <span
                            key={idx}
                            onClick={() => handleSentenceClick(sentence)}
                            className={`cursor-pointer ${selectedSentence === sentence ? 'bg-yellow-200' : ''}`}
                        >
                            {sentence}.{' '}
                        </span>
                    ))}
                </div>
            )}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
        </div>
    );

    const renderReadingComprehensionHighlighted = (question: VerbalQuestion, index: number) => {
        let highlightedPassage = question.passage || "";
        if (question.highlighted) {
            question.highlighted.forEach((highlight, idx) => {
                highlightedPassage = highlightedPassage.replace(`{{highlight${idx + 1}}}`, `<span class="bg-yellow-200">${highlight}</span>`);
            });
        }

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex">
                    <div className="w-1/2 p-4 border-r">
                        <p dangerouslySetInnerHTML={{ __html: highlightedPassage }}></p>
                    </div>
                    <div className="w-1/2 p-4">
                        {(question.options as string[])?.map((option, idx) => (
                            <div key={idx}>
                                <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <TestLayout
            currentSection={`Verbal Section ${section === 'verbal1' ? 1 : 2}`}
            onContinue={handleNext}
            onExitSection={handleExitSection}
            onBack={handleBack}
            showVerbalButtons={true}
            verbalSection={section}
        >
            <div className="min-h-[50vh] w-full">
                {currentQuestion && (
                    <>
                        {currentQuestion.type === 'text_completion' && renderTextCompletion(currentQuestion, currentQuestionIndex)}
                        {currentQuestion.type === 'sentence_equivalence' && renderSentenceEquivalence(currentQuestion, currentQuestionIndex)}
                        {currentQuestion.type === 'reading_comprehension' && renderReadingComprehension(currentQuestion, currentQuestionIndex)}
                        {currentQuestion.type === 'reading_comprehension_multiple' && renderReadingComprehensionMultiple(currentQuestion, currentQuestionIndex)}
                        {currentQuestion.type === 'reading_comprehension_select' && renderReadingComprehensionSelect(currentQuestion, currentQuestionIndex)}
                        {currentQuestion.type === 'reading_comprehension_highlighted' && renderReadingComprehensionHighlighted(currentQuestion, currentQuestionIndex)}
                    </>
                )}
            </div>
        </TestLayout>
    );
};

export default Verbal;
