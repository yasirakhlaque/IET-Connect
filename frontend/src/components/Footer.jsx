import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { IoDocumentText } from "react-icons/io5";

export default function Footer() {
    const { theme } = useContext(ThemeContext);

    const option1 = [
        { name: "Home", link: "/" },
        { name: "Download", link: "/download" },
        { name: "Upload", link: "/download" },
    ]
    const option2 = [
        { name: "FAQs", link: "/faq" },
        { name: "Community", link: "/community" },
        { name: "Help", link: "/help" },
    ]
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
                        <a
                            href="#"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-purple-400"
                                : "text-gray-600 hover:text-purple-600"
                                }`}
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-purple-400"
                                : "text-gray-600 hover:text-purple-600"
                                }`}
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className={`text-sm transition-colors ${theme === "dark"
                                ? "text-gray-400 hover:text-purple-400"
                                : "text-gray-600 hover:text-purple-600"
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