"use client"
import { useEffect, useState } from 'react';
import TestDetails from '@/components/tests/TestDetails';
import AWA from '@/components/tests/AWA';
import Quantitative from '@/components/tests/Quantitative';
import Verbal from '@/components/tests/Verbal';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PlaceholderContent from '@/components/demo/placeholder-content';
import InitialAWAInstructions from '@/components/tests/InitialAWAInstruction';
import InitialVerbalInstructions from '@/components/tests/InitialVerbalInstruction';
import InitialQuantInstructions from '@/components/tests/InitialQuantInstruction';
import testQuestions from '@/components/tests/testQuestions.json'; // Import your JSON file
import ResultDashboard from '@/components/tests/ResultDashboard';
import { useUser } from '@clerk/nextjs';
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/firebase.config"; // Import your Firebase configuration

interface AWASection {
  prompt: string;
  instructions: string;
}

interface VerbalQuestion {
  type: 'text_completion' | 'sentence_equivalence' | 'reading_comprehension' | 'reading_comprehension_multiple' | 'reading_comprehension_select' | 'reading_comprehension_highlighted';
  questionText: string;
  passage?: string;
  options?: string[] | { [key: string]: string[] }; // Supports both array and object with blanks
  highlighted?: string[];
  correctAnswer: string | string[] | (string | string[])[][]; // Updated to support complex nested arrays
  blanks?: number;
  explanation?: string
}

interface QuantitativeQuestion {
  type: 'quantitative_comparison' | 'multiple_choice_single_answer' | 'multiple_choice_multiple_answers' | 'numeric_entry' | 'data_interpretation_single_answer' | 'data_interpretation_multiple_answers' | 'data_interpretation_numeric_entry';
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  quantityA?: string;
  quantityB?: string;
  imgUrl?: string;
  explanation?: string
}



interface Test {
  id: string;
  name: string;
  description: string;
  timeLimits: {
    verbal1: number;
    verbal2: number;
    quantitative1: number;
    quantitative2: number;
    awa: number;
  };
  sections: {
    awa: AWASection;
    quantitative1: { [key: string]: QuantitativeQuestion };  // Ensure this matches QuantitativeQuestion
    quantitative2: { [key: string]: QuantitativeQuestion };  // Ensure this matches QuantitativeQuestion
    verbal1: { [key: string]: VerbalQuestion };
    verbal2: { [key: string]: VerbalQuestion };
  };
}

