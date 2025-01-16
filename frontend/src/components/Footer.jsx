import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Werefa Queue Management System</p>
                <p className="text-sm">Made with ❤️ for seamless queueing</p>
            </div>
        </footer>
    );
};

export default Footer;
