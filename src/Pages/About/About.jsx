const About = () => {
    return (
        <div className="lg:m-6 m-3 bg-white p-4 lg:p-8 dark:bg-slate-700 dark:text-white">
            <h2 className="text-4xl text-center font-extrabold mb-6 text-blue-700 dark:text-blue-300">About TechVerse</h2>
            <p className="text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">TechVerse</span> — the official digital platform managing the operations of the <strong>Sylhet Engineering College Library</strong>. This platform is designed to streamline and enhance the academic experience of students across all departments.
                <br /><br />

                At TechVerse, we serve the four core departments of the institution:
                <ul className="list-disc list-inside mt-2 ml-4">
                    <li>CSE (Computer Science and Engineering)</li>
                    <li>EEE (Electrical and Electronic Engineering)</li>
                    <li>Civil Engineering</li>
                    <li>Non-Tech Department</li>
                </ul>

                <br />
                Students can browse a wide range of academic and general books specific to their department. Through TechVerse, students can easily <strong>borrow books</strong> and are required to <strong>return them within a set period</strong>. This ensures efficient circulation and accessibility for all.
                <br /><br />

                Our library is regularly updated with new titles and resources. The <strong>librarian (admin)</strong> manages all book additions and ensures the library stays up-to-date with the latest materials needed for academic success.
                <br /><br />

                Whether you're preparing for exams, working on a project, or just exploring knowledge, TechVerse is your one-stop solution to all things academic and literary at Sylhet Engineering College.
                <br /><br />

                Thank you for using <span className="font-semibold text-blue-600 dark:text-blue-400">TechVerse</span>. Let’s read, learn, and grow together.
            </p>
        </div>
    );
};

export default About;
