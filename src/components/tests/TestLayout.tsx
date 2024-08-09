import { useState, useRef, useEffect } from 'react';

interface TestLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onContinue: () => void;
  onBack?: () => void;
  onExitSection?: () => void;
  showAWAButtons?: boolean;
  showVerbalButtons?: boolean;
  verbalSection?: 'verbal1' | 'verbal2'; // Add this prop to specify which verbal section
}

const TestLayout: React.FC<TestLayoutProps> = ({ children, currentSection, onContinue, onBack, onExitSection, showAWAButtons = false, showVerbalButtons = false, verbalSection }) => {
  const getInitialTime = () => {
    if (showVerbalButtons) {
      return verbalSection === 'verbal1' ? 1080 : 1380; // 18 minutes for Verbal 1, 23 minutes for Verbal 2
    }
    return 1800; // 30 minutes for AWA
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!timerRef.current) {
      startCountdown();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showAWAButtons, showVerbalButtons, verbalSection]);

  const startCountdown = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <div className="top-bar rounded-t-lg dark:text-black w-full">
        <div className="section-info">
          <h2>MJ Study Abroad</h2>
        </div>
        <div className="nav-buttons">
          {showAWAButtons && (
            <>
              <button>Quit w/Save</button>
              <button>Help</button>
              <button onClick={onContinue}>Continue</button>
            </>
          )}
          {showVerbalButtons && (
            <>
              <button onClick={onExitSection}>Exit Section</button>
              <button>Quit w/Save</button>
              <button>Mark</button>
              <button>Review</button>
              <button>Help</button>
              <button onClick={onBack}>Back</button>
              <button onClick={onContinue}>Next</button>
            </>
          )}
          {!showAWAButtons && !showVerbalButtons && (
            <button onClick={onContinue}>Continue</button>
          )}
        </div>
      </div>

      {(showAWAButtons || showVerbalButtons) && (
        <div className="flex justify-between p-[10px] bg-yellow-100 dark:text-black">
          <div className="section-info">
            <h2>{currentSection}</h2>
          </div>
          <div className="timer">
            <button>Time Left: {formatTime(timeLeft)}</button>
          </div>
        </div>
      )}

      <div className="content">
        {children}
      </div>
      <style jsx>{`
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f2f2f2;
          padding: 10px;
          border-bottom: 2px solid #ccc;
        }
        .section-info h2 {
          margin: 0;
        }
        .nav-buttons button {
          margin: 0 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .content {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default TestLayout;
