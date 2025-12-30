import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

export default function Footer() {
    const { theme } = useContext(ThemeContext);

    return (
        <footer className={`mt-auto py-6 px-6 border-t ${theme === "dark"
            ? "border-white/[0.08]"
            : "border-gray-200"
            }`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Made with ❤️ for IET Students.
                    </p>

                    {/* Links */}
                    <div className="flex gap-6">
                        <Link
                            to="/"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-[#0FB8AD]"
                                : "text-gray-600 hover:text-teal-600"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-[#0FB8AD]"
                                : "text-gray-600 hover:text-teal-600"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            to="/download"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-[#0FB8AD]"
                                : "text-gray-600 hover:text-teal-600"
                                }`}
                        >
                            Browse
                        </Link>
                        <Link
                            to="/request-feature"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-[#0FB8AD]"
                                : "text-gray-600 hover:text-teal-600"
                                }`}
                        >
                            Request a Feature
                        </Link>
                        <a
                            href="mailto:support@ietconnect.edu"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-[#0FB8AD]"
                                : "text-gray-600 hover:text-teal-600"
                                }`}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
