import { useState } from "react";
import { FaGraduationCap, FaBook } from "react-icons/fa";

export default function PreferenceSelector({ theme, onSubmit, onSkip }) {
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
                        onClick={onSkip}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all ${
                            theme === "dark"
                                ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                                : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700"
                        }`}
                    >
                        Skip & Show All
                    </button>
                    <button
                        onClick={() => onSubmit(tempBranch, tempYear)}
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
}
