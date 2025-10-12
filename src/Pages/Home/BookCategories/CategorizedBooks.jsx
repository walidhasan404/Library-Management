import { useLoaderData } from "react-router-dom";
import BooksCard from "../../BooksCard2/BooksCard2";

const CategorizedBooks = () => {
    const category = useLoaderData();

    if (!category || category.length === 0) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4">No Books Found</h2>
                <p className="text-center text-gray-600">No books available in this category at the moment.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Books in <span className="text-blue-600">{category[0].category}</span> Department
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {category.map(book => (
                    <BooksCard
                        key={book._id}
                        book={book}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategorizedBooks;
