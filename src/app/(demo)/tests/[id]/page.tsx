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
  correctAnswer: string | string[];
  blanks?: number;
}

interface QuantitativeQuestion {
  type: 'quantitative_comparison' | 'multiple_choice_single_answer' | 'multiple_choice_multiple_answers' | 'numeric_entry' | 'data_interpretation_single_answer' | 'data_interpretation_multiple_answers' | 'data_interpretation_numeric_entry';
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  quantityA?: string;
  quantityB?: string;
  imgUrl?: string;
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
  const [currentSection, setCurrentSection] = useState<'testDetails' | 'awaInstructions' | 'awa' | 'VerbalInstructions' | 'verbal1' | 'verbal2' | 'quantitative1' | 'quantitative2' | 'resultDashboard'>('testDetails');

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
    // if (currentSection === 'testDetails') setCurrentSection('quantitative1');
    else if (currentSection === 'awaInstructions') setCurrentSection('awa');
    else if (currentSection === 'awa') setCurrentSection('VerbalInstructions');
    else if (currentSection === 'VerbalInstructions') setCurrentSection('verbal1');
    else if (currentSection === 'verbal1') setCurrentSection('verbal2');
    else if (currentSection === 'verbal2') setCurrentSection('quantitative1');
    else if (currentSection === 'quantitative1') setCurrentSection('quantitative2');
    else if (currentSection === 'quantitative2') setCurrentSection('resultDashboard');
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) { // Firefox
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) { // Chrome, Safari, and Opera
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { // IE/Edge
      (elem as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari, and Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // IE/Edge
      (document as any).msExitFullscreen();
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
              <BreadcrumbPage>Tags</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <PlaceholderContent> */}
        <div className='mt-3 bg-white rounded-lg'>
          {currentSection === 'testDetails' && <TestDetails test={test} onContinue={handleContinue} />}
          {currentSection === 'awaInstructions' && <InitialAWAInstructions onContinue={handleContinue} />}
          {currentSection === 'awa' && <AWA test={test} onContinue={handleContinue} />}
          {currentSection === 'VerbalInstructions' && <InitialVerbalInstructions onContinue={handleContinue} />}
          {currentSection === 'verbal1' && <Verbal onBack={() => { }} test={test} section="verbal1" onContinue={handleContinue} />}
          {currentSection === 'verbal2' && <Verbal onBack={() => { }} test={test} section="verbal2" onContinue={handleContinue} />}
          {currentSection === 'quantitative1' && <Quantitative onBack={() => { }} test={test} section="quantitative1" onContinue={handleContinue} />}
          {currentSection === 'quantitative2' && <Quantitative onBack={() => { }} test={test} section="quantitative2" onContinue={handleContinue} />}
          {currentSection === 'resultDashboard' && <ResultDashboard />}
          {/* </PlaceholderContent> */}
        </div>
      </ContentLayout>
    </div>
  );
}
