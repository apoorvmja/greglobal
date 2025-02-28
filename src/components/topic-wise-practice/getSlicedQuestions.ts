import examQuestionsRaw from "@/components/topic-wise-practice/exam_questions.json";
import examAnswersRaw from "@/components/topic-wise-practice/exam_answers.json";

interface ExamQuestion {
    questionid: string;
    subjectid: string;
    question_time: string;
    question_pre: string;
    question_post: string;
    question_text: string;
    question_RC_text: string;
    question_points: string;
    question_solution: string;
    question_type: string;
    question_type2: string;
    question_topic: string;
}

interface ExamAnswer {
    answerid: string;
    questionid: string;
    answer_text: string;
    answer_correct: string;  // "1" means correct
}

interface ExamQuestionWithOptions extends ExamQuestion {
    options: { text: string; isCorrect: boolean }[];
}

export function getSlicedQuestionsWithOptionAndAnswer(
    topic: string,
    buttonId: number,
    numberOfQuestionsToBeSliced: number
): ExamQuestionWithOptions[] {
    if (!examQuestionsRaw || !Array.isArray(examQuestionsRaw) || examQuestionsRaw.length === 0 || !examQuestionsRaw[0].data) {
        console.error("Invalid examQuestionsRaw JSON structure or empty data.");
        return [];
    }

    if (!examAnswersRaw || !Array.isArray(examAnswersRaw) || examAnswersRaw.length === 0 || !examAnswersRaw[0].data) {
        console.error("Invalid examAnswersRaw JSON structure or empty data.");
        return [];
    }

    // Extract and filter questions based on the topic
    const allQuestions: ExamQuestion[] = examQuestionsRaw[0].data.filter(
        (question: ExamQuestion) => question.question_topic === topic
    );

    // Slice questions based on buttonId
    const startIndex = (buttonId - 1) * numberOfQuestionsToBeSliced;
    const endIndex = startIndex + numberOfQuestionsToBeSliced;
    const slicedQuestions = allQuestions.slice(startIndex, endIndex);

    // Extract all answers
    const allAnswers: ExamAnswer[] = examAnswersRaw[0].data;

    // Map answers using questionId
    const questionsWithAnswers: ExamQuestionWithOptions[] = slicedQuestions.map((question) => {
        const questionAnswers = allAnswers
            .filter((answer) => answer.questionid === question.questionid)
            .map((answer) => ({
                text: answer.answer_text,
                isCorrect: answer.answer_correct === "1",
            }));

        return {
            ...question,
            options: questionAnswers,  // ✅ Now includes options
        };
    });

    return questionsWithAnswers;
}
