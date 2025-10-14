import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import About from "../Pages/About/About";
import History from "../Pages/History/History";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBooks from "../Pages/AddBooks/AddBooks";
import CategorizedBooks from "../Pages/Home/BookCategories/CategorizedBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import UpdateBooks from "../Pages/UpdateBooks/UpdateBooks";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import BorrowedBooks from "../Pages/BorrowedBooks/BorrowedBooks";
import AddedBooks from "../Pages/AddedBooks/AddedBooks";
import Users from "../Pages/Users/Users";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { API_ENDPOINTS } from "../config/api";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'all',
                element: <AllBooks></AllBooks>,
            },
            {
                path: 'add',
                element: <AddBooks></AddBooks>
            },
            {
                path: 'added',
                element: <PrivateRoute><AddedBooks></AddedBooks></PrivateRoute>
            },
            {
                path: 'borrow',
                element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>
            },
            {
                path: '/book/:id',
                element: <BookDetails></BookDetails>,
                loader: async ({ params }) => {
                    const response = await fetch(API_ENDPOINTS.BOOK_BY_ID(params.id));
                    const result = await response.json();
                    return result.data;
                }
            },
            {
                path: '/updateBook/:id',
                element: <PrivateRoute><UpdateBooks></UpdateBooks></PrivateRoute>,
                loader: async ({ params }) => {
                    const response = await fetch(API_ENDPOINTS.BOOK_BY_ID(params.id));
                    const result = await response.json();
                    return result.data;
                }
            },
            {
                path: 'books/:category',
                element: <CategorizedBooks></CategorizedBooks>,
                loader: async ({ params }) => {
                    const response = await fetch(API_ENDPOINTS.BOOKS_BY_CATEGORY(params.category));
                    const result = await response.json();
                    return result.data;
                }
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: 'about',
                element: <About></About>
            },
            {
                path: 'history',
                element: <History></History>
            },
            {
                path: 'users',
                element: <PrivateRoute><Users></Users></PrivateRoute>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
        ]
    }
]);

export default router;