import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import { SignUpContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { FaDownload, FaStar, FaSearch, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { subjectAPI, questionPaperAPI } from "../lib/api";
import axios from "axios";

export default function LandingPage() {
  const { theme } = useContext(ThemeContext);
  const { isSignUpActive, setIsSignUpActive } = useContext(SignUpContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalPapers: 0,
    totalStudents: 0,
    totalDownloads: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      
      // Fetch papers count
      const papersResponse = await questionPaperAPI.getAll();
      const approvedPapers = papersResponse.data.questionPapers.filter(p => p.approvalStatus === 'Approved');
      
      // Fetch students count
      const studentsResponse = await axios.get(`${API_URL}/auth/total-users`).catch(() => ({ data: { totalUsers: 0 } }));
      
      // Calculate total downloads from papers
      const totalDownloads = approvedPapers.reduce((sum, paper) => sum + (paper.downloads || 0), 0);

      setStats({
        totalPapers: approvedPapers.length,
        totalStudents: studentsResponse.data?.totalUsers || 0,
        totalDownloads: totalDownloads
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set default values if fetch fails
      setStats({
        totalPapers: 0,
        totalStudents: 0,
        totalDownloads: 0
      });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/download?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/download');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`${theme === "dark"
      ? "bg-[#0B1220]"
      : "bg-gradient-to-br from-white via-blue-50 to-teal-50"
      }`}>
      {/* Hero Section with gradient background */}
        <Navbar setIsSignUpActive={setIsSignUpActive} />
      <div className={`min-h-screen relative overflow-hidden `}>
      

        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${theme === "dark"
              ? "bg-[#0FB8AD]/10 border border-[#0FB8AD]/30"
              : "bg-teal-100 border border-teal-200"
              }`}>
              <MdVerified className={theme === "dark" ? "text-[#0FB8AD]" : "text-teal-600"} />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-[#0FB8AD]" : "text-teal-700"}`}>
                Modern College PYQ Platform
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
              Never Miss a <br />
              <span className={theme === "dark" 
                ? "bg-gradient-to-r from-[#0FB8AD] via-[#0FB8AD] to-[#F6C177] bg-clip-text text-transparent"
                : "bg-gradient-to-r from-teal-500 via-teal-600 to-amber-400 bg-clip-text text-transparent"
              }>
                Question Again
              </span>
            </h1>

            <p className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
              Access previous year question papers with ease from our university. Study smarter, not harder with our curated academic archive.
            </p>

            {/* Search Bar */}
            <div className={`max-w-2xl mx-auto mb-12 ${theme === "dark" ? "bg-white/5 backdrop-blur-sm" : "bg-white shadow-lg"
              } rounded-full px-2 py-1 md:py-2 flex items-center gap-2 border ${theme === "dark" ? "border-white/10" : "border-gray-200"
              }`}>
              <FaSearch className={`ml-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} `} />
              <input
                type="text"
                placeholder="Search subjects, branches, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className={` text-xs md:text-sm flex-1 bg-transparent outline-none px-2 py-2 ${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
                  }`}
              />
              <button 
                onClick={handleSearch}
                className={theme === "dark"
                  ? "bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-[#0B1220] px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-[#0FB8AD]/20 transition-all text-xs md:text-sm"
                  : "bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all text-xs md:text-sm"
                }>
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-16 text-xs md:text-sm">
              <Link to="/download">
                <button className={theme === "dark"
                  ? "bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-[#0B1220] px-4 md:px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-[#0FB8AD]/30 transition-all flex items-center gap-2 group cursor-pointer"
                  : "bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 md:px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
                }>
                  <FaCloudUploadAlt className="group-hover:scale-110 transition-transform" />
                  Browse Subjects
                </button>
              </Link>
              <Link to="/upload">
                <button className={`px-4 md:px-8 py-3 rounded-full font-semibold border-2 transition-all cursor-pointer ${theme === "dark"
                  ? "border-[#0FB8AD]/50 text-[#0FB8AD] hover:bg-[#0FB8AD]/10"
                  : "border-teal-500 text-teal-700 hover:bg-teal-50"
                  }`}>
                  Upload PYQ
                </button>
              </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard
              icon={<IoDocumentText className="text-3xl" />}
              number={stats.totalPapers > 0 ? `${stats.totalPapers}+` : "0"}
              label="Question Papers"
              theme={theme}
            />
            <StatCard
              icon={<FaUsers className="text-3xl" />}
              number={stats.totalStudents > 0 ? `${stats.totalStudents}+` : "0"}
              label="Active Students"
              theme={theme}
            />
            <StatCard
              icon={<FaDownload className="text-3xl" />}
              number={stats.totalDownloads > 0 ? `${stats.totalDownloads}+` : "0"}
              label="Downloads"
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Featured Subjects Section */}
      <FeaturedSubjects theme={theme}/>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function StatCard({ icon, number, label, theme }) {
  return (
    <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${theme === "dark"
      ? "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#0FB8AD]/30"
      : "bg-white shadow-lg border border-gray-100"
      }`}>
      <div className={`flex justify-center mb-3 ${theme === "dark" ? "text-[#0FB8AD]" : "text-teal-600"
        }`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
        {number}
      </div>
      <div className={`text-sm ${theme === "dark" ? "text-[#9AA8B2]" : "text-gray-600"
        }`}>
        {label}
      </div>
    </div>
  );
}

function FeaturedSubjects({ theme }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedSubjects();
  }, []);

  const fetchFeaturedSubjects = async () => {
    try {
      const response = await subjectAPI.getAll();
      // Get top 4 subjects
      const topSubjects = response.data.subjects.slice(0, 4);
      setSubjects(topSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Loading featured subjects...
          </div>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Featured Subjects
          </h2>
          <p className={`text-lg mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            No subjects available yet. Check back soon!
          </p>
          <Link to="/download">
            <button className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Browse All Subjects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Featured Subjects
          </h2>
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            Popular subjects from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {subjects.map((subject) => (
            <SubjectCard key={subject._id} subject={subject} theme={theme} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/download">
            <button className={`px-8 py-3 rounded-full font-semibold border-2 transition-all cursor-pointer ${theme === "dark"
              ? "border-[#0FB8AD]/50 text-[#0FB8AD] hover:bg-[#0FB8AD]/10"
              : "border-teal-500 text-teal-700 hover:bg-teal-50"
              }`}>
              View All Subjects →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ subject, theme }) {
  const navigate = useNavigate();

  const handleViewSubject = () => {
    navigate(`/subject/${subject._id}`);
  };

  return (
    <div 
      onClick={handleViewSubject}
      className={`rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-2xl cursor-pointer ${theme === "dark"
        ? "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#0FB8AD]/50 hover:shadow-[#0FB8AD]/10"
        : "bg-white shadow-lg border border-gray-100 hover:border-teal-300"
      }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-lg ${theme === "dark" 
          ? "bg-[#0FB8AD]/20 border-[#0FB8AD]/40 text-[#0FB8AD]" 
          : "bg-teal-100 border-teal-300 text-teal-800"
        } flex items-center justify-center border-2`}>
          <span className="font-semibold text-xs">{subject.branch}</span>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${theme === "dark"
          ? "bg-[#F6C177]/20 text-[#F6C177]"
          : "bg-amber-100 text-amber-700"
        }`}>
          Sem {subject.semester}
        </div>
      </div>
      <h3 className={`text-lg font-bold mb-1 line-clamp-2 ${theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
        {subject.name}
      </h3>
      <p className={`text-xs mb-3 ${theme === "dark" ? "text-[#9AA8B2]" : "text-gray-600"}`}>
        {subject.code}
      </p>

      <div className="flex items-center gap-1 justify-between">
        <div className={`text-xs ${theme === "dark" ? "text-[#9AA8B2]" : "text-gray-600"}`}>
          {subject.credits} Credits
        </div>
        <div className={`text-sm font-medium transition-all hover:underline ${theme === "dark"
          ? "text-[#0FB8AD]"
          : "text-teal-600"
          }`}>
          View →
        </div>
      </div>
    </div>
  );
}

