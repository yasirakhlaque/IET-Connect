export default function ResultsInfo({ 
    startIndex, 
    endIndex, 
    totalResults, 
    userPreferences, 
    handleResetPreferences, 
    itemsPerPage, 
    handleItemsPerPageChange, 
    theme 
}) {
    return (
        <div className={`flex flex-wrap items-center justify-between gap-3 text-sm mt-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <div className="flex items-center gap-3">
                <span>
                    Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} subjects
                </span>
                {userPreferences && (
                    <button
                        onClick={handleResetPreferences}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
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
    );
}
