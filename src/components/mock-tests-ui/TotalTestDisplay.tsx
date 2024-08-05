"use client";
import { PlayCircleIcon } from "lucide-react";
import { useState } from "react";
import StartTestButton from "./StartTestButton";

const TotalTestDisplay: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

    const openTestModal = (buttonId: number) => {
        setSelectedButtonId(buttonId);
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedButtonId(null);
    };

    return (
        <section className="dark:bg-gray-900 dark:text-white rounded-lg">
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">What makes us special</h2>
                    <p className="mt-4 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
                        iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
                        quibusdam, quos fuga minima.
                    </p>
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
                                <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>
                                <p className="mt-1 text-sm dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
                                    possimus quisquam reiciendis tempora animi! Quaerat, saepe?
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {openModal && <StartTestButton buttonId={selectedButtonId} onClose={closeModal} />}
        </section>
    );
}

export default TotalTestDisplay;
