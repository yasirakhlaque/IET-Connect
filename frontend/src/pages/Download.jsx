import { useContext, useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import { FaSearch, FaChevronDown, FaFilter } from "react-icons/fa";
import SubjectCard from "../components/SubjectCard";
import { subjectAPI } from "../lib/api";

// Modern Dropdown Component
function ModernDropdown({ options, value, onChange, placeholder, theme }) {
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
                className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl font-medium transition-all min-w-[120px] md:min-w-[160px] ${
                    theme === "dark"
                        ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                        : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm"
                }`}
            >
                <span className="text-xs md:text-sm">
                    {value || placeholder}
                </span>
                <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl border z-50 ${
                        theme === "dark"
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
                            className={`w-full text-left px-4 py-2.5 transition-all text-xs md:text-sm ${
                                value === option
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

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("All Branches");
    const [selectedSemester, setSelectedSemester] = useState("All Semesters");
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch subjects from backend
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Filter subjects whenever filters change
    useEffect(() => {
        filterSubjects();
    }, [subjects, searchQuery, selectedBranch, selectedSemester]);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const response = await subjectAPI.getAll();
            setSubjects(response.data.subjects || []);
            setError("");
        } catch (err) {
            console.error("Error fetching subjects:", err);
            setError("Failed to load subjects. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filterSubjects = () => {
        let filtered = [...subjects];

        // Filter by branch
        if (selectedBranch !== "All Branches") {
            filtered = filtered.filter(subject => subject.branch === selectedBranch);
        }

        // Filter by semester
        if (selectedSemester !== "All Semesters") {
            const semNum = parseInt(selectedSemester.replace(/\D/g, ''));
            filtered = filtered.filter(subject => subject.semester === semNum);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(subject => 
                subject.name.toLowerCase().includes(query) ||
                subject.branch.toLowerCase().includes(query)
            );
        }

        setFilteredSubjects(filtered);
    };

    const handleClear = () => {
        setSearchQuery("");
        setSelectedBranch("All Branches");
        setSelectedSemester("All Semesters");
    };

    return (
        <div className={`${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            } min-h-screen`}>
            <Navbar />
            
            {/* Header */}
            <div className={`mt-10 text-center px-4 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                <h1 className="text-3xl md:text-5xl font-bold mb-3">Subject Library</h1>
                <p className="text-sm md:text-base max-w-2xl mx-auto">
                    Browse subjects and access question papers, notes, and study materials
                </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
                <div className={`w-full rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 border ${
                    theme === "dark" 
                        ? "border-white/10 bg-white/[0.02] backdrop-blur-lg" 
                        : "border-gray-200 bg-white/60 shadow-lg"
                }`}>
                    {/* Search Bar */}
                    <div className={`flex items-center gap-3 flex-1 rounded-xl px-4 py-2.5 border ${
                        theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-gray-200"
                    }`}>
                        <FaSearch className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full bg-transparent outline-none ${
                                theme === "dark" 
                                    ? "text-white placeholder-gray-400" 
                                    : "text-gray-700 placeholder-gray-500"
                            }`}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 items-stretch sm:items-center">
                        <ModernDropdown
                            options={["All Branches", "CSE", "ME", "ECE", "EE", "CE", "CHE"]}
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
                            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                                theme === "dark" 
                                    ? "text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]" 
                                    : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                            }`}
                        >
                            <FaFilter className="text-sm" />
                            Clear
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className={`text-sm mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Showing {filteredSubjects.length} of {subjects.length} subjects
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className={`text-lg ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
                            {error}
                        </p>
                        <button
                            onClick={fetchSubjects}
                            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredSubjects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            No subjects found
                        </p>
                        <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                            Admin needs to add subjects first
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubjects.map((subject, index) => (
                            <SubjectCard 
                                key={subject._id} 
                                subject={subject} 
                                index={index} 
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}