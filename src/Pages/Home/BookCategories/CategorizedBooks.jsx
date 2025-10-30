import { useLoaderData } from "react-router-dom";
import BooksCard from "../../BooksCard2/BooksCard2";

const CategorizedBooks = () => {
    const category = useLoaderData();

    if (!category || category.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">No Books Found</h2>
                <p className="text-center text-gray-600 dark:text-gray-300">No books available in this category at the moment.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">📚</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {category[0].category}
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Explore our carefully curated collection of books in the {category[0].category} category. 
                        Discover new knowledge and expand your horizons.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                        <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {category.map(book => (
                        <BooksCard
                            key={book._id}
                            book={book}
                        />
                    ))}
                </div>

                {/* Footer Stats */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-8 bg-white dark:bg-slate-800 rounded-2xl px-8 py-6 shadow-lg">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{category.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Total Books</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{category[0].category}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Category</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorizedBooks;
