import { useEffect, useState } from 'react';
import TestLayout from './TestLayout';
import { Button } from '../ui/button';

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
    explanation: string;
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
    onContinue: (score: number, reviewAnswers: { [key: number]: string | string[] }) => void;
    onBack: () => void;
    showResult?: () => void;
    isReviewModeResultDashboard?: boolean;
    selectedAnswersForVerbalReview?: { [key: number]: string | string[] }
    PageToVerbalForReviewAnswers?: { [key: number]: string | string[] }
}

const Verbal: React.FC<Props> = ({ test, section, onContinue, onBack, isReviewModeResultDashboard, selectedAnswersForVerbalReview, PageToVerbalForReviewAnswers, showResult }) => {
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | string[] }>({});
    const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State for managing modal visibility
    const [markedQuestions, setMarkedQuestions] = useState<number[]>([]); // Track marked questions
    const [selectedAnswersReviewResultDashboard, setSelectedAnswersReviewResultDashboard] = useState<{ [key: number]: string | string[] }>({});
    const [isAnswerToggled, setIsAnswerToggled] = useState(false);
    const [showAlertBeforeProceeding, setShowAlertBeforeProceeding] = useState(false)
    const [isAnswerExplanationToggle, setIsAnswerExplanationToggle] = useState(false)

    useEffect(() => {
        if (isReviewModeResultDashboard) {
            setSelectedAnswers(PageToVerbalForReviewAnswers || {});
        }
    }, [isReviewModeResultDashboard, selectedAnswersForVerbalReview]);

    const toggleAnswer = () => {
        setIsAnswerToggled(!isAnswerToggled);
    };

    const toggleAnswerExplanation = () => {
        setIsAnswerExplanationToggle(!isAnswerExplanationToggle);
    };

    const handleNext = () => {
        // console.log(PageToVerbalForReviewAnswers)
        if (!isReviewModeResultDashboard) {
            setSelectedAnswersReviewResultDashboard({ ...selectedAnswersReviewResultDashboard, [currentQuestionIndex]: selectedAnswers[currentQuestionIndex] });
            const score = calculateScore();
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                // setSelectedSentence(null);
            }
            else if (currentQuestionIndex === questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowAlertBeforeProceeding(true)
            }
            else {
                onContinue(score, selectedAnswersReviewResultDashboard);
            }
        }
        else {
            // if (isAnswerToggled) toggleAnswer()
            // In review mode, just move to the next question without calculating scores or updating answers
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const handleBack = () => {
        setShowAlertBeforeProceeding(false)
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

            console.log(`Question ${index + 1}:`);
            console.log('User Answer:', userAnswer);
            console.log('Correct Answer:', question.correctAnswer);

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
        if (!isReviewModeResultDashboard) {

            setSelectedAnswersReviewResultDashboard({ ...selectedAnswersReviewResultDashboard, [currentQuestionIndex]: selectedAnswers[currentQuestionIndex] });
            const score = calculateScore();
            onContinue(score, selectedAnswersReviewResultDashboard);
        }
        else {
            // In review mode, just continue without calculating scores
            onContinue(0, selectedAnswersReviewResultDashboard); // Pass a score of 0 or some other placeholder if needed
        }
    };

    const toggleReviewModal = () => {
        setIsReviewModalOpen(!isReviewModalOpen); // Toggle the modal visibility
    };

    const toggleMarkQuestion = () => {
        setMarkedQuestions((prev) =>
            prev.includes(currentQuestionIndex)
                ? prev.filter((qIndex) => qIndex !== currentQuestionIndex)
                : [...prev, currentQuestionIndex]
        );
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
                                        <label key={optIdx} className="min-w-[200px] p-4 border border-black text-start cursor-pointer bg-white hover:bg-gray-200">
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
                    <div className="sm:w-1/2 p-4 border-b sm:border-b-0 border-gray-300 border-r">
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
        <>
            <TestLayout
                currentSection={`Verbal Section ${section === 'verbal1' ? 1 : 2}`}
                onContinue={handleNext}
                onExitSection={handleExitSection}
                onBack={handleBack}
                showReview={toggleReviewModal}
                onMark={toggleMarkQuestion}
                showVerbalButtons={true}
                verbalSection={section}
                isReviewModeResultDashboard={isReviewModeResultDashboard || false}
                showResult={showResult}
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

                            {isReviewModeResultDashboard && (
                                <div className='mt-5 flex flex-row justify-between'>
                                    <div className='items-start gap-5 flex flex-col justify-start'>
                                        <Button onClick={toggleAnswer}>
                                            Toggle Answer
                                        </Button>
                                        {isAnswerToggled &&
                                            <div className='bg-gray-100 rounded-lg p-5 border border-gray-200 shadow-xl'>
                                                Correct Answer: {Array.isArray(currentQuestion.correctAnswer)
                                                    ? currentQuestion.correctAnswer.join(', ')
                                                    : currentQuestion.correctAnswer}
                                            </div>
                                        }
                                        {isAnswerExplanationToggle &&
                                            <div className='bg-gray-100 rounded-lg p-5 border border-gray-200 shadow-xl'>
                                                Explanation: {Array.isArray(currentQuestion.explanation)
                                                    ? currentQuestion.explanation.join(', ')
                                                    : currentQuestion.explanation}
                                            </div>
                                        }
                                    </div>
                                    <Button onClick={toggleAnswerExplanation}>Toggle Explanation</Button>
                                </div>
                            )}

                        </>
                    )}
                    {showAlertBeforeProceeding && (
                        <div>
                            <div className="p-[20px] border border-gray-300 rounded-md bg-gray-100 mt-[20px] dark:text-black">
                                <h1 className='mb-[15px]'>Verbal Section End</h1>
                                <p className='mb-[20px]'>If you click Exit Section or Next Button, you WILL NOT be able to return to this section of the test.</p>
                                <p className='mb-[20px]'>
                                    If you want to double check your answers you can click REVIEW to check your reamining answers.
                                    On Test Day, when you exit a section, you will be taken to a screen where you may take an optional 60-second break (just to take a sip of water or take a sigh of relief!).
                                </p>
                                <p className='mb-[20px]'>Click Next/Exit Section to proceed.</p>
                            </div>
                        </div>
                    )}
                </div>
            </TestLayout >

            {isReviewModalOpen && (
                <div className="fixed dark:text-black inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-[80%] h-[90%] overflow-auto">
                        <h3 className="text-xl font-bold mb-4">Review Section</h3>
                        <p className="mb-4">
                            Below is the list of questions in the current section. The question you were on is highlighted.
                            Questions you have seen are labeled <strong>Answered</strong>, <strong>Incomplete</strong> or <strong>Not Answered</strong>. A question is labeled <strong>Incomplete</strong> if the question
                            requires you to select a certain number of answer choices and you have selected more or fewer
                            than that number. Questions you have marked are indicated with a <span>✔</span>.
                        </p>
                        <p className="mb-4">
                            To return to the question you were on, click <strong>Return</strong>. To go to a different question, click on that question to highlight it, then click <strong>Go To Question</strong>.
                        </p>

                        <table className="table-auto w-full border-collapse text-xs sm:text-base">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Question Number</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Marked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((_, index) => (
                                    <tr key={index} className={`${index === currentQuestionIndex ? 'bg-gray-200' : ''}`}>
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2">
                                            {selectedAnswers[index] ? 'Answered' : 'Not Answered'}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {/* Assume we have a markedQuestions array */}
                                            {markedQuestions.includes(index) && <span>✔</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={toggleReviewModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

        </>
    );
};

export default Verbal;
