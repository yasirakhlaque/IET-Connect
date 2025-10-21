import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../App";
import { FaEdit, FaMoon, FaSun, FaDownload, FaStar } from "react-icons/fa";
import EditProfileForm from "../components/EditProfileForm";

export default function Profile() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("uploads");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [uploads, setUploads] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [showAddEditProfileForm, setShowAddEditProfileForm] = useState(false);

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                // Parse user data
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);

                    // TODO: Fetch user's uploads and downloads from API
                    // For now, I'll use empty arrays until you create the API endpoints
                    // fetchUserUploads(userData._id);
                    // fetchUserDownloads(userData._id);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    // Function to fetch user uploads (TODO: Connect to your API)
    const fetchUserUploads = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.get(`http://localhost:3000/api/uploads/user/${userId}`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // setUploads(response.data);

            // For now, keeping empty
            setUploads([]);
        } catch (error) {
            console.error("Error fetching uploads:", error);
        }
    };

    // Function to fetch user downloads (TODO: Connect to your API)
    const fetchUserDownloads = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.get(`http://localhost:3000/api/downloads/user/${userId}`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // setDownloads(response.data);

            // For now, keeping empty
            setDownloads([]);
        } catch (error) {
            console.error("Error fetching downloads:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Show loading state
    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === "dark"
                ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
                : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
                }`}>
                <div className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Loading...
                </div>
            </div>
        );
    }

    // Show error if user data not found
    if (!user) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === "dark"
                ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
                : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
                }`}>
                <div className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    User not found. <button onClick={() => navigate("/login")} className="text-purple-500 underline">Login</button>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
            case "Approved":
                return theme === "dark"
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-green-100 text-green-700 border-green-200";
            case "pending":
            case "Pending":
                return theme === "dark"
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    : "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "rejected":
            case "Rejected":
                return theme === "dark"
                    ? "bg-red-500/20 text-red-300 border-red-500/30"
                    : "bg-red-100 text-red-700 border-red-200";
            default:
                return "";
        }
    };

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={`${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            }`}>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className={`text-center mb-8 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">User Profile</h1>
                    <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Manage your account and track your activity
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className={`rounded-2xl p-6 border overflow-hidden sticky top-6 ${theme === "dark"
                            ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                            : "bg-white shadow-lg border-gray-200"
                            }`}>
                            {theme === "dark" && (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] to-transparent pointer-events-none" />
                            )}

                            <div className="relative z-10">
                                {/* Profile Avatar */}
                                <div className="flex justify-center mb-4">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${theme === "dark"
                                        ? "bg-gradient-to-br from-purple-600 to-blue-500"
                                        : "bg-gradient-to-br from-purple-500 to-blue-400"
                                        } text-white`}>
                                        {/* Show first letter of roll number if no name */}
                                        {user.rollno ? user.rollno.slice(0, 2) : user.email.slice(0, 2).toUpperCase()}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center mb-6">
                                    <h2 className={`text-2xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        {user.rollno || 'Student'}
                                    </h2>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                        }`}>
                                        {user.email}
                                    </p>
                                </div>

                                {/* User Details */}
                                <div className="space-y-3 mb-6 text-xs md:text-sm">
                                    <div className={`flex items-center justify-between py-2 border-b ${theme === "dark" ? "border-white/10" : "border-gray-200"
                                        }`}>
                                        <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                            Roll Number
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg font-medium ${theme === "dark"
                                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                            : "bg-blue-100 text-blue-700 border border-blue-200"
                                            }`}>
                                            {user.rollno || 'N/A'}
                                        </span>
                                    </div>

                                    <div className={`flex items-center justify-between py-2 border-b ${theme === "dark" ? "border-white/10" : "border-gray-200"
                                        }`}>
                                        <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                            Role
                                        </span>
                                        <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                                            }`}>
                                            {user.role || 'Student'}
                                        </span>
                                    </div>

                                    <div className={`flex items-center justify-between py-2 border-b ${theme === "dark" ? "border-white/10" : "border-gray-200"
                                        }`}>
                                        <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                            Joined
                                        </span>
                                        <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                            }`}>
                                            {formatDate(user.createdAt) || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 text-xs md:text-sm">
                                    <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${theme === "dark"
                                        ? "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                                    }`} onClick={() => setShowAddEditProfileForm(true)}>
                                        <FaEdit />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2.5 rounded-lg font-medium transition-all bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Activity Tabs */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className={`flex gap-4 mb-6 border-b text-xs md:text-sm ${theme === "dark" ? "border-white/10" : "border-gray-200"
                            }`}>
                            <button
                                onClick={() => setActiveTab("uploads")}
                                className={`pb-3 px-4 font-semibold transition-all ${activeTab === "uploads"
                                    ? theme === "dark"
                                        ? "text-purple-400 border-b-2 border-purple-400"
                                        : "text-purple-600 border-b-2 border-purple-600"
                                    : theme === "dark"
                                        ? "text-gray-400 hover:text-gray-300"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                My Uploads
                            </button>
                            <button
                                onClick={() => setActiveTab("downloads")}
                                className={`pb-3 px-4 font-semibold transition-all ${activeTab === "downloads"
                                    ? theme === "dark"
                                        ? "text-purple-400 border-b-2 border-purple-400"
                                        : "text-purple-600 border-b-2 border-purple-600"
                                    : theme === "dark"
                                        ? "text-gray-400 hover:text-gray-300"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Download History
                            </button>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className={`rounded-xl p-4 text-center ${theme === "dark"
                                ? "bg-white/[0.03] border border-white/[0.08]"
                                : "bg-white border border-gray-200 shadow-sm"
                                }`}>
                                <div className={`text-xl md:text-3xl font-bold mb-1 ${theme === "dark" ? "text-purple-400" : "text-purple-600"
                                    }`}>
                                    {activeTab === "uploads" ? uploads.filter(u => u.status === "approved").length : downloads.length}
                                </div>
                                <div className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                    {activeTab === "uploads" ? "Approved" : "Downloaded"}
                                </div>
                            </div>

                            {activeTab === "uploads" && (
                                <div className={`rounded-xl p-4 text-center ${theme === "dark"
                                    ? "bg-white/[0.03] border border-white/[0.08]"
                                    : "bg-white border border-gray-200 shadow-sm"
                                    }`}>
                                    <div className={`text-xl md:text-3xl font-bold mb-1 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                                        }`}>
                                        {uploads.filter(u => u.status === "pending").length}
                                    </div>
                                    <div className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                        }`}>
                                        Pending
                                    </div>
                                </div>
                            )}

                            <div className={`rounded-xl p-4 text-center ${theme === "dark"
                                ? "bg-white/[0.03] border border-white/[0.08]"
                                : "bg-white border border-gray-200 shadow-sm"
                                }`}>
                                <div className={`text-xl md:text-3xl font-bold mb-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"
                                    }`}>
                                    {activeTab === "uploads"
                                        ? uploads.reduce((sum, u) => sum + u.downloads, 0).toLocaleString()
                                        : "1234"
                                    }
                                </div>
                                <div className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                    Total Downloads
                                </div>
                            </div>
                        </div>

                        {/* Activity Cards */}
                        <div className="space-y-4">
                            {activeTab === "uploads" ? (
                                uploads.length > 0 ? (
                                    uploads.map((upload) => (
                                        <ActivityCard
                                            key={upload.id}
                                            item={upload}
                                            type="upload"
                                            theme={theme}
                                            getStatusColor={getStatusColor}
                                        />
                                    ))
                                ) : (
                                    <div className={`text-center py-12 rounded-xl ${theme === "dark"
                                        ? "bg-white/[0.03] border border-white/[0.08]"
                                        : "bg-white border border-gray-200"
                                        }`}>
                                        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            No uploads yet
                                        </p>
                                        <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                            Start contributing by uploading PYQs
                                        </p>
                                        <button
                                            onClick={() => navigate('/upload')}
                                            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition"
                                        >
                                            Upload Now
                                        </button>
                                    </div>
                                )
                            ) : (
                                downloads.length > 0 ? (
                                    downloads.map((download) => (
                                        <ActivityCard
                                            key={download.id}
                                            item={download}
                                            type="download"
                                            theme={theme}
                                        />
                                    ))
                                ) : (
                                    <div className={`text-center py-12 rounded-xl ${theme === "dark"
                                        ? "bg-white/[0.03] border border-white/[0.08]"
                                        : "bg-white border border-gray-200"
                                        }`}>
                                        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            No downloads yet
                                        </p>
                                        <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                            Browse and download PYQs from our library
                                        </p>
                                        <button
                                            onClick={() => navigate('/download')}
                                            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition"
                                        >
                                            Browse Library
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            {showAddEditProfileForm && (
                <EditProfileForm onClose={() => setShowAddEditProfileForm(false)} />
            )}
        </div>
    );
}

function ActivityCard({ item, type, theme, getStatusColor }) {
    return (
        <div className={`rounded-xl p-5 border transition-all hover:shadow-xl cursor-pointer relative overflow-hidden ${theme === "dark"
            ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-purple-500/30"
            : "bg-white shadow-md border-gray-200 hover:border-purple-300"
            }`}>
            {theme === "dark" && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                    {/* Status Badge (only for uploads) */}
                    {type === "upload" && (
                        <div className="mb-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(item.status)}`}>
                                {item.status}
                            </span>
                            <span className={`ml-3 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                {item.date}
                            </span>
                        </div>
                    )}

                    <h3 className={`text-sm md:text-lg font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {item.title}
                    </h3>

                    <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                        {item.subject}
                    </p>
                </div>

                {/* Stats */}
                {type === "upload" && item.status === "approved" && (
                    <div className="flex items-center gap-4 text-xs md:text-sm">
                        <div className="flex items-center gap-1">
                            <FaDownload className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {item.downloads.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-sm" />
                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {item.rating}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
