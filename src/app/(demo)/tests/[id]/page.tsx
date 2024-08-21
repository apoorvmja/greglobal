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
import testQuestions from '@/components/tests/testQuestions.json'; // Import your JSON file
import ResultDashboard from '@/components/tests/ResultDashboard';

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
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<'testDetails' | 'awaInstructions' | 'awa' | 'VerbalInstructions' | 'verbal1' | 'verbal2' | 'quantitative1' | 'quantitative2' | 'resultDashboard' | 'awareview' | 'verbal1review' | 'verbal2review' | 'quantitative1review' | 'quantitative2review'>('testDetails');
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
  }, [id]);

  const handleContinue = () => {
    if (currentSection === 'testDetails') setCurrentSection('awaInstructions');
    else if (currentSection === 'awaInstructions') setCurrentSection('awa');
    else if (currentSection === 'awa') setCurrentSection('VerbalInstructions');
    else if (currentSection === 'VerbalInstructions') setCurrentSection('verbal1');
    else if (currentSection === 'verbal1') { setCurrentSection('verbal2'); }
    else if (currentSection === 'verbal2') setCurrentSection('quantitative1');
    else if (currentSection === 'quantitative1') setCurrentSection('quantitative2');
    else if (currentSection === 'quantitative2') setCurrentSection('resultDashboard');
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
          {currentSection === 'quantitative1' &&
            <Quantitative
              onBack={() => { }}
              test={test} section="quantitative1"
              onContinue={(score: number, selectedAnswersReviewResultDashboard: { [key: number]: string | string[] }) => {
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
              }} />}
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
