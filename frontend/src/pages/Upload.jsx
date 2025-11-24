import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUpload, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import { questionPaperAPI, subjectAPI } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [formData, setFormData] = useState({
        subjectId: "",
        title: "",
        year: "",
        subject: "",
        branch: "",
        semester: "",
        type: "Previous Year Question Paper",
        description: ""
    });

    // Fetch subjects on mount
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Filter subjects when branch/semester changes
    useEffect(() => {
        filterSubjects();
    }, [formData.branch, formData.semester, subjects]);

    const fetchSubjects = async () => {
        try {
            const response = await subjectAPI.getAll();
            setSubjects(response.data.subjects || []);
        } catch (err) {
            console.error("Error fetching subjects:", err);
        }
    };

    const filterSubjects = () => {
        let filtered = subjects;
        
        if (formData.branch) {
            filtered = filtered.filter(s => s.branch === formData.branch);
        }
        
        if (formData.semester) {
            filtered = filtered.filter(s => s.semester === parseInt(formData.semester));
        }
        
        setFilteredSubjects(filtered);
    };

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
            const file = e.target.files[0];
            
            // Validate file type
            if (file.type !== 'application/pdf') {
                setError("Only PDF files are allowed");
                e.target.value = null; // Clear the input
                return;
            }
            
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                setError("File size must be less than 10MB");
                e.target.value = null; // Clear the input
                return;
            }
            
            // Clear any previous errors
            setError("");
            setSelectedFile(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // If subject is selected, auto-populate other fields
        if (name === "subjectId" && value) {
            const selectedSubject = subjects.find(s => s._id === value);
            if (selectedSubject) {
                setFormData(prev => ({
                    ...prev,
                    subjectId: value,
                    subject: selectedSubject.name,
                    branch: selectedSubject.branch,
                    semester: selectedSubject.semester.toString(),
                    // Auto-generate title based on subject, type, and year
                    title: prev.year && prev.type 
                        ? `${selectedSubject.name} ${prev.type === "Previous Year Question Paper" ? "PYQ" : prev.type} ${prev.year}`
                        : prev.title
                }));
                return;
            }
        }

        // Update form data
        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: value
            };

            // Auto-update title when year or type changes (if subject is selected)
            if ((name === "year" || name === "type") && updated.subject) {
                updated.title = `${updated.subject} ${updated.type === "Previous Year Question Paper" ? "PYQ" : updated.type} ${updated.year}`;
            }

            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setUploading(true);

        try {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please login to upload question papers");
                navigate('/login');
                return;
            }

            // Validate file
            if (!selectedFile) {
                setError("Please select a PDF file to upload");
                setUploading(false);
                return;
            }

            // Validate file type
            if (selectedFile.type !== 'application/pdf') {
                setError("Only PDF files are allowed");
                setUploading(false);
                return;
            }

            // Validate file size (10MB)
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("File size should not exceed 10MB");
                setUploading(false);
                return;
            }

            // Create FormData
            const uploadData = new FormData();
            uploadData.append('pdf', selectedFile);
            uploadData.append('title', formData.title);
            uploadData.append('year', formData.year);
            uploadData.append('subject', formData.subjectId); // Use subjectId instead of subject name
            uploadData.append('branch', formData.branch);
            uploadData.append('semester', formData.semester);
            uploadData.append('type', formData.type);
            uploadData.append('description', formData.description);

            // Upload to backend
            const response = await questionPaperAPI.upload(uploadData);

            // Success!
            setUploadSuccess(true);
            
            // Reset form and file
            setFormData({
                subjectId: "",
                title: "",
                year: "",
                subject: "",
                branch: "",
                semester: "",
                type: "Previous Year Question Paper",
                description: ""
            });
            setSelectedFile(null);

        } catch (err) {
            console.error("Upload error:", err);
            console.error("Error details:", err.response?.data);
            setError(err.response?.data?.message || "Failed to upload question paper. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`${theme === "dark"
            ? "bg-[#0B1220]"
            : "bg-gradient-to-br from-white via-blue-200 to-teal-100"
            }`}>
            <div className="min-h-screen relative">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className={`text-center mb-8 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">Upload PYQs</h1>
                        <p className={`text-xs md:text-sm ${theme === "dark" ? "text-[#9AA8B2]" : "text-gray-600"}`}>
                            Share Your Question Paper With Fellow Students
                        </p>
                    </div>

                    {/* Success Message */}
                    {uploadSuccess && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
                            <FaCheckCircle className="text-green-500 text-xl" />
                            <div>
                                <p className={`font-semibold ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                                    Upload Successful!
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
                                    Your question paper is pending admin approval.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className={`font-semibold ${theme === "dark" ? "text-red-400" : "text-red-700"}`}>
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Main Form Card */}
                    <div className={`rounded-2xl p-6 md:p-8 border relative overflow-hidden ${theme === "dark"
                        ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                        : "bg-white shadow-lg border-gray-200"
                        }`}>
                        {theme === "dark" && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0FB8AD]/[0.05] to-transparent pointer-events-none" />
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
                                            ? "border-[#0FB8AD] bg-[#0FB8AD]/10"
                                            : "border-teal-500 bg-teal-50"
                                        : theme === "dark"
                                            ? "border-white/20 hover:border-white/30"
                                            : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <FaCloudUploadAlt className={`text-5xl mb-4 ${theme === "dark" ? "text-[#9AA8B2]" : "text-gray-500"
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
                                        placeholder="Auto-generated from subject, type, and year"
                                        required
                                        readOnly
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
                                            }`}
                                    />
                                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                        This is automatically generated. Select subject, type, and year to populate.
                                    </p>
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
                                            ? "bg-white/5 border-white/10 text-white focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
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
                                            ? "bg-white/5 border-white/10 text-white focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
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

                                {/* Semester */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Semester <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Select semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                            <option key={sem} value={sem} className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>
                                                Semester {sem}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject Dropdown */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="subjectId"
                                        value={formData.subjectId}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!formData.branch || !formData.semester}
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-[#0FB8AD]/50 focus:bg-white/10 disabled:opacity-50"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20 disabled:opacity-50"
                                            }`}
                                    >
                                        <option value="" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>
                                            {!formData.branch || !formData.semester 
                                                ? "Select branch and semester first" 
                                                : filteredSubjects.length === 0 
                                                    ? "No subjects available for this branch/semester"
                                                    : "Select subject"}
                                        </option>
                                        {filteredSubjects.map(subject => (
                                            <option key={subject._id} value={subject._id} className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>
                                                {subject.name} {subject.code ? `(${subject.code})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                        This will auto-fill branch, semester, and generate title
                                    </p>
                                </div>

                                {/* Type */}
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme === "dark"
                                            ? "bg-white/5 border-white/10 text-white focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
                                            }`}
                                    >
                                        <option value="Previous Year Question Paper" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Previous Year Question Paper</option>
                                        <option value="Periodic Test" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Periodic Test</option>
                                        <option value="Question Bank" className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-200 bg-gray-600" : "text-gray-700"}`}>Question Bank</option>
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
                                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#0FB8AD]/50 focus:bg-white/10"
                                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0FB8AD] focus:ring-2 focus:ring-[#0FB8AD]/20"
                                        }`}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={uploading || uploadSuccess || !selectedFile}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-xs sm:text-sm ${
                                        uploading || uploadSuccess || !selectedFile
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : theme === "dark"
                                                ? "bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-[#0B1220] hover:shadow-[#0FB8AD]/30"
                                                : "bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
                                    }`}
                                >
                                    {uploading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Uploading...
                                        </>
                                    ) : uploadSuccess ? (
                                        <>
                                            <FaCheckCircle />
                                            Uploaded Successfully!
                                        </>
                                    ) : (
                                        <>
                                            <FaUpload />
                                            {!selectedFile ? 'Select a PDF file first' : 'Submit for Review'}
                                        </>
                                    )}
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
