import { useContext, useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import { subjects } from "../lib/subjects";
import { FaSearch, FaChevronDown, FaFilter } from "react-icons/fa";

// Custom Modern Dropdown Component
function ModernDropdown({ options, value, onChange, placeholder, theme, icon }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl font-medium transition-all min-w-[120px] md:min-w-[160px] ${theme === "dark"
                    ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                    : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm"
                    }`}
            >
                <span className="flex items-center gap-2 text-xs md:text-sm">
                    {icon && <span className="text-purple-500">{icon}</span>}
                    {value || placeholder}
                </span>
                <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl border z-50 ${theme === "dark"
                        ? "bg-[#1e293b] border-white/10 backdrop-blur-xl"
                        : "bg-white border-gray-200"
                        }`}
                >
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 transition-all text-xs md:text-sm ${value === option
                                ? theme === "dark"
                                    ? "bg-blue-500/20 text-blue-300 font-medium"
                                    : "bg-blue-50 text-blue-700 font-medium"
                                : theme === "dark"
                                    ? "text-gray-300 hover:bg-white/[0.05]"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Download() {
    const { theme } = useContext(ThemeContext);

    const [selectedBranch, setSelectedBranch] = useState("All Branches");
    const [selectedSemester, setSelectedSemester] = useState("All Semesters");

    const handleClear = () => {
        setSelectedBranch("All Branches");
        setSelectedSemester("All Semesters");
    };

    return (
        <div className={`${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            }`}>
            <div className="min-h-screen relative">
                <Navbar />
                <div className={`mt-10 text-center ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">Subject Library</h1>
                    <p className="text-xs md:text-sm px-2">Explore Question Paper organized by subjects and branches</p>
                </div>
                {/* Search + filters - glassmorphism style */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    <div className={`w-full rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 border ${theme === "dark" ? "border-white/10 bg-white/[0.02] backdrop-blur-lg" : "border-gray-200 bg-white/60 shadow-lg"}`}>
                        <div className={`flex items-center gap-3 flex-1 rounded-xl px-4 py-2.5 border ${theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-gray-200"}`}>
                            <FaSearch className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                            <input
                                type="text"
                                placeholder="Search subjects..."
                                className={`w-full bg-transparent outline-none ${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-500"}`}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 items-stretch sm:items-center">
                            <ModernDropdown
                                options={["All Branches", "CSE", "ME", "ECE", "CHE"]}
                                value={selectedBranch}
                                onChange={setSelectedBranch}
                                placeholder="All Branches"
                                theme={theme}
                            />

                            <ModernDropdown
                                options={["All Semesters", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]}
                                value={selectedSemester}
                                onChange={setSelectedSemester}
                                placeholder="All Semesters"
                                theme={theme}
                            />

                            <button
                                onClick={handleClear}
                                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${theme === "dark" ? "text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]" : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"}`}
                            >
                                <FaFilter className="text-sm" />
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className={`text-sm mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Showing {subjects.length} of {subjects.length} subjects
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-10">
                        {subjects.map((sub, index) => (
                            <SubjectCard key={index} subject={sub} index={index} />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}