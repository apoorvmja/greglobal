"use client";
import { PlayCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import StartTestButton from "./StartTestButton";
import ClerkLoginModal from "../ui/ClerkLoginModal";
import { useUser } from "@clerk/nextjs"
import { Button } from "../ui/button";
import { UserDataModal } from "../UserDataModal";

const TotalTestDisplay: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);
    const { isSignedIn, user } = useUser();
    const [loginopenModal, setLoginOpenModal] = useState<boolean>(false);
    const [SessionStorageToUserDetailsModal, setsessionStorageToUserDetailsModal] = useState(false)
    const openTestModal = (buttonId: number) => {
        setSelectedButtonId(buttonId);
        if (isSignedIn) setOpenModal(true);
        // else setLoginOpenModal(!loginopenModal)
        else window.location.href = "https://accounts.gregoglobal.com/sign-in?redirect_url=https%3A%2F%2Fgregoglobal.com%2Fmock-tests"
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedButtonId(null);
        setLoginOpenModal(false)
    };


    const testDescriptions: Record<number, string> = {
        1: "A medium-level test designed to enhance analytical writing, quantitative reasoning, and verbal skills through diverse, timed questions.",
        2: "A balanced test with challenging questions aimed at improving problem-solving, reading comprehension, and time management under pressure.",
        3: "Focuses on sharpening critical thinking and reasoning abilities with a mix of medium-difficulty verbal and quantitative questions.",
        4: "Designed to simulate real test conditions, it helps improve response accuracy and efficiency across various question types.",
        5: "Offers a combination of moderately difficult tasks, boosting test-taking stamina, time management, and cognitive reasoning under realistic conditions.",
        6: "A moderately challenging test, encouraging strategic thinking and problem-solving with a range of verbal and quantitative questions."
    };

    useEffect(() => {
        const data = sessionStorage.getItem("formData")
        if (data) {
            setsessionStorageToUserDetailsModal(true)
        } else {
            setsessionStorageToUserDetailsModal(false)
        }
    }, [])

    return (
        <section className=" dark:text-white rounded-lg dark:bg-black dark:border-white dark:border-2">
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="max-w flex flex-col gap-5 sm:gap-0 sm:flex-row">
                    <div className="sm:w-[60%]">
                        <h2 className="text-3xl font-bold sm:text-4xl">Full length practice tests</h2>
                        <p className="mt-4 dark:text-gray-300">
                            Welcome to our comprehensive test preparation platform, where you can explore and navigate through a variety of practice tests designed to sharpen your skills and boost your confidence.
                        </p>
                    </div>
                    <div className="sm:w-[40%] flex flex-col">
                        <div role="status" className="animate-pulse p-5 bg-gray-300 dark:bg-gray-700 rounded-lg rounded-b-none shadow-lg w-full flex flex-col bg-cover bg-center gap-5 h-[150px] overflow-hidden animate-zoom items-center justify-center" style={{ backgroundImage: `url('/application-work-plane.webp')`, }}>
                        </div>
                        <UserDataModal ExtractDataFromSessionStorage={SessionStorageToUserDetailsModal} />
                    </div>

                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((buttonId) => (
                        <div className="flex items-start gap-4" key={buttonId}>
                            <button
                                onClick={() => openTestModal(buttonId)}
                                className="shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 p-4"
                            >
                                <PlayCircleIcon />
                            </button>
                            <div>
                                <h2 className="text-lg font-bold">Test Number {buttonId}</h2>
                                <p className="mt-1 text-sm dark:text-gray-300">
                                    {testDescriptions[buttonId] || "Test description not available."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openModal && <StartTestButton buttonId={selectedButtonId} onClose={closeModal} />}

            {loginopenModal && <ClerkLoginModal onClose={closeModal} />}

            <style jsx>{`
                @keyframes zoom {
                    0% {
                      background-size: 120%;
                    }
                    100% {
                      background-size: 150%;
                    }
                }
                .animate-zoom {
                  animation: zoom 5s infinite alternate ease-in-out;
                }
            `}</style>
        </section>
    );
}

export default TotalTestDisplay;
