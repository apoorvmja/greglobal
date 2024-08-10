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
  showQuantButtons?: boolean;
  quantSection?: 'quantitative1' | 'quantitative2';
}

const TestLayout: React.FC<TestLayoutProps> = ({ children, currentSection, onContinue, onBack, onExitSection, showAWAButtons = false, showVerbalButtons = false, verbalSection, showQuantButtons = false, quantSection }) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State to manage modal visibility
  const [activeTab, setActiveTab] = useState<'awa' | 'verbal' | 'quant' | 'tools'>('awa');

  const getInitialTime = () => {
    if (showVerbalButtons) {
      return verbalSection === 'verbal1' ? 1080 : 1380; // 18 minutes for Verbal 1, 23 minutes for Verbal 2
    }
    if (showQuantButtons) {
      return quantSection === 'quantitative1' ? 1260 : 1560; // 21 minutes for quant 1, 26 minutes for quant 2
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
  }, [showAWAButtons, showVerbalButtons, verbalSection, showQuantButtons]);

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

  const showHelp = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
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
              <button onClick={showHelp}>Help</button>
              <button onClick={onContinue}>Continue</button>
            </>
          )}
          {showVerbalButtons && (
            <>
              <button onClick={onExitSection}>Exit Section</button>
              <button>Quit w/Save</button>
              <button>Mark</button>
              <button>Review</button>
              <button onClick={showHelp}>Help</button>
              <button onClick={onBack}>Back</button>
              <button onClick={onContinue}>Next</button>
            </>
          )}
          {showQuantButtons && (
            <>
              <button onClick={onExitSection}>Exit Section</button>
              <button>Quit w/Save</button>
              <button>Mark</button>
              <button>Review</button>
              <button>Calculator</button>
              <button onClick={showHelp}>Help</button>
              <button onClick={onBack}>Back</button>
              <button onClick={onContinue}>Next</button>
            </>
          )}
          {!showAWAButtons && !showVerbalButtons && !showQuantButtons && (
            <button onClick={onContinue}>Continue</button>
          )}
        </div>
      </div>

      {(showAWAButtons || showVerbalButtons || showQuantButtons) && (
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

      {isHelpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[80%] h-[90%]">
            <h3 className="text-xl font-bold mb-4">Help Section</h3>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="me-2">
                <button
                  onClick={() => setActiveTab('awa')}
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'awa' ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    }`}
                >
                  AWA
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setActiveTab('verbal')}
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'verbal' ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    }`}
                >
                  Verbal
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setActiveTab('quant')}
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'quant' ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    }`}
                >
                  Quant
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`inline-block p-4 rounded-t-lg ${activeTab === 'tools' ? 'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                    }`}
                >
                  Testing Tools
                </button>
              </li>
            </ul>

            <div className="mt-4">
              {activeTab === 'awa' && (
                <div className="text-gray-700 h-96 overflow-y-scroll p-4 border border-gray-300 rounded-lg">
                  <h2 className="text-xl font-bold">Analytical Writing Assessment (AWA)</h2>

                  <p className="mt-4">The AWA section measures your ability to think critically and communicate your ideas effectively. It is composed of one timed tasks:</p>

                  <p className="mt-4">
                    <span className="font-bold">Analyze an Issue:</span> You will be presented with a statement on a topic of general interest. Your task is to analyze the issue and explain your perspective on it. You should consider the complexities of the issue and develop a well-reasoned argument to support your position.
                  </p>

                  <p className="mt-4">
                    Both tasks require you to write a clear, well-organized response that demonstrates your ability to reason logically and communicate effectively. It is important to manage your time wisely and ensure that your response is complete.
                  </p>

                  <p className="mt-4">
                    Your essays will be evaluated by both a human rater and an e-rater scoring system, which assess the overall quality of your writing. The final score is the average of the two ratings.
                  </p>

                  <p className="mt-4">
                    <span className="font-bold">Note:</span> You are allowed to use a scratch paper or a digital notepad to outline your thoughts before writing the full response. Make sure to review your essay for any grammatical or structural errors before submitting.
                  </p>

                  <p className="mt-4"><span className="font-bold">Click Return</span> to go back.</p>
                </div>
              )}
              {activeTab === 'verbal' && (
                <div className="text-gray-700 h-96 overflow-y-scroll p-4 border border-gray-300 rounded-lg">
                  <h2 className="text-xl font-bold">Verbal Reasoning</h2>

                  <p className="mt-2">27 Questions</p>

                  <p className="mt-4">
                    The Verbal Reasoning section measures your ability to analyze and evaluate written material, synthesize information obtained from it, analyze relationships among component parts of sentences, and recognize relationships among words and concepts.
                  </p>

                  <p className="mt-4">
                    The section consists of three types of questions:
                  </p>

                  <p className="mt-4">
                    <span className="font-bold">1. Reading Comprehension:</span> You will read passages and answer questions about them. Some questions involve finding specific information in the text, others may require you to understand the main idea or infer a conclusion.
                  </p>

                  <p className="mt-4">
                    <span className="font-bold">2. Text Completion:</span> You will fill in the blanks in a passage with the most appropriate words from the given options. You must understand the context and logic of the passage to select the correct words.
                  </p>

                  <p className="mt-4">
                    <span className="font-bold">3. Sentence Equivalence:</span> You will choose two options that both complete a sentence to give it a similar meaning. This tests your ability to understand the nuances of word meanings and sentence structure.
                  </p>

                  <p className="mt-4">
                    All questions are designed to test your reading and reasoning skills. It is important to read each passage carefully and consider all answer choices before making your selection.
                  </p>

                  <p className="mt-4">
                    Some questions have more than one correct answer, while others have only one. Be sure to read the instructions carefully before answering.
                  </p>

                  <p className="mt-4">
                    You may use the on-screen highlight and review features to mark important parts of the passages or return to questions later if time permits.
                  </p>

                  <p className="mt-4"><span className="font-bold">Click Return</span> to go back.</p>
                </div>
              )}
              {activeTab === 'quant' && (
                <div className="text-gray-700 h-96 overflow-y-scroll p-4 border border-gray-300 rounded-lg">

                  <h2 className="text-xl font-bold">Quantitative Reasoning</h2>
                  <p className="mt-2">27 Questions</p>

                  <p className="mt-4">For each question, indicate the best answer, using the directions given. If you need more detailed questions, click <span className="font-bold">Help</span> at any time.</p>

                  <p className="mt-4">An on-screen calculator is available for each question in this section. To use the calculator, click the calculator icon at the top of the screen.</p>

                  <p className="mt-4">If a question has answer choices with ovals, then the correct answer consists of a single choice. If a question has answer choices with square boxes, then the correct answer consists of one or more answer choices. Read the directions for each question carefully.</p>

                  <p className="mt-4">All numbers used are real numbers. All figures are assumed to lie in a plane unless otherwise indicated.</p>

                  <p className="mt-4">Geometric figures, such as lines, circles, triangles, and quadrilaterals, are not necessarily drawn to scale. That is, you should not assume that quantities such as lengths and angle measures are as they appear in a figure. You should assume, however, that lines shown as straight are actually straight, points on a line are in the order shown, and more generally, all geometric objects are in the relative points shown. For questions with geometric figures, you should base your answers on geometric reasoning, not on estimating or comparing quantities by sight or by measurement.</p>

                  <p className="mt-4">Coordinate systems, such as xy-planes and number lines, are drawn to scale; therefore, you can read, estimate, or compare quantities in such figures by sight or by measurement.</p>

                  <p className="mt-4">Graphical data presentations, such as bar graphs, circle graphs, and line graphs, are drawn to scale; therefore, you can read, estimate, or compare quantities in such figures by sight or by measurement.</p>

                  <p className="mt-4"><span className="font-bold">Click Return</span> to go back.</p>
                </div>
              )}
              {activeTab === 'tools' && (
                <div className="text-gray-700 h-96 overflow-y-scroll p-4 border border-gray-300 rounded-lg">
                  <p>After you answer a question, click <span className="font-bold">Next</span>. You may still return to the question and change your answer after clicking <span className="font-bold">Next</span>.</p>

                  <p className="mt-4">Clicking <span className="font-bold">Back</span> will take you to the previous screen or question.</p>

                  <p className="mt-4">By clicking <span className="font-bold">Help</span> you can get information on different topics by clicking on one of the tabs above. You are now in <span className="font-bold">Help</span>.</p>

                  <p className="mt-4">Clicking <span className="font-bold">Mark</span> will place a check mark in the <span className="font-bold">Review</span> screen next to a question you may want to look at again. Clicking <span className="font-bold">Mark</span> again will remove the check mark. A question will remain marked until you unmark it, even if you change your answer. Marking a question in no way affects your answer.</p>

                  <p className="mt-4">Clicking <span className="font-bold">Review</span> will display the <span className="font-bold">Review</span> screen. The <span className="font-bold">Review</span> screen lists all of the questions in the section and their status. The <span className="font-bold">Status</span> column shows whether a question is answered, incomplete, not answered, or not yet seen. The <span className="font-bold">Mark</span> column shows all questions you have marked for review. The question you were looking at last is highlighted when you enter the <span className="font-bold">Review</span> screen.</p>

                  <p className="mt-4">Clicking <span className="font-bold">Exit Section</span> will allow you to exit the section. Once you exit a section, you will not be able to return to it.</p>

                  <p className="mt-4">Clicking <span className="font-bold">Quit Test</span> will end your testing session. You will not receive any scores nor be able to send scores to any institution. Do not click <span className="font-bold">Quit Test</span> unless you want to end your session.</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeHelpModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default TestLayout;
