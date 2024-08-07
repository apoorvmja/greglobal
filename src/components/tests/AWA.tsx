// src/components/tests/AWA.tsx
import { useRef } from 'react';
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
    onContinue: () => void;
}

const AWA: React.FC<Props> = ({ test, onContinue }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCut = () => {
        if (textareaRef.current) {
            document.execCommand('cut');
        }
    };

    const handlePaste = () => {
        if (textareaRef.current) {
            document.execCommand('paste');
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

    return (
        <TestLayout currentSection="Analytical Writing: Issue Essay" onContinue={onContinue} showAWAButtons={true}>
            <div className="awa-container">
                <div className="prompt-container">
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
                        className='p-2 border-2 rounded-lg'
                    ></textarea>
                </div>
            </div>
            <style jsx>{`
        .awa-container {
          display: flex;
          flex-direction: row;
          height: 100%;
        }
        .prompt-container {
          flex: 1;
          padding: 20px;
          border-right: 1px solid #ccc;
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
