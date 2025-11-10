import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import ThemeButton from "./ThemeButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function Navbar({ setIsSignUpActive }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme } = useContext(ThemeContext);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const NavOpt = [
    { name: "Upload", link: "/upload" },
    { name: "Download", link: "/download" },
  ];

  return (
    <>
      <nav className={`sticky top-4 z-40 mx-4 md:mx-8 rounded-full backdrop-blur-md transition-all ${theme === "dark"
        ? "bg-white/5 border border-white/10"
        : "bg-white/10 border border-gray-200 shadow-lg"
        }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className={`font-bold text-xl cursor-pointer ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                IET Connect
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-8">
                {NavOpt.map((opt, index) => (
                  <li key={index} className={`font-medium transition-colors hover:text-purple-400 hover:underline cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    <Link to={opt.link}>
                      {opt.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <ThemeButton />

                {isLoggedIn ? (
                  <>
                    <Link to="/profile">
                      <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`px-5 py-2 rounded-full font-medium transition-all
                        ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}
                        ${theme === "dark"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                    >
                      {isLoggingOut ? 'Logging Out...' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button
                        onClick={() => setIsSignUpActive(false)}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${theme === "dark"
                          ? "text-purple-300 hover:bg-purple-500/10"
                          : "text-purple-700 hover:bg-purple-50"
                          }`}
                      >
                        Login
                      </button>
                    </Link>
                    <Link to="/login">
                      <button
                        onClick={() => setIsSignUpActive(true)}
                        className="bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBars className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === "dark" ? "bg-[#0f172a]" : "bg-white"}`}>
        <div className={`flex justify-between items-center p-6 border-b ${theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}>
          <span className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            IET Connect
          </span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <FaTimes className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-900"}`} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {NavOpt.map((opt, index) => (
              <li key={index} className={`block text-lg font-medium py-2 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                <Link
                  to={opt.link}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {opt.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`pt-4 border-t ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}>
            <ThemeButton />
          </div>

          <div className="flex flex-col gap-3 pt-4 text-xs md:text-sm">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-lg text-white font-medium">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-6 py-3 rounded-lg font-medium ${theme === "dark"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    onClick={() => {
                      setIsSignUpActive(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-6 py-3 rounded-lg font-medium border-2 ${theme === "dark"
                      ? "border-purple-500 text-purple-300"
                      : "border-purple-500 text-purple-700"
                      }`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    onClick={() => {
                      setIsSignUpActive(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 rounded-lg text-white font-medium"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
