import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { X } from 'lucide-react';

interface ClerkLoginModalProps {
    onClose: () => void;
}

const ClerkLoginModal: React.FC<ClerkLoginModalProps> = ({ onClose }) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div className="relative bg-white rounded-[1rem] dark:bg-gray-800 dark:text-white p-4">
                {/* <button onClick={onClose} className=" text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"><X /></button> */}
                <SignIn fallbackRedirectUrl={"/mock-tests"} />
            </div>
        </div>
    );
};

export default ClerkLoginModal;
