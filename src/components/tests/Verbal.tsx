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
    correctAnswer: string | string[] | (string | string[])[][]; // Update to support complex nested arrays
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
    onContinue: (score: number) => void;
    onBack: () => void;
}

const Verbal: React.FC<Props> = ({ test, section, onContinue, onBack }) => {
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | string[] }>({});
    const [selectedSentence, setSelectedSentence] = useState<string | null>(null);

    const handleNext = () => {
        const score = calculateScore();
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            // setSelectedSentence(null);
        } else {
            onContinue(score);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            // setSelectedSentence(null);
        }
    };

    const handleAnswerChange = (questionIndex: number, blankIndex: number, answer: string) => {
        const currentAnswers = selectedAnswers[questionIndex] as string[] || [];

        const newAnswers = [...currentAnswers];
        newAnswers[blankIndex] = answer;

        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: newAnswers,
        });
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const userAnswer = selectedAnswers[index];

            // console.log(`Question ${index + 1}:`);
            // console.log('User Answer:', userAnswer);
            // console.log('Correct Answer:', question.correctAnswer);

            if (Array.isArray(question.correctAnswer)) {
                // Handle multi-part answers
                if (Array.isArray(userAnswer)) {
                    const correctAnswerString = question.correctAnswer.map(ans => ans.toString().trim()).join('|');
                    const userAnswerString = userAnswer.map(ans => ans.toString().trim()).join('|');

                    if (correctAnswerString === userAnswerString) {
                        score++;
                    } else {
                        // console.log('Mismatch or missing parts in user answer');
                    }
                } else {
                    // console.log('User answer is not an array');
                }
            } else {
                // Handle single-part answers
                if (userAnswer === question.correctAnswer) {
                    score++;
                } else {
                    // console.log('Incorrect single-part answer');
                }
            }
        });
        console.log(`Score for ${section}:`, score);
        return score;
    };

    const handleSentenceClick = (sentence: string) => {
        setSelectedSentence(sentence);
        // Optionally store the selection in selectedAnswers
    };

    const handleExitSection = () => {
        const score = calculateScore();
        onContinue(score);
    };

    const renderTextCompletion = (question: VerbalQuestion, index: number) => {
        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className='flex flex-col sm:flex-row gap-10 justify-center items-center mt-10'>
                    {question.blanks && question.blanks > 1 ? (
                        Array.from({ length: question.blanks }, (_, blankIndex) => (
                            <div key={blankIndex} className="mb-2">
                                <p>{`Blank ${blankIndex + 1}:`}</p>
                                <div className="flex flex-col items-center mt-4">
                                    {(question.options as OptionsMap)?.[`blank${blankIndex + 1}`]?.map((option, optIdx) => (
                                        <label key={optIdx} className="min-w-[200px] p-4 border border-black text-center cursor-pointer bg-white hover:bg-gray-200">
                                            <input
                                                type="radio"
                                                name={`question-${index}-blank-${blankIndex}`}
                                                value={option}
                                                className="mr-2"
                                                onChange={() => handleAnswerChange(index, blankIndex, option)}
                                                checked={!!selectedAnswers[index] && (selectedAnswers[index] as string[])[blankIndex] === option}
                                            /> {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center mt-4">
                            {(question.options as string[])?.map((option, idx) => {
                                const isChecked = selectedAnswers[index] && (selectedAnswers[index] as string[])[0] === option;

                                return (
                                    <label key={idx} className="min-w-[200px] p-4 border border-black text-center cursor-pointer bg-white hover:bg-gray-200">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            className="mr-2"
                                            onChange={() => handleAnswerChange(index, 0, option)}
                                            checked={isChecked || false}
                                        /> {option}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderSentenceEquivalence = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {(question.options as string[])?.map((option, idx) => {
                // Simplified check logic
                const isChecked = selectedAnswers[index] && (selectedAnswers[index] as string[]).includes(option);

                return (
                    <div key={idx}>
                        <input
                            type="checkbox"
                            name={`question-${index}`}
                            value={option}
                            className="mr-2"
                            onChange={(e) => {
                                const currentAnswers = selectedAnswers[index] as string[] || [];

                                let newAnswers;
                                if (e.target.checked) {
                                    newAnswers = [...currentAnswers, option];
                                } else {
                                    newAnswers = currentAnswers.filter(ans => ans !== option);
                                }

                                setSelectedAnswers({
                                    ...selectedAnswers,
                                    [index]: newAnswers,
                                });

                                // console.log(`New Answers for Question ${index + 1}:`, newAnswers); // Debugging output
                            }}
                            checked={isChecked || false}
                        /> {option}
                    </div>
                );
            })}
        </div>
    );

    const renderReadingComprehension = (question: VerbalQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        return (
            <div key={index} className="mb-4">
                {question.passage && <div className="border p-4 mb-4">{question.passage}</div>}
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                {(question.options as string[])?.map((option, idx) => {
                    const isChecked = selectedAnswer ? selectedAnswer.includes(option) : false;

                    return (
                        <div key={idx}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                className="mr-2"
                                onChange={() => handleAnswerChange(index, 0, option)}
                                checked={isChecked || false}
                            /> {option}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderReadingComprehensionMultiple = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.passage && <div className="border p-4 mb-4">{question.passage}</div>}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {(question.options as string[])?.map((option, idx) => {
                // Simplified check logic
                const isChecked = selectedAnswers[index] && (selectedAnswers[index] as string[]).includes(option);

                return (
                    <div key={idx}>
                        <input
                            type="checkbox"
                            name={`question-${index}`}
                            value={option}
                            className="mr-2"
                            onChange={(e) => {
                                const currentAnswers = selectedAnswers[index] as string[] || [];

                                let newAnswers;
                                if (e.target.checked) {
                                    newAnswers = [...currentAnswers, option];
                                } else {
                                    newAnswers = currentAnswers.filter(ans => ans !== option);
                                }

                                setSelectedAnswers({
                                    ...selectedAnswers,
                                    [index]: newAnswers,
                                });

                                // console.log(`New Answers for Question ${index + 1}:`, newAnswers); // Debugging output
                            }}
                            checked={isChecked || false}
                        /> {option}
                    </div>
                );
            })}
        </div>
    );

    const renderReadingComprehensionSelect = (question: VerbalQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.passage && (
                <div className="border p-4 mb-4">
                    {question.passage.split('. ').map((sentence, idx) => (
                        <span
                            key={idx}
                            onClick={() => {
                                handleSentenceClick(sentence);
                                handleAnswerChange(index, 0, sentence);
                            }}
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

        // Retrieve the selected answer for this question, if any
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        // console.log(`Rendering question ${index + 1} with selected answer: ${selectedAnswer}`);

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/2 p-4 border-b sm:border-r">
                        <p dangerouslySetInnerHTML={{ __html: highlightedPassage }}></p>
                    </div>
                    <div className="sm:w-1/2 p-4">
                        {(question.options as string[])?.map((option, idx) => {
                            const isChecked = selectedAnswer ? selectedAnswer.includes(option) : false;
                            // console.log(`selectedAnswer: ${selectedAnswer} Option: ${option}, isChecked: ${isChecked}`);

                            return (
                                <div key={idx}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        className="mr-2"
                                        onChange={() => handleAnswerChange(index, 0, option)}
                                        checked={isChecked}
                                    /> {option}
                                </div>
                            );
                        })}
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
            <div className="min-h-[50vh] w-full dark:text-black">
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