export default function TagsPage() {
  const { user } = useUser(); // Clerk user data
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<'testDetails' | 'awaInstructions' | 'awa' | 'VerbalInstructions' | 'verbal1' | 'verbal2' | 'QuantInstructions' | 'quantitative1' | 'quantitative2' | 'resultDashboard' | 'awareview' | 'verbal1review' | 'verbal2review' | 'quantitative1review' | 'quantitative2review'>('testDetails');
  const [awaScore, setAWAScore] = useState<number>(0);
  const [verbal1Score, setVerbal1Score] = useState<number>(0);
  const [verbal2Score, setVerbal2Score] = useState<number>(0);
  const [quant1Score, setQuant1Score] = useState<number>(0);
  const [quant2Score, setQuant2Score] = useState<number>(0);
  const [verbal1ReviewAnswers, setVerbal1ReviewAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [verbal2ReviewAnswers, setVerbal2ReviewAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [quant1ReviewAnswers, setQuant1ReviewAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [quant2ReviewAnswers, setQuant2ReviewAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [currentSectionReviewResultDashboard, setCurrentSectionReviewResultDashboard] = useState('overview'); // Default to overview or whatever the starting section is
  const [showResultDashboard, setShowResultDashboard] = useState(false);
  const [awaEssayContent, setAwaEssayContent] = useState<string>(''); // New state to hold the AWA essay content

  useEffect(() => {
    if (id) {
      const fetchedTest = testQuestions.tests.find(test => test.id === id);
      if (fetchedTest) {
        setTest(fetchedTest as Test);
      } else {
        setError('No such document');
      }
    } else {
      setError('No ID found in pathname');
    }

    const searchParams = new URLSearchParams(window.location.search);
    const resultDashboardQuery = searchParams.get('resultDashboard');
    if (resultDashboardQuery) {
      setCurrentSection('resultDashboard');

      // Retrieve and parse the stored data from sessionStorage
      const storedAttempt = sessionStorage.getItem('selectedTestAttempt');
      if (storedAttempt) {
        const attemptData = JSON.parse(storedAttempt);

        // Now you can access individual scores and answers
        setAWAScore(attemptData.awaScore || 0);
        setVerbal1Score(attemptData.verbal1Score || 0);
        setVerbal2Score(attemptData.verbal2Score || 0);
        setQuant1Score(attemptData.quant1Score || 0);
        setQuant2Score(attemptData.quant2Score || 0);

        // Optionally, set the review answers as well
        setVerbal1ReviewAnswers(attemptData.verbal1Answers || {});
        setVerbal2ReviewAnswers(attemptData.verbal2Answers || {});
        setQuant1ReviewAnswers(attemptData.quant1Answers || {});
        setQuant2ReviewAnswers(attemptData.quant2Answers || {});
        setAwaEssayContent(attemptData.awaEssayContent || '')
      }
    }
  }, [id]);

  const handleContinue = async () => {
    if (currentSection === 'testDetails') setCurrentSection('awaInstructions');
    else if (currentSection === 'awaInstructions') setCurrentSection('awa');
    else if (currentSection === 'awa') setCurrentSection('VerbalInstructions');
    else if (currentSection === 'VerbalInstructions') setCurrentSection('verbal1');
    else if (currentSection === 'verbal1') { setCurrentSection('verbal2'); }
    else if (currentSection === 'verbal2') setCurrentSection('QuantInstructions');
    else if (currentSection === 'QuantInstructions') setCurrentSection('quantitative1');
    else if (currentSection === 'quantitative1') setCurrentSection('quantitative2');
    else if (currentSection === 'quantitative2') { setCurrentSection('resultDashboard'); };
  };

  const [hasStoredAttempt, setHasStoredAttempt] = useState(false);

  useEffect(() => {
    // Trigger storeAttemptResult only when currentSection changes to 'resultDashboard'
    if (currentSection === 'resultDashboard') {
      storeAttemptResult(); // Store the result when navigating to the result dashboard
      setHasStoredAttempt(true)
    }
  }, [currentSection, quant2ReviewAnswers, verbal2ReviewAnswers, awaScore, verbal1Score, quant1Score]);


  const storeAttemptResult = () => {
    if (!user || hasStoredAttempt) return; // Exit if user is not logged in or attempt is already stored

    const userID = user.id; // Get the user's ID from Clerk
    const testID = pathname.split('/').pop(); // Extract the test ID from the URL

    // Remove any undefined values from the answers
    const sanitizedVerbal1Answers = Object.fromEntries(
      Object.entries(verbal1ReviewAnswers).filter(([key, value]) => value !== undefined)
    );
    const sanitizedVerbal2Answers = Object.fromEntries(
      Object.entries(verbal2ReviewAnswers).filter(([key, value]) => value !== undefined)
    );
    const sanitizedQuant1Answers = Object.fromEntries(
      Object.entries(quant1ReviewAnswers).filter(([key, value]) => value !== undefined)
    );
    const sanitizedQuant2Answers = Object.fromEntries(
      Object.entries(quant2ReviewAnswers).filter(([key, value]) => value !== undefined)
    );

    // Collect the test data with sanitized answers
    const testAttemptData = {
      testID: testID || 'unknown',
      awaScore,
      verbal1Score: Math.floor(verbal1Score * 1.5),
      verbal2Score: Math.floor(verbal2Score * 1.5),
      quant1Score: Math.floor(quant1Score * 1.5),
      quant2Score: Math.floor(quant2Score * 1.5),
      awaEssayContent,
      verbal1Answers: sanitizedVerbal1Answers,
      verbal2Answers: sanitizedVerbal2Answers,
      quant1Answers: sanitizedQuant1Answers,
      quant2Answers: sanitizedQuant2Answers,
      completionDate: new Date(),
    };

    try {
      // Store the test attempt in Firebase and wait for it to complete
      addDoc(collection(db, `tests/${userID}/testAttempts`), testAttemptData);
      console.log("Test attempt successfully stored!");
    } catch (error) {
      console.error("Error storing test attempt: ", error);
    }
  };

  const handleSectionChangeReviewResultDashboard = (section: string) => {
    setCurrentSectionReviewResultDashboard(section);
    if (currentSectionReviewResultDashboard === 'awareview' && currentSection === 'resultDashboard') {
      setCurrentSection('awareview');
    }
    if (currentSectionReviewResultDashboard === 'verbal1review' && currentSection === 'resultDashboard') {
      setCurrentSection('verbal1review');
    }
    if (currentSectionReviewResultDashboard === 'verbal2review' && currentSection === 'resultDashboard') {
      setCurrentSection('verbal2review');
    }
    if (currentSectionReviewResultDashboard === 'quantitative1review' && currentSection === 'resultDashboard') {
      setCurrentSection('quantitative1review');
    }
    if (currentSectionReviewResultDashboard === 'quantitative2review' && currentSection === 'resultDashboard') {
      setCurrentSection('quantitative2review');
    }
  };

  const handleGoBackToResults = (showResult: boolean) => {
    console.log(quant2ReviewAnswers)
    setShowResultDashboard(showResult);
    if (showResult) {
      setCurrentSection('resultDashboard');
      setCurrentSectionReviewResultDashboard('overview')
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fullscreen">
      <ContentLayout title="Tags">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <PlaceholderContent> */}
        <div className='mt-3 bg-white rounded-lg'>
          {currentSection === 'testDetails' && <TestDetails test={test} onContinue={handleContinue} />}
          {currentSection === 'awaInstructions' && <InitialAWAInstructions onContinue={handleContinue} />}
          {currentSection === 'awa' && <AWA test={test} onContinue={(score, text) => { setAWAScore(score); setAwaEssayContent(text); handleContinue(); }} />}
          {currentSection === 'VerbalInstructions' && <InitialVerbalInstructions onContinue={handleContinue} />}
          {currentSection === 'verbal1' && (
            <Verbal
              onBack={() => { }}
              test={test}
              section="verbal1"
              onContinue={(score: number, selectedAnswersReviewResultDashboard: { [key: number]: string | string[] }) => {
                setVerbal1Score(score);
                setVerbal1ReviewAnswers(selectedAnswersReviewResultDashboard);
                handleContinue();
              }}
              isReviewModeResultDashboard={false}
            />
          )}
          {currentSection === 'verbal2' && (
            <Verbal
              onBack={() => { }}
              test={test}
              section="verbal2"
              onContinue={(score: number, selectedAnswersReviewResultDashboard: { [key: number]: string | string[] }) => {
                setVerbal2Score(score);
                setVerbal2ReviewAnswers(selectedAnswersReviewResultDashboard);
                handleContinue();
              }}
              isReviewModeResultDashboard={false}
            />
          )}
          {currentSection === 'QuantInstructions' && <InitialQuantInstructions onContinue={handleContinue} />}
          {currentSection === 'quantitative1' &&
            <Quantitative
              onBack={() => { }}
              test={test} section="quantitative1"
              onContinue={async (score: number, selectedAnswersReviewResultDashboard: { [key: number]: string | string[] }) => {
                setQuant1Score(score);
                setQuant1ReviewAnswers(selectedAnswersReviewResultDashboard);
                handleContinue();
              }}
              isReviewModeResultDashboard={false}
            />}
          {currentSection === 'quantitative2' &&
            <Quantitative
              onBack={() => { }}
              test={test}
              section="quantitative2"
              onContinue={(score: number, selectedAnswersReviewResultDashboard: { [key: number]: string | string[] }) => {
                setQuant2Score(score);
                setQuant2ReviewAnswers(selectedAnswersReviewResultDashboard);
                handleContinue();
              }}
              isReviewModeResultDashboard={false}
            />}
          {currentSection === 'resultDashboard' && <ResultDashboard onSectionChange={handleSectionChangeReviewResultDashboard} awaScore={awaScore} verbal1Score={verbal1Score} verbal2Score={verbal2Score} quant1Score={quant1Score} quant2Score={quant2Score} />}
          {currentSection === 'verbal1review' && <Verbal onContinue={(score) => { setQuant1Score(score); handleContinue(); }} onBack={() => { }} test={test} isReviewModeResultDashboard={true} section="verbal1" PageToVerbalForReviewAnswers={verbal1ReviewAnswers} showResult={() => handleGoBackToResults(true)} />}
          {currentSection === 'verbal2review' && <Verbal onContinue={(score) => { setQuant1Score(score); handleContinue(); }} onBack={() => { }} test={test} isReviewModeResultDashboard={true} section="verbal2" PageToVerbalForReviewAnswers={verbal2ReviewAnswers} showResult={() => handleGoBackToResults(true)} />}
          {currentSection === 'quantitative1review' && <Quantitative onContinue={(score) => { setQuant1Score(score); handleContinue(); }} onBack={() => { }} test={test} isReviewModeResultDashboard={true} section="quantitative1" PageToQuantForReviewAnswers={quant1ReviewAnswers} showResult={() => handleGoBackToResults(true)} />}
          {currentSection === 'quantitative2review' && <Quantitative onContinue={(score) => { setQuant1Score(score); handleContinue(); }} onBack={() => { }} test={test} isReviewModeResultDashboard={true} section="quantitative2" PageToQuantForReviewAnswers={quant2ReviewAnswers} showResult={() => handleGoBackToResults(true)} />}
          {currentSection === 'awareview' && (
            <AWA
              test={test}
              onContinue={() => handleGoBackToResults(true)} // No need to calculate score in review mode
              isReviewModeResultDashboard={true}
              awaReviewContent={awaEssayContent}
              showResult={() => handleGoBackToResults(true)}
            />
          )}
        </div>
      </ContentLayout>
    </div>
  );
}
