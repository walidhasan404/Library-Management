const About = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">📚</span>
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        About TechVerse
                    </h2>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-lg font-medium">
                    Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">TechVerse</span> — the official digital platform managing the operations of the <strong>Sylhet Engineering College Library</strong>. This platform is designed to streamline and enhance the academic experience of students across all departments.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Our Departments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 dark:text-blue-400">💻</span>
                            <span>CSE (Computer Science and Engineering)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 dark:text-blue-400">⚡</span>
                            <span>EEE (Electrical and Electronic Engineering)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 dark:text-blue-400">🏗️</span>
                            <span>Civil Engineering</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 dark:text-blue-400">📖</span>
                            <span>Non-Tech Department</span>
                        </div>
                    </div>
                </div>

                <p className="text-lg font-medium">
                    Students can browse a wide range of academic and general books specific to their department. Through TechVerse, students can easily <strong>borrow books</strong> and are required to <strong>return them within a set period</strong>. This ensures efficient circulation and accessibility for all.
                </p>

                <p className="text-lg font-medium">
                    Our library is regularly updated with new titles and resources. The <strong>librarian (admin)</strong> manages all book additions and ensures the library stays up-to-date with the latest materials needed for academic success.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border-l-4 border-purple-600">
                    <p className="text-lg font-medium italic">
                        Whether you're preparing for exams, working on a project, or just exploring knowledge, TechVerse is your one-stop solution to all things academic and literary at Sylhet Engineering College.
                    </p>
                </div>

                <div className="text-center pt-4">
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                        Thank you for using <span className="font-bold text-blue-600 dark:text-blue-400">TechVerse</span>
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Let's read, learn, and grow together.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
