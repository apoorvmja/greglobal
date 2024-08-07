// src/pages/tests/[id].tsx
"use client"
import { useEffect, useState } from 'react';
import { db } from '@/firebase.config';
import { doc, getDoc } from "firebase/firestore";
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

interface AWASection {
  prompt: string;
  instructions: string;
}

interface Question {
  type: string;
  questionText: string;
  options: {
    [key: string]: string[];
  } | string[];
  correctAnswer: string | string[];
  blanks?: number;
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
    quantitative1: Question[];
    quantitative2: Question[];
    verbal1: Question[];
    verbal2: Question[];
  };
}

export default function TagsPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<'testDetails' | 'awaInstructions' | 'awa' | 'VerbalInstructions' | 'verbal1' | 'verbal2' | 'quantitative1' | 'quantitative2'>('testDetails');

  useEffect(() => {
    if (id) {
      const fetchTest = async () => {
        try {
          console.log(`Fetching document with ID: ${id}`);
          const testRef = doc(db, "tests", id as string);
          const testDoc = await getDoc(testRef);
          if (testDoc.exists()) {
            console.log('Document data:', testDoc.data());
            setTest({ id: testDoc.id, ...testDoc.data() } as Test);
          } else {
            console.error('No such document!');
            setError('No such document');
          }
        } catch (err) {
          console.error('Error fetching document:', err);
          setError('Error fetching document');
        }
      };

      fetchTest();
    } else {
      console.error('No ID found in pathname');
      setError('No ID found in pathname');
    }
  }, [id]);

  const handleContinue = () => {
    // if (currentSection === 'testDetails') setCurrentSection('awaInstructions');
    if (currentSection === 'testDetails') setCurrentSection('verbal1');
    else if (currentSection === 'awaInstructions') setCurrentSection('awa');
    else if (currentSection === 'awa') setCurrentSection('VerbalInstructions');
    else if (currentSection === 'VerbalInstructions') setCurrentSection('verbal1');
    else if (currentSection === 'verbal1') setCurrentSection('verbal2');
    else if (currentSection === 'verbal2') setCurrentSection('quantitative1');
    else if (currentSection === 'quantitative1') setCurrentSection('quantitative2');
    // Handle the end of the test as needed
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
      {/* <button onClick={enterFullscreen} style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>Enter Fullscreen</button> */}
      {/* <button onClick={exitFullscreen} style={{ position: 'fixed', top: 40, right: 10, zIndex: 1000 }}>Exit Fullscreen</button> */}
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
        <PlaceholderContent>
          {currentSection === 'testDetails' && <TestDetails test={test} onContinue={handleContinue} />}
          {currentSection === 'awaInstructions' && <InitialAWAInstructions onContinue={handleContinue} />}
          {currentSection === 'awa' && <AWA test={test} onContinue={handleContinue} />}
          {currentSection === 'VerbalInstructions' && <InitialVerbalInstructions onContinue={handleContinue} />}
          {currentSection === 'verbal1' && <Verbal test={test} section="verbal1" onContinue={handleContinue} />}
          {currentSection === 'verbal2' && <Verbal test={test} section="verbal2" onContinue={handleContinue} />}
          {/* {currentSection === 'quantitative1' && <Quantitative test={test} section="quantitative1" onContinue={handleContinue} />} */}
          {/* {currentSection === 'quantitative2' && <Quantitative test={test} section="quantitative2" onContinue={handleContinue} />} */}
        </PlaceholderContent>
      </ContentLayout>
    </div>
  );
}
