import { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { questionPaperAPI, subjectAPI } from "../lib/api";
import { FaStar, FaDownload, FaArrowLeft, FaCalendar, FaFileAlt, FaBook, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function SubjectDetail() {
    const { subjectId } = useParams();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [subject, setSubject] = useState(null);
    const [questionPapers, setQuestionPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [likedPapers, setLikedPapers] = useState({});

    useEffect(() => {
        fetchSubject();
        fetchQuestionPapers();
    }, [subjectId]);

    const fetchSubject = async () => {
        try {
            const response = await subjectAPI.getById(subjectId);
            setSubject(response.data.subject);
        } catch (err) {
            console.error("Error fetching subject:", err);
            setSubject(null);
        }
    };

    const fetchQuestionPapers = async () => {
        try {
            setLoading(true);
            const response = await questionPaperAPI.getAll();
            
            // Filter papers for this specific subject by ID
            const subjectPapers = response.data.questionPapers.filter(
                paper => paper.subject?._id === subjectId || paper.subject === subjectId
            );
            
            setQuestionPapers(subjectPapers);
            setError("");
        } catch (err) {
            console.error("Error fetching question papers:", err);
            setError("Failed to load question papers. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (paperId) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
            const downloadUrl = `${baseUrl}/questionpapers/${paperId}/download`;
            
            // Fetch the download URL and filename from backend
            const response = await fetch(downloadUrl);
            const data = await response.json();
            
            if (data.downloadUrl && data.filename) {
                // Ensure filename ends with .pdf
                let filename = data.filename;
                if (!filename.toLowerCase().endsWith('.pdf')) {
                    filename = filename + '.pdf';
                }
                
                // Fetch the file as blob to force download
                const fileResponse = await fetch(data.downloadUrl);
                const blob = await fileResponse.blob();
                
                // Create blob URL and trigger download
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename; // Force .pdf extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up blob URL
                window.URL.revokeObjectURL(blobUrl);
            } else {
                throw new Error("Invalid download response");
            }
        } catch (err) {
            console.error("Error downloading:", err);
            alert("Failed to download file. Please try again.");
        }
    };

    const handleLike = (paperId) => {
        setLikedPapers(prev => ({
            ...prev,
            [paperId]: !prev[paperId]
        }));
    };

    // Calculate subject stats from actual papers
    const subjectStats = {
        totalPapers: questionPapers.length,
        totalDownloads: questionPapers.reduce((sum, p) => sum + (p.downloads || 0), 0),
        avgRating: questionPapers.length > 0 
            ? (questionPapers.reduce((sum, p) => sum + (p.rating || 4.5), 0) / questionPapers.length).toFixed(1)
            : "4.5"
    };

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
                                    {subject.name}
                                </h1>

                                <div className="flex flex-wrap gap-6 mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {subjectStats.avgRating}
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
                                            {subjectStats.totalDownloads}
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
                                    {subjectStats.totalPapers}
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

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                            <p className={`mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                Loading question papers...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className={`text-red-500`}>{error}</p>
                        </div>
                    ) : questionPapers.length === 0 ? (
                        <div className={`text-center py-12 rounded-xl ${theme === "dark"
                            ? "bg-white/[0.03] border border-white/[0.08]"
                            : "bg-white border border-gray-200"
                            }`}>
                            <IoDocumentText className={`text-6xl mx-auto mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                            <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                No question papers available yet.
                            </p>
                            <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                Be the first to upload!
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {questionPapers.map((paper) => (
                                <PYQCard 
                                    key={paper._id} 
                                    pyq={paper} 
                                    theme={theme} 
                                    subjectName={subject.name} 
                                    subject={subject}
                                    onDownload={handleDownload}
                                    onLike={handleLike}
                                    isLiked={likedPapers[paper._id]}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

function PYQCard({ pyq, theme, subjectName, subject, onDownload, onLike, isLiked }) {
    const handleDownloadClick = () => {
        onDownload(pyq._id);
    };

    const handleLikeClick = () => {
        onLike(pyq._id);
    };

    const userName = pyq.uploadedBy?.name || pyq.uploadedBy?.rollno || "Anonymous";

    return (
        <div className={`rounded-xl p-5 border transition-all hover:shadow-xl relative overflow-hidden ${theme === "dark"
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
                            {pyq.branch}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border border-purple-200"
                            }`}>
                            Sem {pyq.semester}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : "bg-orange-100 text-orange-700 border border-orange-200"
                            }`}>
                            {pyq.year}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${theme === "dark"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-green-100 text-green-700 border border-green-200"
                            }`}>
                            {pyq.type}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg md:text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {pyq.title}
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
                                    {userName.substring(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                {userName}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaCalendar className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                {new Date(pyq.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <FaFileAlt className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                PDF
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Stats and Download Button */}
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-3 text-xs md:text-sm justify-between">
                    {/* Stats */}
                    <div className="flex gap-4 md:gap-6">
                        <button 
                            onClick={handleLikeClick}
                            className="flex items-center gap-1 hover:scale-110 transition-transform"
                        >
                            {isLiked ? (
                                <FaThumbsUp className="text-purple-500 text-sm" />
                            ) : (
                                <FaRegThumbsUp className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                            )}
                            <span className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {(pyq.likes || 0) + (isLiked ? 1 : 0)}
                            </span>
                        </button>

                        <div className="flex items-center gap-1">
                            <FaDownload className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {(pyq.downloads || 0).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button
                        onClick={handleDownloadClick}
                        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        <FaDownload className="text-sm" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
