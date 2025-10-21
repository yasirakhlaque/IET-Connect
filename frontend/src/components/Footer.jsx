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
        <footer className="pb-12 pt-30 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">                            
                            <span className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-gray-900"
                                }`}>
                                IET Connect
                            </span>
                        </div>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                            Your academic companion for previous year question papers
                        </p>
                        <p className={`text-xs mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"
                            }`}>
                            © 2025 IET Connect. Made with ❤️ for students.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {option1.map((item, index) => (
                                <li key={index} className={`text-sm transition-colors cursor-pointer hover:text-purple-400 ${theme === "dark"
                                    ? "text-white"
                                    : "text-gray-500"
                                    }`}>
                                    <Link to={item.link}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="text-center">
                        <h3 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                            Support
                        </h3>
                        <ul className="space-y-2">
                            {option2.map((item, index) => (
                                <li key={index} className={`text-sm transition-colors cursor-pointer hover:text-purple-400 ${theme === "dark"
                                    ? "text-white"
                                    : "text-gray-500"
                                    }`}>
                                    <Link to={item.link}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}