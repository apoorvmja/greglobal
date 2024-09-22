// src/components/InitialAWAInstructions.tsx
import TestLayout from './TestLayout';

interface Props {
    onContinue: () => void;
}

const InitialQuantInstructions: React.FC<Props> = ({ onContinue }) => {
    return (
        <TestLayout currentSection="Analytical Writing: Issue Essay" onContinue={onContinue}>
            <div className='rounded min-h-[60vh] px-6 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
                <h1 className='text-2xl font-semibold mb-4 text-center'>Quantitative Reasoning Instructions</h1>
                <div className='space-y-4'>
                    <p className='text-lg'>
                        <span className='font-bold'>12 Questions</span> <br />
                        <span className='font-bold'>21 Minutes</span>
                    </p>
                    <p>
                        For each question, indicate the best answer, using the directions given. If you need more detailed directions, click Help at any time.
                    </p>
                    <p>
                        An on-screen calculator is available for each question in this section. To use the calculator, click the calculator icon at the top of the screen.
                    </p>
                    <p>
                        If a question has answer choices with <span className='font-bold'>ovals</span>, then the correct answer consists of a single choice. If a question has answer choices with <span className='font-bold'>square boxes</span>, then the correct answer consists of one or more answer choices. Read the directions for each question carefully.
                    </p>
                    <p>
                        All numbers used are real numbers. All figures are assumed to lie in a plane unless otherwise indicated.
                    </p>
                    <p>
                        Geometric figures, such as lines, circles, triangles, and quadrilaterals, are not necessarily drawn to scale. You should not assume that quantities such as lengths and angle measures are as they appear in a figure. However, you should assume that lines shown as straight are actually straight, points on a line are in the order shown, and more generally, all geometric objects are in the relative positions shown. For questions with geometric figures, base your answers on geometric reasoning, not estimating or comparing quantities by sight or measurement.
                    </p>
                    <p>
                        Coordinate systems, such as xy-planes and number lines, are drawn to scale; therefore, you can read, estimate, or compare quantities in such figures by sight or measurement.
                    </p>
                    <p>
                        Graphical data presentations, such as bar graphs, circle graphs, and line graphs, are drawn to scale; therefore, you can read, estimate, or compare quantities in such figures by sight or measurement.
                    </p>
                </div>
            </div>
        </TestLayout>
    );
};

export default InitialQuantInstructions;