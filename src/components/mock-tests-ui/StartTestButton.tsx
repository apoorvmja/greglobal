import React from 'react';
import { X, Edit3, BookOpen, Mic, Headphones } from 'lucide-react';
import Link from 'next/link';

interface StartTestButtonProps {
    buttonId: number | null;
    onClose: () => void;
}

const StartTestButton: React.FC<StartTestButtonProps> = ({ buttonId, onClose }) => {
    const testName = `Test ${buttonId} - ${["Lime", "Blue", "Purple", "Red", "Yellow", "Green"][buttonId ? buttonId - 1 : 0]}`;
    const gradientColors = [
        "bg-gradient-to-r from-green-300 to-green-500",
        "bg-gradient-to-r from-blue-300 to-blue-500",
        "bg-gradient-to-r from-purple-300 to-purple-500",
        "bg-gradient-to-r from-red-300 to-red-500",
        "bg-gradient-to-r from-yellow-300 to-yellow-500",
        "bg-gradient-to-r from-green-300 to-green-500"
    ];
    const startTest = () => {
        enterFullscreen()
        // window.location.href = `tests/test${buttonId}`
    }

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-[4rem] p-6 py-12 dark:bg-gray-800 dark:text-white md:w-[50%] xl:w-[40%]">
                <div className="flex justify-between items-center mb-4">
                    <div className={`rounded-[2rem] p-8 flex items-center justify-center w-full ${gradientColors[buttonId ? buttonId - 1 : 0]}`}>
                        <h2 className="text-xl font-bold text-white">{testName}</h2>
                    </div>
                    <button onClick={onClose} className=" ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500">
                        <X />
                    </button>
                </div>
                <div className="flex justify-center mb-4 text-center">
                    <Link href={`tests/test${buttonId}`} className='bg-gradient-to-r w-full from-blue-500 to-purple-500 text-white px-4 py-4 rounded-[2rem]'>
                        <button onClick={startTest}>
                            Full Test
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <Edit3 className="mr-2" />
                        Writing
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <BookOpen className="mr-2" />
                        Reading
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <Mic className="mr-2" />
                        Speaking
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <Headphones className="mr-2" />
                        Listening
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartTestButton;
