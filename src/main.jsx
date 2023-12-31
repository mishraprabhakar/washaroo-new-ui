import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ChakraProvider, createStandaloneToast} from "@chakra-ui/react";
import HomePage from "./pages/Home.jsx";
import RootLayout from "./pages/Root.jsx";
import LoginPage from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ViewProfilePage from "./pages/ViewProfile.jsx";
import SearchPage from "./pages/Search.jsx";

const {ToastContainer} = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "about",
                element: <h1>This is about us page</h1>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "signup",
                element: <SignUpPage/>
            },
            {
                path: "view/:userId",
                element: <ViewProfilePage/>
            },
            {
                path: "search/:query",
                element: <SearchPage/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
            <ToastContainer/>
        </ChakraProvider>
    </React.StrictMode>,
)
