import SubjectCard from "../SubjectCard";

export default function SubjectsGrid({ 
    isLoading, 
    isError, 
    error, 
    filteredSubjects, 
    currentSubjects, 
    startIndex, 
    theme 
}) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === "dark" ? "border-[#0FB8AD]" : "border-teal-500"}`}></div>
            </div>
        );
    }

    if (isError) {
        return (
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
        );
    }

    if (filteredSubjects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className={`text-xl font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    No subjects found
                </p>
                <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                    Admin needs to add subjects first
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSubjects.map((subject, index) => (
                <SubjectCard 
                    key={subject._id} 
                    subject={subject} 
                    index={startIndex + index} 
                />
            ))}
        </div>
    );
}
