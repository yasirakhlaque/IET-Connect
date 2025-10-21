import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUpload, FaCloudUploadAlt } from "react-icons/fa";

export default function Upload() {
    const { theme } = useContext(ThemeContext);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        subject: "",
        branch: "",
        semester: "",
        description: ""
    });

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your upload logic here
        console.log("Form Data:", formData);
        console.log("File:", selectedFile);
        alert("Submitting for review...");
    };

    return (
        <div className={`${theme === "dark"
            ? "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"
            : "bg-gradient-to-br from-white via-blue-200 to-purple-200"
            }`}>
            <div className="min-h-screen relative">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className={`text-center mb-8 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">Upload PYQs</h1>
                        <p className={`text-xs md:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Share Your Question Paper With Fellow Students
                        </p>
                    </div>

                    {/* Main Form Card */}
                    <div className={`rounded-2xl p-6 md:p-8 border relative overflow-hidden ${theme === "dark"
                        ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                        : "bg-white shadow-lg border-gray-200"
                        }`}>
                        {theme === "dark" && (
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] to-transparent pointer-events-none" />
                        )}

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            {/* File Upload Section */}
                            <div>
                                <label className={`block text-sm font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}>
                                    Question Paper File
                                </label>

                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-8 transition-all ${dragActive
                                        ? theme === "dark"
                                            ? "border-purple-500 bg-purple-500/10"
                                            : "border-purple-500 bg-purple-50"
                                        : theme === "dark"
                                            ? "border-white/20 hover:border-white/30"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <FaCloudUploadAlt className={`text-5xl mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                            }`} />

                                        {selectedFile ? (
                                            <div className="mb-4">
                                                <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"
                                                    }`}>
                                                    {selectedFile.name}
                                                </p>
                                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                                    }`}>
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className={`text-sm md:text-lg mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                                    }`}>
                                                    Drop your PDF file here
                                                </p>
                                                <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                    }`}>
                                                    or
                                                </p>
                                            </>
                                        )}

                                        <label className={`px-6 py-2.5 rounded-lg font-medium cursor-pointer transition-all text-xs md:text-sm ${theme === "dark"
                                            ? "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                                            : "bg-gray-900 hover:bg-gray-800 text-white"
                                            }`}>
                                            Browse Files
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>

                                        <p className={`text-xs mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-500"
                                            }`}>
                                            Only PDF files are accepted. Max size: 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Question Paper Title */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Question Paper Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mid-Semester Exam 2023"
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                            }`}
                                    />
                                </div>

                                {/* Year */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Year <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Select year</option>
                                        <option value="2025" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2025</option>
                                        <option value="2024" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2024</option>
                                        <option value="2023" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2023</option>
                                        <option value="2022" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2022</option>
                                        <option value="2021" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2021</option>
                                        <option value="2020" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>2020</option>
                                    </select>
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Branch <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Select branch</option>
                                        <option value="CSE" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>CSE</option>
                                        <option value="ME" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>ME</option>
                                        <option value="ECE" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>ECE</option>
                                        <option value="EE" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>EE</option>
                                        <option value="CE" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>CE</option>
                                        <option value="CHE" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>CHE</option>
                                    </select>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Select subject</option>
                                        <option value="Data Structures" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Data Structures</option>
                                        <option value="Algorithms" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Algorithms</option>
                                        <option value="Operating Systems" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Operating Systems</option>
                                        <option value="DBMS" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>DBMS</option>
                                        <option value="Computer Networks" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Computer Networks</option>
                                    </select>
                                </div>

                                {/* Semester */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Semester
                                    </label>
                                    <select
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Select semester</option>
                                        <option value="1" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 1</option>
                                        <option value="2" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 2</option>
                                        <option value="3" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 3</option>
                                        <option value="4" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 4</option>
                                        <option value="5" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 5</option>
                                        <option value="6" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 6</option>
                                        <option value="7" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 7</option>
                                        <option value="8" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Semester 8</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}>
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Add any additional details about this question paper..."
                                    rows={4}
                                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all resize-none ${theme === "dark"
                                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/10"
                                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        }`}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-xs sm:text-sm "
                                >
                                    <FaUpload />
                                    Submit for Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}