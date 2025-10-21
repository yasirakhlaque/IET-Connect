import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ThemeContext } from "../App";
import { FaBuilding, FaSave, FaUser } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function EditProfileForm({ onClose }) {
    const { theme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

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
                <form className="flex flex-col gap-4">
                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <FaUser className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        <input type="text" name="name" id="name" placeholder="Enter your name" defaultValue={user ? user.name : ''}
                            className={`outline-none w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`} />
                    </div>
                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <HiIdentification className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        <input type="text" name="rollNumber" id="rollNumber" placeholder="Enter your roll number" defaultValue={user ? user.rollno : ''}
                            className={`outline-none w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`} />
                    </div>
                    <div className={`flex items-center gap-2 text-xs md:text-sm border rounded-md p-2 w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}>
                        <FaBuilding className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        <input type="text" name="department" id="department" placeholder="Enter your department" defaultValue={user ? user.department : ''}
                            className={`outline-none w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`} />
                    </div>
                    <div className="flex justify-end mt-4 gap-4">
                        <button className="flex items-center gap-2 justify-center text-xs md:text-sm bg-gradient-to-r text-white py-2.5 rounded-lg font-semibold bg-gray-200/10 transition shadow-lg px-4 cursor-pointer hover:bg-gray-200/30" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center gap-2 justify-center text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg px-4 cursor-pointer">
                            <FaSave />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}