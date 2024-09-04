import React, { useState } from 'react';
import { X, Edit3, BookOpen, Mic, Headphones, PieChart, FileLineChart } from 'lucide-react';
import Link from 'next/link';

interface StartTestButtonProps {
    buttonId: number | null;
    onClose: () => void;
}

const StartTestButton: React.FC<StartTestButtonProps> = ({ buttonId, onClose }) => {
    // const testName = `Test ${buttonId} - ${["Lime", "Blue", "Purple", "Red", "Yellow", "Green"][buttonId ? buttonId - 1 : 0]}`;
    const testName = `Shorter GRE Test ${buttonId}`;
    const gradientColors = [
        "bg-gradient-to-r from-green-300 to-green-500",
        "bg-gradient-to-r from-blue-300 to-blue-500",
        "bg-gradient-to-r from-purple-300 to-purple-500",
        "bg-gradient-to-r from-red-300 to-red-500",
        "bg-gradient-to-r from-yellow-300 to-yellow-500",
        "bg-gradient-to-r from-green-300 to-green-500"
    ];
    const [loadingTest, setLoadingTest] = useState(false);

    const startTest = () => {
        setLoadingTest(true);
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
                    <button onClick={startTest} className='bg-gradient-to-r w-full from-blue-500 to-purple-500 text-white  rounded-[2rem]'>
                        <Link href={`tests/test${buttonId}`} className='flex text-center justify-center items-center     px-4 py-4 w-full h-full'>
                            {loadingTest ? (
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                'Full Test'
                            )}
                        </Link>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <Edit3 className="mr-2" />
                        Writing <span className='hidden sm:flex'>(AWA)</span>
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        <BookOpen className="mr-2" />
                        Verbal
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        {/* <Mic className="mr-2" /> */}
                        <PieChart className="mr-2" />
                        <span className='hidden sm:flex'>Quantitative</span><span className='flex sm:hidden'>Quant</span>
                    </button>
                    <button className="flex items-center justify-center p-6 bg-blue-100 rounded-[2rem] hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800">
                        {/* <Headphones className="mr-2" /> */}
                        <FileLineChart className="mr-2" />
                        Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartTestButton;
