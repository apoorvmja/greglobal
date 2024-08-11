import { useState } from 'react';
import TestLayout from './TestLayout';

interface QuantitativeQuestion {
    type: 'quantitative_comparison' | 'multiple_choice_single_answer' | 'multiple_choice_multiple_answers' | 'numeric_entry' | 'data_interpretation_single_answer' | 'data_interpretation_multiple_answers' | 'data_interpretation_numeric_entry';
    questionText?: string;
    options?: string[];
    correctAnswer: string | string[];
    quantityA?: string;
    quantityB?: string;
    imgUrl?: string;
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
    onContinue: (score: number) => void;
    onBack: () => void;
}

const Quantitative: React.FC<Props> = ({ test, section, onContinue, onBack }) => {
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | string[] }>({});

    const handleNext = () => {
        const score = calculateScore(); // Calculate the score
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onContinue(score);
        }
    };

    const handleBack = () => {
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
        const score = calculateScore();
        onContinue(score);
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
        <TestLayout
            currentSection={`Quantitative Section ${section === 'quantitative1' ? 1 : 2}`}
            onExitSection={handleExitSection}
            onContinue={handleNext}
            onBack={handleBack}
            showQuantButtons={true}  // Ensure this is passed as true
            quantSection={section}  // Ensure the section (quant1 or quant2) is passed
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
                    </>
                )}
            </div>
        </TestLayout>
    );
};

export default Quantitative;
