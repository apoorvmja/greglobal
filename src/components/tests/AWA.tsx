import { useEffect, useRef, useState } from 'react';
import TestLayout from './TestLayout';

interface AWASection {
    prompt: string;
    instructions: string;
}

interface Test {
    sections: {
        awa: AWASection;
    };
}

interface Props {
    test: Test;
    onContinue: (score: number, text: string) => void; // Pass the score to the onContinue function
    isReviewModeResultDashboard?: boolean;
    showResult?: () => void;
    awaReviewContent?: string;
}

const AWA: React.FC<Props> = ({ test, onContinue, isReviewModeResultDashboard = false, showResult, awaReviewContent }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [essayContent, setEssayContent] = useState<string>(awaReviewContent || "");


    const handleCut = () => {
        navigator.clipboard.readText()
        const textarea = textareaRef.current;
        if (textarea) {
            const selectedText = textarea.value.substring(
                textarea.selectionStart || 0,
                textarea.selectionEnd || 0
            );
            navigator.clipboard.writeText(selectedText).then(() => {
                const start = textarea.selectionStart || 0;
                textarea.setRangeText('');
                textarea.selectionStart = start;
                textarea.selectionEnd = start;
            });
        }
    };

    const handlePaste = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            navigator.clipboard.readText().then((text) => {
                const start = textarea.selectionStart || 0;
                textarea.setRangeText(text, start, start, 'end');
            });
        }
    };

    const handleUndo = () => {
        if (textareaRef.current) {
            document.execCommand('undo');
        }
    };

    const handleRedo = () => {
        if (textareaRef.current) {
            document.execCommand('redo');
        }
    };

    const calculateScore = (wordCount: number): number => {
        if (wordCount > 200) {
            return 6;
        } else if (wordCount >= 180) {
            return 5;
        } else if (wordCount >= 150) {
            return 4;
        } else if (wordCount >= 100) {
            return 3;
        } else if (wordCount >= 50) {
            return 2;
        } else if (wordCount >= 20) {
            return 1;
        } else {
            return 0;
        }
    };

    const handleContinue = () => {
        if (!isReviewModeResultDashboard && textareaRef.current) {
            const text = textareaRef.current.value.trim();
            const wordCount = text.split(/\s+/).length; // Split by whitespace to count words
            const score = calculateScore(wordCount);
            onContinue(score, text); // Pass the score to the onContinue function
        } else if (showResult) {
            showResult(); // Go back to result dashboard
        }
    };

    return (
        <TestLayout currentSection="Analytical Writing: Issue Essay" onContinue={handleContinue} showAWAButtons={true} isReviewModeResultDashboard={isReviewModeResultDashboard} showResult={showResult}>
            <div className="flex flex-col sm:flex-row dark:text-black">
                <div className="prompt-container border-b sm:border-r sm:border-b-0">
                    <p className='border-2 rounded-md p-2 mb-4 mt-4'>{test.sections.awa.prompt}</p>
                    <p>{test.sections.awa.instructions}</p>
                    <p>The standard length for this section is 30 minutes.</p>
                </div>
                <div className="textarea-container">
                    <div className="toolbar px-2">
                        <button onClick={handleCut}>Cut</button>
                        <button onClick={handlePaste}>Paste</button>
                        <button onClick={handleUndo}>Undo</button>
                        <button onClick={handleRedo}>Redo</button>
                    </div>
                    <textarea
                        ref={textareaRef}
                        placeholder="Write your essay here..."
                        rows={20}
                        style={{ width: '100%' }}
                        className='p-2 border-2 rounded-lg dark:text-white'
                        disabled={isReviewModeResultDashboard} // Disable textarea in review mode
                        onChange={(e) => setEssayContent(e.target.value)}
                        value={essayContent}
                    ></textarea>
                </div>
            </div>
            <style jsx>{`
                .prompt-container {
                    flex: 1;
                    padding: 20px;
                }
                .textarea-container {
                    flex: 1;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                }
                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                .toolbar button {
                    margin-right: 10px;
                }
            `}</style>
        </TestLayout>
    );
};

export default AWA;
