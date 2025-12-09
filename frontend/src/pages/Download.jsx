import { useContext, useState, useRef, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import { useSubjects } from "../lib/useSubjects";
import { useDebounce } from "../lib/useDebounce";
import PreferenceSelector from "../components/download/PreferenceSelector";
import FilterBar from "../components/download/FilterBar";
import ResultsInfo from "../components/download/ResultsInfo";
import SubjectsGrid from "../components/download/SubjectsGrid";
import Pagination from "../components/download/Pagination";

export default function Download() {
    const { theme } = useContext(ThemeContext);

    // Preference selection state
    const [showPreferenceSelector, setShowPreferenceSelector] = useState(() => {
        const saved = localStorage.getItem('downloadPreferences');
        return !saved;
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

    // Fetch subjects with React Query
    const { data: subjects = [], isLoading, isError, error } = useSubjects();

    // Debounce search query
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Filter subjects
    const filteredSubjects = useMemo(() => {
        let filtered = [...subjects];

        if (selectedBranch !== "All Branches") {
            filtered = filtered.filter(subject => subject.branch === selectedBranch);
        }

        if (selectedSemester !== "All Semesters") {
            const semNum = parseInt(selectedSemester.replace(/\D/g, ''));
            filtered = filtered.filter(subject => subject.semester === semNum);
        }

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

    // Handle clear filters
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
        
        localStorage.setItem('downloadPreferences', JSON.stringify(preferences));
        
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

    // Pagination calculations
    const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    // Generate page numbers
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

    // Show preference selector if needed
    if (showPreferenceSelector) {
        return (
            <div className={`${theme === "dark" ? "bg-[#0B1220]" : "bg-gradient-to-br from-white via-blue-200 to-teal-100"} min-h-screen`}>
                <Navbar />
                <PreferenceSelector 
                    theme={theme} 
                    onSubmit={handlePreferenceSubmit}
                    onSkip={() => setShowPreferenceSelector(false)}
                />
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
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                    selectedSemester={selectedSemester}
                    setSelectedSemester={setSelectedSemester}
                    handleClear={handleClear}
                    theme={theme}
                />

                <ResultsInfo
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalResults={filteredSubjects.length}
                    userPreferences={userPreferences}
                    handleResetPreferences={handleResetPreferences}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    theme={theme}
                />
            </div>

            {/* Subjects Grid */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <SubjectsGrid
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    filteredSubjects={filteredSubjects}
                    currentSubjects={currentSubjects}
                    startIndex={startIndex}
                    theme={theme}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    getPageNumbers={getPageNumbers}
                    theme={theme}
                />
            </div>

            <Footer />
        </div>
    );
}
