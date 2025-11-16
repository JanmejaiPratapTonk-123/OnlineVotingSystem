import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-indigo-600 dark:text-indigo-400">Online Voting System</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              A secure, scalable, and anonymous platform for modern elections. Cast your vote from anywhere with real-time results and unbreakable data integrity. Powered by MERN stack and cloud technology.
            </p>
            <div className="mt-10 sm:mt-12 flex justify-center space-x-4 sm:space-x-6">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Voter Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 dark:bg-gray-700 dark:text-indigo-400 dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Register to Vote
              </Link>
              <Link
                to="/verify"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Verify Account
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative">
        <div className="absolute inset-0 flex flex-col" aria-hidden="true">
          <div className="flex-1" />
          <div className="flex-1 w-full bg-gray-100 dark:bg-gray-800 lg:absolute lg:inset-y-0 lg:w-auto lg:right-0" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose Our System?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Built with cutting-edge technology to ensure transparency and security for every vote.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="translate-y-1/2 transform rounded-full bg-indigo-500 p-5 text-white shadow-lg">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Secure & Encrypted</h3>
                  <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                    Votes are encrypted with AES and stored anonymously. No one can trace your choice.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="translate-y-1/2 transform rounded-full bg-green-500 p-5 text-white shadow-lg">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Anonymity Guaranteed</h3>
                  <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                    Role-based access and OTP verification ensure privacy while preventing duplicates.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="translate-y-1/2 transform rounded-full bg-blue-500 p-5 text-white shadow-lg">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Real-Time Results</h3>
                  <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                    Live updates with charts and analytics. Admins manage elections seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="bg-indigo-800 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Participate?
          </h2>
          <p className="mt-4 text-xl text-indigo-200">
            Join thousands in secure online voting.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;