import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <p className="text-lg text-gray-600 mb-4">Page not found</p>
            <Link to="/" className="text-blue-600 hover:underline">
                Go back home
            </Link>
        </div>
    );
};

export default NotFoundPage;
