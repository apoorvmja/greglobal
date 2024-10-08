const TestInstructions = () => (
    <div className="dark:text-black bg-white rounded-lg mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Test Instructions</h2>
        <p className="mb-4 text-gray-700">
            This practice test consists of five sections: an Analytical Writing section, two Quantitative sections, and two Verbal sections. Standard timing for the entire test is roughly 2 hours (longer if you have extended time). Standard section lengths are as follows:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Analytical Writing - 30 minutes</li>
            <li>Quantitative 1 - 21 minutes</li>
            <li>Quantitative 2 - 26 minutes</li>
            <li>Verbal 1 - 18 minutes</li>
            <li>Verbal 2 - 23 minutes</li>
        </ul>
        <p className="mb-4 text-gray-700">
            The Verbal and Quantitative sections can be in a different order than what you see above. There are 60-second breaks between each section.
        </p>
        <p className="mb-4 text-gray-700">
            The test is meant to be taken in one sitting. Try to find a two-hour block of time to take the full practice test. If you are taking the test with extended time, be sure to factor that in.
        </p>
        <p className="mb-4 text-gray-700">
            During the test, hit the Continue or Next buttons to advance to the next section. If you hit the Exit Section button before finishing a section, you will advance to the next section. If you hit the Quit w/Save button, you will end your test and receive a score. Don’t select that option unless you want to finish your test.
        </p>
        <p className="text-gray-700">
            If you have any questions, reach out to your instructor or email us at <a href="mailto:enquiry@mja.in" className="text-blue-600 underline">enquiry@mja.in</a>.
        </p>
    </div>
);

export default TestInstructions;
