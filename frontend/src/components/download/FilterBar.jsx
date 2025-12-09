import { FaFilter } from "react-icons/fa";
import ModernDropdown from "./ModernDropdown";
import SearchBar from "./SearchBar";

export default function FilterBar({ 
    searchQuery, 
    setSearchQuery, 
    selectedBranch, 
    setSelectedBranch, 
    selectedSemester, 
    setSelectedSemester, 
    handleClear, 
    theme 
}) {
    return (
        <div className={`w-full rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 border ${
            theme === "dark" 
                ? "border-white/10 bg-white/[0.02] backdrop-blur-lg" 
                : "border-gray-200 bg-white/60 shadow-lg"
        }`}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} theme={theme} />

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
    );
}
