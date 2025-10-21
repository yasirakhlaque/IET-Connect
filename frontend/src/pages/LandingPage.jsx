import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { SignUpContext } from "../App";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { FaDownload, FaStar, FaSearch, FaCloudUploadAlt, FaUsers } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

export default function LandingPage() {
  const { theme } = useContext(ThemeContext);
  const { isSignUpActive, setIsSignUpActive } = useContext(SignUpContext);

  return (
    <div className={`${theme === "dark"
      ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
      : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
      }`}>
      {/* Hero Section with gradient background */}
      <div className={`min-h-screen relative overflow-hidden `}>
        <Navbar setIsSignUpActive={setIsSignUpActive} />

        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${theme === "dark"
              ? "bg-purple-500/10 border border-purple-500/20"
              : "bg-purple-100 border border-purple-200"
              }`}>
              <MdVerified className="text-purple-500" />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-purple-300" : "text-purple-700"}`}>
                Modern College PYQ Platform
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
              Never Miss a <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 bg-clip-text text-transparent">
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
                className={` text-xs md:text-sm flex-1 bg-transparent outline-none px-2 py-2 ${theme === "dark" ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
                  }`}
              />
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all text-xs md:text-sm">
                Search
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-16 text-xs md:text-sm">
              <Link to="/download">
                <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 md:px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer ">
                  <FaCloudUploadAlt className="group-hover:scale-110 transition-transform" />
                  Browse Subjects
                </button>
              </Link>
              <Link to="/upload">
                <button className={`px-4 md:px-8 py-3 rounded-full font-semibold border-2 transition-all cursor-pointer ${theme === "dark"
                  ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  : "border-purple-500 text-purple-700 hover:bg-purple-50"
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
              number="250+"
              label="Question Papers"
              theme={theme}
            />
            <StatCard
              icon={<FaUsers className="text-3xl" />}
              number="500+"
              label="Active Students"
              theme={theme}
            />
            <StatCard
              icon={<FaDownload className="text-3xl" />}
              number="1,000+"
              label="Downloads"
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Featured Subjects Section */}
      <FeaturedSubjects theme={theme} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function StatCard({ icon, number, label, theme }) {
  return (
    <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${theme === "dark"
      ? "bg-white/5 backdrop-blur-sm border border-white/10"
      : "bg-white shadow-lg border border-gray-100"
      }`}>
      <div className={`flex justify-center mb-3 ${theme === "dark" ? "text-purple-400" : "text-purple-600"
        }`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
        {number}
      </div>
      <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
        {label}
      </div>
    </div>
  );
}

function FeaturedSubjects({ theme }) {
  const subjects = [
    {
      code: "CSE",
      name: "Data Structures",
      rating: 4.8,
      downloads: 1234,
    },
    {
      code: "ME",
      name: "Thermodynamics",
      rating: 4.6,
      downloads: 856,
    },
    {
      code: "ECE",
      name: "Circuit Analysis",
      rating: 4.7,
      downloads: 967,
    },
    {
      code: "CHE",
      name: "Organic Chemistry",
      rating: 4.5,
      downloads: 743,
    }
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Featured Subjects
          </h2>
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            Popular question papers this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ subject, theme }) {
  return (
    <div className={`rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-2xl cursor-pointer ${theme === "dark"
      ? "bg-white/2 backdrop-blur-sm border border-white/10 hover:border-purple-500/50"
      : "bg-white/10 shadow-lg border border-gray-100 hover:border-purple-300"
      }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-8 rounded-lg bg-gradient-to-br ${theme === "light" ? "text-blue-800":"text-blue-200"} bg-blue-600/30 flex items-center justify-center border-blue-700 border-2`}>
          <span className="font-semibold text-sm">{subject.code}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500 text-sm" />
          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
            {subject.rating}
          </span>
        </div>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
        {subject.name}
      </h3>

      <div className="flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <FaDownload className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`} />
          <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            {subject.downloads}
          </span>
        </div>
        <button className={`py-2 font-medium transition-all cursor-pointer hover:underline ${theme === "dark"
          ? "text-blue-500 "
          : "text-purple-700 "
          }`}>
          View →
        </button>
      </div>
    </div>
  );
}

