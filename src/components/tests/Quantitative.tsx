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
    onContinue: () => void;
    onBack: () => void;
}

const Quantitative: React.FC<Props> = ({ test, section, onContinue, onBack }) => {
    // Convert the section object to an array of questions
    const questions = Object.values(test.sections[section]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onContinue();
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderQuantitativeComparison = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.imgUrl && (
                <div className="mb-4">
                    <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full h-auto" />
                </div>
            )}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            <div className="flex justify-around mt-5">
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
                {['Quantity A is greater', 'Quantity B is greater', 'The two quantities are equal', 'The relationship cannot be determined from the information given'].map((option, idx) => (
                    <label key={idx} className="mb-2">
                        <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                    </label>
                ))}
            </div>
        </div>
    );


    const renderMultipleChoiceSingleAnswer = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            <div className="flex flex-col mt-4">
                {question.options?.map((option, idx) => (
                    <label key={idx} className="mb-2">
                        <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderMultipleChoiceMultipleAnswers = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            <div className="flex flex-col mt-4">
                {question.options?.map((option, idx) => (
                    <label key={idx} className="mb-2">
                        <input type="checkbox" name={`question-${index}`} value={option} className="mr-2" /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderNumericEntry = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            <div className="mt-4">
                <input type="number" name={`question-${index}`} className="border p-2 w-full" />
            </div>
        </div>
    );

    const renderDataInterpretationSingleAnswer = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.imgUrl && (
                <div className="mb-4">
                    <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full max-h-[50vh]" />
                </div>
            )}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {/* Add the chart or table rendering logic here */}
            <div className="flex flex-col mt-4">
                {question.options?.map((option, idx) => (
                    <label key={idx} className="mb-2">
                        <input type="radio" name={`question-${index}`} value={option} className="mr-2" /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderDataInterpretationMultipleAnswers = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            {question.imgUrl && (
                <div className="mb-4">
                    <img src={question.imgUrl} alt={`Question ${index + 1} illustration`} className="max-w-full max-h-[50vh]" />
                </div>
            )}
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {/* Add the chart or table rendering logic here */}
            <div className="flex flex-col mt-4">
                {question.options?.map((option, idx) => (
                    <label key={idx} className="mb-2">
                        <input type="checkbox" name={`question-${index}`} value={option} className="mr-2" /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderDataInterpretationNumericEntry = (question: QuantitativeQuestion, index: number) => (
        <div key={index} className="mb-4">
            <p className="font-bold">{`Question ${index + 1}: ${question.questionText}`}</p>
            {/* Add the chart or table rendering logic here */}
            <div className="mt-4">
                <input type="number" name={`question-${index}`} className="border p-2 w-full" />
            </div>
        </div>
    );

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <TestLayout currentSection={`Quantitative Section ${section === 'quantitative1' ? 1 : 2}`} onContinue={handleNext} onBack={handleBack} showVerbalButtons={false}>
            <div className="min-h-[50vh] w-full">
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
