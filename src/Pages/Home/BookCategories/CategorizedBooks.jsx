import { useLoaderData } from "react-router-dom";
import BooksCard from "../../BooksCard2/BooksCard2";

const CategorizedBooks = () => {

    const category = useLoaderData();

    return (
        <div>
            <h2 className="text-xl font-semibold text-center mb-4">Books in {category[0].category} category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 my-3">
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