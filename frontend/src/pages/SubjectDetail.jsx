import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { subjects } from "../lib/subjects";
import { FaStar, FaDownload, FaArrowLeft, FaCalendar, FaFileAlt, FaBook, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

// Sample PYQ data - You can replace this with actual data from API/backend
const samplePYQs = [
    {
        "id": 1,
        "year": "2023",
        "type": "Regular",
        "fileSize": "2.5 MB",
        "downloads": 234,
        "uploadDate": "2024-01-15",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2023",
        "uploader": "Alex Chen",
        "rating": 4.8,
        "likes": 156
    },
    {
        "id": 2,
        "year": "2023",
        "type": "Regular",
        "fileSize": "1.8 MB",
        "downloads": 189,
        "uploadDate": "2023-09-20",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2023",
        "uploader": "User 12",
        "rating": 4.6,
        "likes": 104
    },
    {
        "id": 3,
        "year": "2022",
        "type": "Regular",
        "fileSize": "2.2 MB",
        "downloads": 456,
        "uploadDate": "2023-01-10",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2022",
        "uploader": "User 13",
        "rating": 4.9,
        "likes": 251
    },
    {
        "id": 4,
        "year": "2022",
        "type": "Regular",
        "fileSize": "1.5 MB",
        "downloads": 321,
        "uploadDate": "2022-09-15",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2022",
        "uploader": "User 14",
        "rating": 4.9,
        "likes": 177
    },
    {
        "id": 5,
        "year": "2021",
        "type": "Regular",
        "fileSize": "2.0 MB",
        "downloads": 567,
        "uploadDate": "2022-01-08",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2021",
        "uploader": "User 15",
        "rating": 4.8,
        "likes": 312
    },
    {
        "id": 6,
        "year": "2021",
        "type": "Regular",
        "fileSize": "1.7 MB",
        "downloads": 412,
        "uploadDate": "2021-09-12",
        "subjectTag": "CSE",
        "semesterTag": "Sem 3",
        "title": "Data Structures and Algorithms Exam 2021",
        "uploader": "User 16",
        "rating": 4.8,
        "likes": 227
    }
];

export default function SubjectDetail() {
    const { subjectId } = useParams();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    // Find the subject by index (you can modify this to use a proper ID field)
    const subject = subjects[parseInt(subjectId)];

    if (!subject) {
        return (
            <div className={`${theme === "dark"
                ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
                : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
                }`}>
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                    <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Subject Not Found
                    </h1>
                    <Link to="/download">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold">
                            Back to Subjects
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={`${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            }`}>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all ${theme === "dark"
                        ? "text-purple-300 hover:bg-white/5"
                        : "text-purple-700 hover:bg-purple-50"
                        }`}
                >
                    <FaArrowLeft />
                    <span>Back to Subjects</span>
                </button>

                {/* Subject Header Card */}
                <div className={`rounded-2xl p-6 md:p-8 mb-8 border relative overflow-hidden ${theme === "dark"
                    ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                    : "bg-white shadow-lg border-gray-200"
                    }`}>
                    {theme === "dark" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] to-transparent pointer-events-none" />
                    )}

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${theme === "dark"
                                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                        : "bg-blue-100 text-blue-700 border border-blue-200"
                                        }`}>
                                        {subject.branch}
                                    </span>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${theme === "dark"
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        : "bg-purple-100 text-purple-700 border border-purple-200"
                                        }`}>
                                        {subject.semester}
                                    </span>
                                </div>

                                <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}>
                                    {subject.subject}
                                </h1>

                                <div className="flex flex-wrap gap-6 mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {subject.rating}
                                        </span>
                                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            Rating
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaBook className={theme === "dark" ? "text-purple-400" : "text-purple-600"} />
                                        <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {subject.credits}
                                        </span>
                                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            Credits
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaDownload className={theme === "dark" ? "text-green-400" : "text-green-600"} />
                                        <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {subject.downloads}
                                        </span>
                                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            Downloads
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex flex-col items-center justify-center p-6 rounded-xl ${theme === "dark"
                                ? "bg-white/[0.05]"
                                : "bg-gray-50"
                                }`}>
                                <IoDocumentText className={`text-5xl mb-2 ${theme === "dark" ? "text-purple-400" : "text-purple-600"
                                    }`} />
                                <span className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {subject.pyqs_available}
                                </span>
                                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    PYQs Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PYQs List Section */}
                <div>
                    <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Previous Year Question Papers
                    </h2>

                    <div className="flex flex-col gap-4">
                        {samplePYQs.map((pyq) => (
                            <PYQCard key={pyq.id} pyq={pyq} theme={theme} subjectName={subject.subject} subject={subject} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function PYQCard({ pyq, theme, subjectName, subject }) {
    const handleDownload = () => {
        // Add your download logic here
        alert(`Downloading ${subjectName} - ${pyq.year}`);
    };

    const userName = pyq.uploader.charAt(0).toUpperCase() + pyq.uploader.charAt(1).toLowerCase();

    return (
        <div className={`rounded-xl p-5 border transition-all hover:shadow-xl cursor-pointer relative overflow-hidden ${theme === "dark"
                ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-purple-500/30"
                : "bg-white shadow-md border-gray-200 hover:border-purple-300"
            }`}>
            {theme === "dark" && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Section - Badges, Title, and Meta */}
                <div className="flex-1">
                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                            }`}>
                            {subject.branch}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border border-purple-200"
                            }`}>
                            {subject.semester}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : "bg-orange-100 text-orange-700 border border-orange-200"
                            }`}>
                            {pyq.year}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg md:text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {subjectName} Exam {pyq.year}
                    </h3>

                    {/* Subtitle */}
                    <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                        {subjectName}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"
                                }`}>
                                <span className={`text-xs font-medium ${theme === "dark" ? "text-purple-300" : "text-purple-700"
                                    }`}>
                                    {userName}
                                </span>
                            </div>
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                {pyq.uploader}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaCalendar className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                {new Date(pyq.uploadDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaFileAlt className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                {pyq.fileSize}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Stats and Download Button */}
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-3 text-xs md:text-sm justify-between">
                    {/* Stats */}
                    <div className="flex gap-4 md:gap-6">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-sm" />
                            <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {subject.rating}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaDownload className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {pyq.downloads.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaThumbsUp className={`text-sm ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {pyq.likes}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            className={`p-2 rounded-lg transition-all ${theme === "dark"
                                    ? "bg-white/[0.05] hover:bg-white/[0.1] border border-white/10"
                                    : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                                }`}
                        >
                            <FaRegThumbsUp className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
                        </button>

                        <button
                            onClick={handleDownload}
                            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <FaDownload className="text-sm" />
                            {window.innerWidth < 640 ? "" : "Download"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
