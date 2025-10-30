const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">📚</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                TechVerse
                            </h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            The official digital platform for Sylhet Engineering College Library. 
                            Empowering students to explore knowledge and academic excellence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/books" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                                    All Books
                                </a>
                            </li>
                            <li>
                                <a href="/borrowed" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                                    Borrowed Books
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
        <div>
                        <h4 className="text-lg font-semibold mb-4 text-blue-400">Get In Touch</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-300">
                                <span>library@sec.edu</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <span>Sylhet Engineering College, Sylhet</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <span>Library Management System</span>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h5 className="text-sm font-semibold mb-3 text-blue-400">Follow Us</h5>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-white">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-white">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-white">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © 2024 <span className="text-blue-400 font-semibold">TechVerse</span>. All rights reserved. 
                            Built with ❤️ for Sylhet Engineering College.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Library Status: Active</span>
                        </div>
                    </div>
                </div>
            </div>
            </footer>
    );
};

export default Footer;