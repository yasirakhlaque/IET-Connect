import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ThemeContext } from "../App";
import { FaSave, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfileForm({ onClose }) {
    const { theme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                    setName(userData.name || "");
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess(false);

        try {
            const token = localStorage.getItem("token");
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
            
            const response = await axios.put(
                `${baseUrl}/auth/profile`,
                { name: name.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update local storage with new user data
            const updatedUser = {
                ...user,
                name: response.data.student.name,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);

            setSuccess(true);
            setTimeout(() => {
                window.location.reload(); // Reload to update profile display
            }, 1500);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} p-8 rounded-xl shadow-2xl w-full max-w-md relative mx-2`}>
                <button
                    className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={onClose}
                >
                    <RxCross2 size={20} />
                </button>
                <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Edit Profile</h2>
                
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        Profile updated successfully!
                    </div>
                )}
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <FaUser className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`outline-none w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`} 
                        />
                    </div>

                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full opacity-60 ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <span className="text-xs text-gray-500">Roll Number:</span>
                        <span className="font-semibold">{user?.rollno}</span>
                    </div>

                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full opacity-60 ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <span className="text-xs text-gray-500">Email:</span>
                        <span className="font-semibold text-xs">{user?.email}</span>
                    </div>

                    <div className="flex justify-end mt-4 gap-4">
                        <button 
                            type="button"
                            className="flex items-center gap-2 justify-center text-xs md:text-sm bg-gradient-to-r text-white py-2.5 rounded-lg font-semibold bg-gray-200/10 transition shadow-lg px-4 cursor-pointer hover:bg-gray-200/30" 
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex items-center gap-2 justify-center text-xs md:text-sm bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-white py-2.5 rounded-lg font-semibold hover:shadow-[#0FB8AD]/30 transition shadow-lg px-4 cursor-pointer disabled:opacity-50"
                            disabled={saving}
                        >
                            <FaSave />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
