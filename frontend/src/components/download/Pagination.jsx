import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, handlePageChange, getPageNumbers, theme }) {
    if (totalPages <= 1) return null;

    return (
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
    );
}
