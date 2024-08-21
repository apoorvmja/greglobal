import { useEffect, useState } from 'react';
import TestLayout from './TestLayout';
import { Button } from '../ui/button';

interface QuantitativeQuestion {
    type: 'quantitative_comparison' | 'multiple_choice_single_answer' | 'multiple_choice_multiple_answers' | 'numeric_entry' | 'data_interpretation_single_answer' | 'data_interpretation_multiple_answers' | 'data_interpretation_numeric_entry';
    questionText?: string;
    options?: string[];
    correctAnswer: string | string[];
    quantityA?: string;
    quantityB?: string;
    imgUrl?: string;
    explanation: string
}

interface QuantitativeTest {
    sections: {
        quantitative1: { [key: string]: QuantitativeQuestion };
        quantitative2: { [key: string]: QuantitativeQuestion };
    };
}

interface Props {
    test: QuantitativeTest;
    section: 'quantitative1' | 'quantitative2';
    onContinue: (score: number, reviewAnswers: { [key: number]: string | string[] }) => void;
    onBack: () => void;
    isReviewModeResultDashboard?: boolean;
    PageToQuantForReviewAnswers?: { [key: number]: string | string[] };
    showResult?: (showResult: boolean) => void;
}

const Quantitative: React.FC<Props> = ({ test, section, onContinue, onBack, isReviewModeResultDashboard, PageToQuantForReviewAnswers, showResult }) => {
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | string[] }>({});
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State for managing modal visibility
    const [markedQuestions, setMarkedQuestions] = useState<number[]>([]); // Track marked questions
    const [isAnswerToggled, setIsAnswerToggled] = useState(false);
    const [selectedAnswersReviewResultDashboard, setSelectedAnswersReviewResultDashboard] = useState<{ [key: number]: string | string[] }>({});
    const [showAlertBeforeProceeding, setShowAlertBeforeProceeding] = useState(false)
    const [isAnswerExplanationToggle, setIsAnswerExplanationToggle] = useState(false)

    useEffect(() => {
        if (isReviewModeResultDashboard) {
            setSelectedAnswers(PageToQuantForReviewAnswers || {});
        }
    }, [isReviewModeResultDashboard, PageToQuantForReviewAnswers]);

    const toggleAnswer = () => {
        setIsAnswerToggled(!isAnswerToggled);
    };

    const toggleAnswerExplanation = () => {
        setIsAnswerExplanationToggle(!isAnswerExplanationToggle);
    };

    const handleNext = () => {
        // console.log("selected answes:", selectedAnswers)
        if (!isReviewModeResultDashboard) {
            setSelectedAnswersReviewResultDashboard({ ...selectedAnswersReviewResultDashboard, [currentQuestionIndex]: selectedAnswers[currentQuestionIndex] });
            const score = calculateScore();
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
            else if (currentQuestionIndex === questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowAlertBeforeProceeding(true)
            }
            else {
                onContinue(score, selectedAnswersReviewResultDashboard);
            }
        } else {
            // if (isAnswerToggled) toggleAnswer()

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const handleBack = () => {
        setShowAlertBeforeProceeding(false)
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: string | string[]) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answer,
        });
    };

    const handleExitSection = () => {
        setSelectedAnswersReviewResultDashboard({ ...selectedAnswersReviewResultDashboard, [currentQuestionIndex]: selectedAnswers[currentQuestionIndex] });
        const score = calculateScore();
        onContinue(score, selectedAnswersReviewResultDashboard);
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

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const userAnswer = selectedAnswers[index];
            console.log(`Question ${index + 1}:`);
            console.log('User Answer:', userAnswer);
            console.log('Correct Answer:', question.correctAnswer);

            if (Array.isArray(question.correctAnswer)) {
                if (Array.isArray(userAnswer)) {
                    const correctAnswerString = question.correctAnswer.map(ans => ans.toString().trim()).join('|');
                    const userAnswerString = userAnswer.map(ans => ans.toString().trim()).join('|');

                    if (correctAnswerString === userAnswerString) {
                        score++;
                    } else {
                        console.log('Mismatch or missing parts in user answer');
                    }
                } else {
                    console.log('User answer is not an array');
                }
            } else {
                if (userAnswer === question.correctAnswer) {
                    score++;
                } else {
                    console.log('Incorrect single-part answer');
                }
            }
        });
        console.log(`Score for ${section}:`, score);
        return score;
    };

    const renderQuantitativeComparison = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        return (
            <div key={index} className="mb-4">
                {question.imgUrl && (
                    <div className="mb-4">
                        <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full h-auto" />
                    </div>
                )}
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col sm:flex-row justify-around mt-5">
                    <div className="border p-4 flex flex-col justify-center items-center">
                        <p>Quantity A</p>
                        <p>{question.quantityA}</p>
                    </div>
                    <div className="border p-4 flex flex-col justify-center items-center">
                        <p>Quantity B</p>
                        <p>{question.quantityB}</p>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    {['Quantity A is greater', 'Quantity B is greater', 'The two quantities are equal', 'The relationship cannot be determined from the information given'].map((option, idx) => {
                        const isChecked = selectedAnswer === option;

                        return (
                            <label key={idx} className="mb-2">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    className="mr-2"
                                    onChange={() => handleAnswerChange(index, option)}
                                    checked={isChecked || false}
                                /> {option}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMultipleChoiceSingleAnswer = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col mt-4">
                    {question.options?.map((option, idx) => {
                        const isChecked = selectedAnswer === option;

                        return (
                            <label key={idx} className="mb-2">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    className="mr-2"
                                    onChange={() => handleAnswerChange(index, option)}
                                    checked={isChecked}
                                /> {option}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMultipleChoiceMultipleAnswers = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string[] | undefined;

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col mt-4">
                    {question.options?.map((option, idx) => {
                        const isChecked = selectedAnswer?.includes(option) || false;

                        return (
                            <label key={idx} className="mb-2">
                                <input
                                    type="checkbox"
                                    name={`question-${index}`}
                                    value={option}
                                    className="mr-2"
                                    onChange={(e) => {
                                        const currentAnswers = selectedAnswer || [];
                                        const newAnswers = e.target.checked
                                            ? [...currentAnswers, option]
                                            : currentAnswers.filter(ans => ans !== option);
                                        handleAnswerChange(index, newAnswers);
                                    }}
                                    checked={isChecked}
                                /> {option}
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderNumericEntry = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="mt-4">
                    <input
                        type="number"
                        name={`question-${index}`}
                        className="border p-2 w-full dark:text-white rounded-lg"
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        value={selectedAnswer || ''}
                    />
                </div>
            </div>
        );
    };

    const renderDataInterpretationSingleAnswer = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string | undefined;

        return (
            <div key={index} className="mb-4">
                {question.imgUrl && (
                    <div className="mb-4">
                        <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full max-h-[50vh]" />
                    </div>
                )}
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col mt-4">
                    {question.options?.map((option, idx) => (
                        <label key={idx} className="mb-2">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                className="mr-2"
                                onChange={() => handleAnswerChange(index, option)}
                                checked={selectedAnswer === option}
                            /> {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    };

    const renderDataInterpretationMultipleAnswers = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string[] || [];

        return (
            <div key={index} className="mb-4">
                {question.imgUrl && (
                    <div className="mb-4">
                        <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full max-h-[50vh]" />
                    </div>
                )}
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="flex flex-col mt-4">
                    {question.options?.map((option, idx) => (
                        <label key={idx} className="mb-2">
                            <input
                                type="checkbox"
                                name={`question-${index}`}
                                value={option}
                                className="mr-2"
                                onChange={(e) => {
                                    const newAnswers = e.target.checked
                                        ? [...selectedAnswer, option]
                                        : selectedAnswer.filter(ans => ans !== option);
                                    handleAnswerChange(index, newAnswers);
                                }}
                                checked={selectedAnswer.includes(option)}  // Check if the option is part of the selected answers
                            /> {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    };

    const renderDataInterpretationNumericEntry = (question: QuantitativeQuestion, index: number) => {
        const selectedAnswer = selectedAnswers[index] as string || ''; // Retrieve the current value or default to an empty string

        return (
            <div key={index} className="mb-4">
                <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
                <div className="mt-4">
                    <input
                        type="number"
                        name={`question-${index}`}
                        className="border p-2 w-full"
                        value={selectedAnswer}  // Set the value based on the selectedAnswer
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                </div>
            </div>
        );
    };


    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <TestLayout
                currentSection={`Quantitative Section ${section === 'quantitative1' ? 1 : 2}`}
                onExitSection={handleExitSection}
                onContinue={handleNext}
                onBack={handleBack}
                showReview={toggleReviewModal}
                onMark={toggleMarkQuestion}
                showQuantButtons={true}  // Ensure this is passed as true
                quantSection={section}  // Ensure the section (quant1 or quant2) is passed
                isReviewModeResultDashboard={isReviewModeResultDashboard || false}
                showResult={showResult}
            >
                <div className="min-h-[50vh] w-full dark:text-black">
                    {currentQuestion && (
                        <>
                            {currentQuestion.type === 'quantitative_comparison' && renderQuantitativeComparison(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'multiple_choice_single_answer' && renderMultipleChoiceSingleAnswer(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'multiple_choice_multiple_answers' && renderMultipleChoiceMultipleAnswers(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'numeric_entry' && renderNumericEntry(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'data_interpretation_single_answer' && renderDataInterpretationSingleAnswer(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'data_interpretation_multiple_answers' && renderDataInterpretationMultipleAnswers(currentQuestion, currentQuestionIndex)}
                            {currentQuestion.type === 'data_interpretation_numeric_entry' && renderDataInterpretationNumericEntry(currentQuestion, currentQuestionIndex)}

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
                                            <div className="bg-gray-100 rounded-lg p-5 border border-gray-200 shadow-xl">
                                                <div className=''>Explanation:</div>
                                                <div dangerouslySetInnerHTML={{
                                                    __html: Array.isArray(currentQuestion.explanation)
                                                        ? currentQuestion.explanation.join(', ').replace(/\n/g, '<br />')
                                                        : currentQuestion.explanation.replace(/\n/g, '<br />')
                                                }} />
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
                                <h1 className='mb-[15px]'>Quantitative Section End</h1>
                                <p className='mb-[20px]'>If you click Exit Section, you WILL NOT be able to return to this section of the test.</p>
                                <p className='mb-[20px]'>
                                    If you want to double check your answers you can click REVIEW to check your reamining answers.
                                    On Test Day, when you exit a section, you will be taken to a screen where you may take an optional 60-second break.
                                </p>
                                <p className='mb-[20px]'>Click Next/Exit Section to proceed.</p>
                            </div>
                        </div>
                    )}
                </div>
            </TestLayout >

            {isReviewModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:text-black">
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

export default Quantitative;
