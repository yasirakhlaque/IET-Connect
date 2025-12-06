import { useContext, useState, useRef, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import { FaSearch, FaChevronDown, FaFilter, FaChevronLeft, FaChevronRight, FaGraduationCap, FaBook } from "react-icons/fa";
import SubjectCard from "../components/SubjectCard";
import { useSubjects } from "../lib/useSubjects";
import { useDebounce } from "../lib/useDebounce";

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

    // Preference selection state
    const [showPreferenceSelector, setShowPreferenceSelector] = useState(() => {
        // Check if user has saved preferences
        const saved = localStorage.getItem('downloadPreferences');
        return !saved; // Show selector if no preferences saved
    });
    const [userPreferences, setUserPreferences] = useState(() => {
        const saved = localStorage.getItem('downloadPreferences');
        return saved ? JSON.parse(saved) : null;
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBranch, setSelectedBranch] = useState(() => {
        const saved = localStorage.getItem('downloadPreferences');
        return saved ? JSON.parse(saved).branch : "All Branches";
    });
    const [selectedSemester, setSelectedSemester] = useState(() => {
        const saved = localStorage.getItem('downloadPreferences');
        return saved ? JSON.parse(saved).semester : "All Semesters";
    });
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const contentRef = useRef(null);

    // Use React Query hook - data is automatically cached!
    const { data: subjects = [], isLoading, isError, error } = useSubjects();

    // Debounce search query to avoid filtering on every keystroke
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Memoize filtered subjects to avoid unnecessary recalculations
    const filteredSubjects = useMemo(() => {
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

        // Filter by search query (debounced)
        if (debouncedSearchQuery.trim()) {
            const query = debouncedSearchQuery.toLowerCase();
            filtered = filtered.filter(subject => 
                subject.name.toLowerCase().includes(query) ||
                subject.branch.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [subjects, debouncedSearchQuery, selectedBranch, selectedSemester]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery, selectedBranch, selectedSemester]);

    const handleClear = () => {
        setSearchQuery("");
        setSelectedBranch("All Branches");
        setSelectedSemester("All Semesters");
        setCurrentPage(1);
    };

    // Handle preference submission
    const handlePreferenceSubmit = (branch, year) => {
        const semester = year === "1" ? "1st" : year === "2" ? "3rd" : year === "3" ? "5th" : "7th";
        const preferences = { branch, semester, year };
        
        // Save to localStorage
        localStorage.setItem('downloadPreferences', JSON.stringify(preferences));
        
        // Update state
        setUserPreferences(preferences);
        setSelectedBranch(branch);
        setSelectedSemester(semester);
        setShowPreferenceSelector(false);
    };

    // Handle preference reset
    const handleResetPreferences = () => {
        localStorage.removeItem('downloadPreferences');
        setUserPreferences(null);
        setShowPreferenceSelector(true);
        setSelectedBranch("All Branches");
        setSelectedSemester("All Semesters");
    };

    // Calculate pagination
    const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of content
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    // Preference Selector Component
    const PreferenceSelector = () => {
        const [tempBranch, setTempBranch] = useState("");
        const [tempYear, setTempYear] = useState("");

        const branches = [
            { code: "CSE", name: "Computer Science & Engineering", icon: "💻" },
            { code: "ECE", name: "Electronics & Communication", icon: "📡" },
            { code: "ME", name: "Mechanical Engineering", icon: "⚙️" },
            { code: "EE", name: "Electrical Engineering", icon: "⚡" },
            { code: "CE", name: "Civil Engineering", icon: "🏗️" },
            { code: "CHE", name: "Chemical Engineering", icon: "🧪" },
        ];

        const years = [
            { value: "1", label: "1st Year", semesters: "1st & 2nd Semester" },
            { value: "2", label: "2nd Year", semesters: "3rd & 4th Semester" },
            { value: "3", label: "3rd Year", semesters: "5th & 6th Semester" },
            { value: "4", label: "4th Year", semesters: "7th & 8th Semester" },
        ];

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
                <div className={`w-full max-w-4xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[95vh] sm:max-h-[90vh] ${
                    theme === "dark" 
                        ? "bg-[#0B1220] border border-white/10" 
                        : "bg-white"
                }`}>
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#0FB8AD] to-teal-400 mb-3 sm:mb-4">
                            <FaGraduationCap className="text-2xl sm:text-3xl text-[#0B1220]" />
                        </div>
                        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                            Welcome to Subject Library!
                        </h2>
                        <p className={`text-xs sm:text-sm px-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Let's personalize your experience. Select your branch and year to see relevant subjects.
                        </p>
                    </div>

                    {/* Branch Selection */}
                    <div className="mb-6 sm:mb-8">
                        <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                        }`}>
                            <span className="text-[#0FB8AD]">1.</span> Select Your Branch
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                            {branches.map((branch) => (
                                <button
                                    key={branch.code}
                                    onClick={() => setTempBranch(branch.code)}
                                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                                        tempBranch === branch.code
                                            ? theme === "dark"
                                                ? "border-[#0FB8AD] bg-[#0FB8AD]/10 shadow-lg shadow-[#0FB8AD]/20"
                                                : "border-teal-500 bg-teal-50 shadow-md"
                                            : theme === "dark"
                                            ? "border-white/10 hover:border-white/20 bg-white/[0.02]"
                                            : "border-gray-200 hover:border-gray-300 bg-gray-50"
                                    }`}
                                >
                                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{branch.icon}</div>
                                    <div className={`font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                                        tempBranch === branch.code
                                            ? theme === "dark" ? "text-[#0FB8AD]" : "text-teal-600"
                                            : theme === "dark" ? "text-white" : "text-gray-800"
                                    }`}>
                                        {branch.code}
                                    </div>
                                    <div className={`text-[10px] sm:text-xs leading-tight ${
                                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                        {branch.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year Selection */}
                    <div className="mb-6 sm:mb-8">
                        <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                        }`}>
                            <span className="text-[#0FB8AD]">2.</span> Select Your Year
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                            {years.map((year) => (
                                <button
                                    key={year.value}
                                    onClick={() => setTempYear(year.value)}
                                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                                        tempYear === year.value
                                            ? theme === "dark"
                                                ? "border-[#0FB8AD] bg-[#0FB8AD]/10 shadow-lg shadow-[#0FB8AD]/20"
                                                : "border-teal-500 bg-teal-50 shadow-md"
                                            : theme === "dark"
                                            ? "border-white/10 hover:border-white/20 bg-white/[0.02]"
                                            : "border-gray-200 hover:border-gray-300 bg-gray-50"
                                    }`}
                                >
                                    <FaBook className={`text-xl sm:text-2xl mb-1 sm:mb-2 mx-auto ${
                                        tempYear === year.value
                                            ? theme === "dark" ? "text-[#0FB8AD]" : "text-teal-600"
                                            : theme === "dark" ? "text-gray-400" : "text-gray-500"
                                    }`} />
                                    <div className={`font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                                        tempYear === year.value
                                            ? theme === "dark" ? "text-[#0FB8AD]" : "text-teal-600"
                                            : theme === "dark" ? "text-white" : "text-gray-800"
                                    }`}>
                                        {year.label}
                                    </div>
                                    <div className={`text-[10px] sm:text-xs leading-tight ${
                                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                        {year.semesters}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-2">
                        <button
                            onClick={() => {
                                setShowPreferenceSelector(false);
                                // Show all if they skip
                            }}
                            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all ${
                                theme === "dark"
                                    ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                                    : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700"
                            }`}
                        >
                            Skip & Show All
                        </button>
                        <button
                            onClick={() => handlePreferenceSubmit(tempBranch, tempYear)}
                            disabled={!tempBranch || !tempYear}
                            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
                                !tempBranch || !tempYear
                                    ? theme === "dark"
                                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-[#0FB8AD] to-teal-500 hover:from-[#0FB8AD]/90 hover:to-teal-600 text-[#0B1220] shadow-lg shadow-[#0FB8AD]/20"
                            }`}
                        >
                            Continue →
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Show preference selector if needed
    if (showPreferenceSelector) {
        return (
            <div className={`${theme === "dark" ? "bg-[#0B1220]" : "bg-gradient-to-br from-white via-blue-200 to-teal-100"} min-h-screen`}>
                <Navbar />
                <PreferenceSelector />
            </div>
        );
    }

    return (
        <div className={`${theme === "dark"
            ? "bg-[#0B1220]"
            : "bg-gradient-to-br from-white via-blue-200 to-teal-100"
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6" ref={contentRef}>
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
                <div className={`flex flex-wrap items-center justify-between gap-3 text-sm mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <div className="flex items-center gap-3">
                        <span>
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredSubjects.length)} of {filteredSubjects.length} subjects
                        </span>
                        {userPreferences && (
                            <button
                                onClick={handleResetPreferences}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                                    theme === "dark"
                                        ? "bg-[#0FB8AD]/10 text-[#0FB8AD] hover:bg-[#0FB8AD]/20 border border-[#0FB8AD]/20"
                                        : "bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200"
                                }`}
                            >
                                Change Preferences
                            </button>
                        )}
                    </div>
                    
                    {/* Items per page selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm">Show:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium outline-none cursor-pointer transition-all ${
                                theme === "dark"
                                    ? "bg-[#1e293b] border border-white/10 text-white hover:bg-[#334155] [&>option]:bg-[#1e293b] [&>option]:text-white"
                                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === "dark" ? "border-[#0FB8AD]" : "border-teal-500"}`}></div>
                    </div>
                ) : isError ? (
                    <div className="text-center py-20">
                        <p className={`text-lg ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
                            {error?.message || "Failed to load subjects. Please try again later."}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className={theme === "dark" 
                                ? "mt-4 px-6 py-2 bg-[#0FB8AD] hover:bg-[#0FB8AD]/80 text-[#0B1220] rounded-lg font-semibold"
                                : "mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                            }
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentSubjects.map((subject, index) => (
                                <SubjectCard 
                                    key={subject._id} 
                                    subject={subject} 
                                    index={startIndex + index} 
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        currentPage === 1
                                            ? theme === "dark"
                                                ? "bg-white/[0.02] text-gray-600 cursor-not-allowed"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : theme === "dark"
                                            ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                                    }`}
                                >
                                    <FaChevronLeft className="text-xs" />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-2">
                                    {getPageNumbers().map((page, index) => (
                                        page === '...' ? (
                                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                                    currentPage === page
                                                        ? theme === "dark"
                                                            ? "bg-[#0FB8AD] text-[#0B1220] shadow-lg shadow-[#0FB8AD]/20"
                                                            : "bg-teal-600 text-white shadow-md"
                                                        : theme === "dark"
                                                        ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                                                        : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        currentPage === totalPages
                                            ? theme === "dark"
                                                ? "bg-white/[0.02] text-gray-600 cursor-not-allowed"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : theme === "dark"
                                            ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                                    }`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <FaChevronRight className="text-xs" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}
