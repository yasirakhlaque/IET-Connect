import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaExclamationTriangle, FaHome, FaDownload } from "react-icons/fa";

export default function NotFound() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            }`}>
            <Navbar />
            
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                    {/* 404 Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className={`p-6 rounded-full ${theme === "dark"
                            ? "bg-purple-500/20"
                            : "bg-purple-100"
                            }`}>
                            <FaExclamationTriangle className={`text-6xl ${theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                                }`} />
                        </div>
                    </div>

                    {/* 404 Text */}
                    <h1 className={`text-8xl md:text-9xl font-bold mb-4 ${theme === "dark"
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                        }`}>
                        404
                    </h1>

                    <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                        }`}>
                        Page Not Found
                    </h2>

                    <p className={`text-lg mb-8 ${theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-600"
                        }`}>
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 justify-center w-full sm:w-auto">
                                <FaHome />
                                Go to Home
                            </button>
                        </Link>
                        <Link to="/download">
                            <button className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center w-full sm:w-auto border-2 ${theme === "dark"
                                ? "border-purple-500 text-purple-300 hover:bg-purple-500/10"
                                : "border-purple-500 text-purple-700 hover:bg-purple-50"
                                }`}>
                                <FaDownload />
                                Browse Subjects
                            </button>
                        </Link>
                    </div>

                    {/* Helpful Links */}
                    <div className={`mt-12 pt-8 border-t ${theme === "dark"
                        ? "border-white/10"
                        : "border-gray-200"
                        }`}>
                        <p className={`text-sm mb-4 ${theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}>
                            Looking for something specific?
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/upload" className={`text-sm hover:underline ${theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                                }`}>
                                Upload Question Papers
                            </Link>
                            <Link to="/profile" className={`text-sm hover:underline ${theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                                }`}>
                                My Profile
                            </Link>
                            <Link to="/login" className={`text-sm hover:underline ${theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                                }`}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
