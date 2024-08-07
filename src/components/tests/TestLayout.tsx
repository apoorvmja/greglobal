import Link from 'next/link';
import { useState, useRef } from 'react';

interface TestLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onContinue: () => void;
  showAWAButtons?: boolean; // Add this prop to conditionally show AWA buttons
}

const TestLayout: React.FC<TestLayoutProps> = ({ children, currentSection, onContinue, showAWAButtons = false }) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (timerRef.current) return; // Prevent multiple intervals

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
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

  // Start countdown for AWA section
  if (showAWAButtons && !timerRef.current) {
    startCountdown();
  }

  return (
    <div>
      <div className="top-bar rounded-t-lg dark:text-black">
        <div className="section-info">
          {/* <h2>{currentSection}</h2> */}
          <h2>MJ Study Abroad</h2>
        </div>
        <div className="nav-buttons">
          {showAWAButtons && (
            <>
              <button>Quit w/Save</button>
              <button>Help</button>
              <button>Save</button>
            </>
          )}
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>

      {showAWAButtons && (
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
