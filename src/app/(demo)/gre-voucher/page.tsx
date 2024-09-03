export default function Page() {
    const primaryColor = "#9333EA";
    const secondaryColor = "#ff7e33";
    const infoColor = "#0C63E7";
    const grayColors = {
        50: "#FAFAFC",
        100: "#E9E9EC",
        200: "#C6C8CD",
        300: "#ACAEB6",
        400: "#92959F",
        500: "#777C87",
        600: "#5D6370",
        700: "#434959",
        800: "#293041",
        900: "#0f172a"
    };
    return (
        <div className="px-10">
            <div className="relative" id="home">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>
                <div>
                    <div className="relative pt-36 ml-auto">
                        <div className="text-center mx-auto flex flex-col items-center justify-center">
                            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Available Discounts On <br /><span className="text-[#9333EA] dark:text-white">GRE Registration</span></h1>
                            <p className="lg:w-[60%] mt-8 text-gray-700 dark:text-gray-300">Gre Voucher Code: Save @15.5%- on your ETS GRE Registration Fee! With the help of a GRE exam voucher, you can save huge money on exam fees.</p>
                            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                                <a
                                    href="https://rzp.io/l/k07xk6e"
                                    target="_blank"
                                    className="bg-[#9333EA] text-white relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                >
                                    Buy Now
                                </a>
                                <a
                                    href="https://www.toeflgoglobal.com/toefl-voucher"
                                    target="_blank"
                                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                                >
                                    <span
                                        className="relative text-base font-semibold text-primary dark:text-white"
                                    >TOEFL voucher!
                                    </span>
                                </a>
                            </div>
                            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 w-full sm:flex justify-evenly">
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                                    <p className="mt-2 text-gray-500">Original Price: 22,500<br />Our Price: 19,000</p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
                                    <p className="mt-2 text-gray-500">Voucher are recived<br /> instantly after payment</p>
                                </div>
                                <div className="text-left">
                                    <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
                                    <p className="mt-2 text-gray-500">Vouchers Sold Since<br />2023: 12,000+ units  </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                            <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                            <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                            <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                                <img src="./images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" width="" height="" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div id="features" className="mt-4 mb-8">
                <div>
                    <div className="md:w-2/3 lg:w-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary">
                            <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clip-rule="evenodd" />
                        </svg>

                        <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
                            MJ Study Abroad is a Verified ETS Partner Since 1998
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">As a trusted partner of ETS since 1998, MJ Study Abroad has been committed to helping students achieve their dreams of studying abroad. We offer comprehensive guidance, resources, and support tailored to each student's needs. Whether you're preparing for TOEFL, GRE, or any other standardized test, our expertise ensures you're on the right path to success. Join the thousands of students who have already benefited from our services and take the next step in your academic journey with confidence.</p>
                    </div>
                    <div
                        className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
                    >
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                                    className="w-12"
                                    width="512"
                                    height="512"
                                    alt="burger illustration"
                                />

                                <div className="space-y-2">
                                    <h5
                                        className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary"
                                    >
                                        Trusted Since 1998
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Our long-standing partnership with ETS means you're getting authentic vouchers every time.
                                    </p>
                                </div>
                                {/* <a href="#" className="flex items-center justify-between group-hover:text-secondary">
                                    <span className="text-sm">Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
                                    className="w-12"
                                    width="512"
                                    height="512"
                                    alt="burger illustration"
                                />

                                <div className="space-y-2">
                                    <h5
                                        className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary"
                                    >
                                        Significant Savings
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Save 15.5% on your GRE exam fees with our exclusive discount vouchers.
                                    </p>
                                </div>
                                {/* <a href="#" className="flex items-center justify-between group-hover:text-secondary">
                                    <span className="text-sm">Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                        <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
                                    className="w-12"
                                    width="512"
                                    height="512"
                                    alt="burger illustration"
                                />

                                <div className="space-y-2">
                                    <h5
                                        className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary"
                                    >
                                        24/7 Customer Support
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Our dedicated support team is available around the clock to assist with any queries.
                                    </p>
                                </div>
                                {/* <a href="#" className="flex items-center justify-between group-hover:text-secondary">
                                    <span className="text-sm">Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                        <div
                            className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
                        >
                            <div
                                className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4341/4341025.png"
                                    className="w-12"
                                    width="512"
                                    height="512"
                                    alt="burger illustration"
                                />

                                <div className="space-y-2">
                                    <h5
                                        className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary"
                                    >
                                        And Much More!
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Explore additional features and services designed to help you succeed in your GRE and beyond.
                                    </p>
                                </div>
                                {/* <a href="#" className="flex items-center justify-between group-hover:text-secondary">
                                    <span className="text-sm">Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                        <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="solution" className="mb-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500">
                        <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
                    </svg>

                    <div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
                        <div className="md:5/12 lg:w-1/2">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1670509045675-af9f249b1bbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dm91Y2hlcnxlbnwwfHwwfHx8MA%3D%3D"
                                alt="GRE Discount"
                                loading="lazy"
                                width=""
                                height=""
                                className="w-full rounded-lg"
                            />
                        </div>
                        <div className="md:7/12 lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                                Get GRE Vouchers at 15.5% Off!
                            </h2>
                            <p className="my-8 text-gray-600 dark:text-gray-300">
                                Save big on your GRE preparation with our exclusive discount codes! Purchase a GRE voucher from us and enjoy a 15.5% discount on the official exam fee. This is a limited-time offer, so grab your voucher now and take the next step toward achieving your academic goals without breaking the bank. <br /> <br /> Our vouchers are verified and easy to use, ensuring a hassle-free experience when you register for the GRE. Plus, with 24/7 customer support, we're here to help you every step of the way.
                            </p>
                            <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
                                <div className="mt-8 flex gap-4 md:items-center">
                                    <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
                                            <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="w-5/6">
                                        <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">Easy to Redeem</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Our vouchers are simple to use, making your GRE registration smooth and convenient.</p>
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-4 md:items-center">
                                    <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
                                            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="w-5/6">
                                        <h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">24/7 Customer Support</h3>
                                        <p className="text-gray-500 dark:text-gray-400">We're here to assist you with any questions or concerns at any time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-gray-600 dark:text-gray-300" id="reviews">
                <div>
                    <div className="mb-20 space-y-4 px-6 md:px-0">
                        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                            What Our Customers Are Saying
                        </h2>
                    </div>
                    <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"Thanks to MJ Study Abroad, I was able to save a significant amount on my GRE exam fees with their discount vouchers. The process was smooth, and their customer support was top-notch!"</p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Yuvraj Choudhary</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Toefl and Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"I highly recommend MJ Study Abroad for anyone looking to take the GRE. Their discount vouchers are genuine, and the savings were incredibly helpful!"</p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Arkadip</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Ielts and Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"The support team at MJ Study Abroad is amazing. They were there to help me every step of the way, and I got my GRE voucher with no issues at all."</p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Swapnil Karan</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"The process of getting a GRE discount voucher through MJ Study Abroad was seamless. The savings were great, and the experience was hassle-free."</p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Andy</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"MJ Study Abroad not only helped me with GRE vouchers but also provided excellent support throughout my preparation journey. Highly recommended!"</p>
                        </div>
                        <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div className="flex gap-4">
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-white">Archit</h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Duolingo and Gre Student</p>
                                </div>
                            </div>
                            <p className="mt-8">"The GRE discount voucher from MJ Study Abroad was a great deal. The process was easy, and their customer service is excellent. I'll definitely recommend them to my friends."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="relative py-16">
                <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>
                <div>
                    <div className="relative">
                        <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
                            <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">Get Started now</h1>
                            <p className="text-center text-xl text-gray-600 dark:text-gray-300">
                                Be part of millions people around the world trusting gregoglobal.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <a
                                    href="#"
                                    className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                >
                                    <span className="relative text-base font-semibold text-white dark:text-dark">
                                        Get Started
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                                >
                                    <span className="relative text-base font-semibold text-primary dark:text-white">
                                        More about
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div id="blog" className="mb-5 mt-10">
                <div>
                    <div className="mb-12 space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Latest Articles</h2>
                        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
                            Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia
                            aliquid explicabo? Excepturi, voluptate?
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                            <div className="relative overflow-hidden rounded-xl">
                                <img src="https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                                    alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="mt-6 relative">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    De fuga fugiat lorem ispum laboriosam expedita.
                                </h3>
                                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                    Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
                                </p>
                                <a className="inline-block" href="#">
                                    <span className="text-info dark:text-blue-300">Read more</span>
                                </a>
                            </div>

                        </div>
                        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                            <div className="relative overflow-hidden rounded-xl">
                                <img src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                                    alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="mt-6 relative">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    De fuga fugiat lorem ispum laboriosam expedita.
                                </h3>
                                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                    Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
                                </p>
                                <a className="inline-block" href="#">
                                    <span className="text-info dark:text-blue-300">Read more</span>
                                </a>
                            </div>

                        </div>
                        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                            <div className="relative overflow-hidden rounded-xl">
                                <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                                    alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="mt-6 relative">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    De fuga fugiat lorem ispum laboriosam expedita.
                                </h3>
                                <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                    Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
                                </p>
                                <a className="inline-block" href="#">
                                    <span className="text-info dark:text-blue-300">Read more</span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div> */}

            <section className="bg-white dark:bg-gray-900 mt-10 mb-2 rounded-3xl">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                    <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        <div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    How do I use the GRE discount voucher?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">Once you purchase a GRE discount voucher from us, you'll receive a unique code via email. During the GRE registration process on the ETS website, you can apply this code at checkout to receive a 15.5% discount on your exam fee.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Are the vouchers valid for all GRE test dates?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">Yes, our GRE discount vouchers are valid for any test date available on the ETS website. However, please ensure to use the voucher before it expires, which is typically 12 months from the date of purchase.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What happens if I lose my voucher code?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">If you lose your voucher code, please contact our support team immediately. We can resend the code to your registered email address. Please keep your voucher code secure to avoid any issues.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Can I use multiple vouchers for one GRE exam?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">No, only one voucher can be applied per GRE exam registration. If you have multiple vouchers, you can use them for different test registrations or share them with others.</p>
                            </div>
                        </div>
                        <div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    What payment methods do you accept for purchasing vouchers?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">We accept various payment methods including credit/debit cards, PayPal, and other secure online payment options. All transactions are processed securely to ensure your information is protected.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Is there a refund policy for vouchers?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">Yes, if for any reason you need to cancel your voucher purchase, please contact us within 14 days of purchase. We will process a refund, provided the voucher has not been redeemed.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    Can I transfer my voucher to someone else?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">Yes, the GRE discount voucher can be transferred to another person as long as it has not been redeemed. Simply share the voucher code with them, and they can use it during their GRE registration process.</p>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    How soon will I receive my voucher after purchase?
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">You will receive your GRE discount voucher code via email within minutes of completing your purchase. If you do not receive it, please check your spam folder or contact our support team for assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    )
}