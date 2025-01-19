import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Werefa</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your ultimate solution for queue management. Say goodbye to waiting!
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-100 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Choose Werefa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow bg-gray-50 text-center">
              <h3 className="text-lg font-bold text-gray-800">Save Time</h3>
              <p className="text-gray-600 mt-2">
                Reduce waiting times and improve customer satisfaction.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow bg-gray-50 text-center">
              <h3 className="text-lg font-bold text-gray-800">
                Seamless Management
              </h3>
              <p className="text-gray-600 mt-2">
                Organize queues effortlessly with our powerful tools.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow bg-gray-50 text-center">
              <h3 className="text-lg font-bold text-gray-800">
                Real-Time Insights
              </h3>
              <p className="text-gray-600 mt-2">
                Get analytics and reports to improve your services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
