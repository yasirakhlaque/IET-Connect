import { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEye, FaKey, FaUser } from "react-icons/fa";
import { ThemeContext } from '../App';
import { IoMdEyeOff } from 'react-icons/io';

export default function SignUp({ setIsSignUpActive }) {
    const { theme } = useContext(ThemeContext);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [rollnoError, setRollnoError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [studentExist, setStudentExist] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialState = {
        rollno: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "UPDATE":
                return { ...state, [action.field]: action.value };
            case "RESET":
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        dispatch({
            type: "UPDATE",
            field: e.target.name,
            value: e.target.value
        });
    };

    const validate = () => {
        let isValid = true;

        // Validate roll number format (e.g., 23CSE137, 23IT12, 23CSBS101)
        const rollnoRegex = /^\d{2}[A-Z]{2,4}\d{2,3}$/i;
        if (!rollnoRegex.test(state.rollno.trim())) {
            setRollnoError(true);
            isValid = false;
        } else {
            setRollnoError(false);
        }

        if (state.email.includes("@gmail")) {
            setEmailError(false);
        } else {
            setEmailError(true);
            isValid = false;
        }

        if (state.password.length < 8) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }

        if (state.password !== state.confirmPassword) {
            setPasswordMatchError(true);
            isValid = false;
        } else {
            setPasswordMatchError(false);
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validate()) {
                const response = await axios.post('http://localhost:3000/api/auth/signup', state);
                console.log('Signup successful:', response.data);
                console.log("Submitted:", state);
                dispatch({ type: "RESET" });
                setSubmitted(true);
                setTimeout(() => {
                    setIsSignUpActive(false);
                }, 3000);
            }
        } catch (error) {
            setStudentExist(true);
            console.error('Signup failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className={`rounded-[2rem] border p-8 md:w-96 relative shadow-2xl w-[90vw] ${theme === "dark"
            ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
            : "bg-white border-gray-200"
            }`}>
            {/* Floating Icon */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
                <FaUser style={{ fontSize: '2.5rem' }} />
            </div>

            <div className="mt-12 text-center">
                <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Sign Up
                </h2>
                <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Join Our Family
                </p>
            </div>

            <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 transition ${theme === "dark"
                        ? "border-white/20 bg-white/5"
                        : "border-gray-300 bg-gray-50"
                        }`}>
                        <FaUser className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                        <input type="text" name="rollno" placeholder="Roll Number (e.g. 23CSE137)"
                            className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                                ? "text-white placeholder-gray-400"
                                : "text-gray-900 placeholder-gray-500"
                                }`}
                            value={state.rollno} onChange={handleChange} />
                    </div>
                    {rollnoError && <div className="text-red-400 text-sm mt-1">Roll number format should be like 23CSE137</div>}
                </div>

                <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 transition ${theme === "dark"
                        ? "border-white/20 bg-white/5"
                        : "border-gray-300 bg-gray-50"
                        }`}>
                        <FaEnvelope className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                        <input type="email" name="email" placeholder="Email"
                            className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                                ? "text-white placeholder-gray-400"
                                : "text-gray-900 placeholder-gray-500"
                                }`}
                            value={state.email} onChange={handleChange} />
                    </div>
                    {emailError && <div className="text-red-400 text-sm mt-1">Email must be a valid Gmail address</div>}
                </div>

                <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 transition ${theme === "dark"
                        ? "border-white/20 bg-white/5"
                        : "border-gray-300 bg-gray-50"
                        }`}>
                        <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                        <input type={`${showPassword ? "text" : "password"}`} name="password" placeholder="Password"
                            className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                                ? "text-white placeholder-gray-400"
                                : "text-gray-900 placeholder-gray-500"
                                }`}
                            value={state.password} onChange={handleChange} />
                        {showPassword ? <FaEye onClick={() => setShowPassword(false)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} /> : <IoMdEyeOff onClick={() => setShowPassword(true)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />}
                    </div>
                    {passwordError && <div className="text-red-400 text-sm mt-1">Password should be at least 8 characters</div>}
                </div>

                <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 transition ${theme === "dark"
                        ? "border-white/20 bg-white/5"
                        : "border-gray-300 bg-gray-50"
                        }`}>
                        <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                        <input type={`${showConfirmPassword ? "text" : "password"}`} name="confirmPassword" placeholder="Confirm Password"
                            className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                                ? "text-white placeholder-gray-400"
                                : "text-gray-900 placeholder-gray-500"
                                }`}
                            value={state.confirmPassword} onChange={handleChange} />
                        {showConfirmPassword ? <FaEye onClick={() => setShowConfirmPassword(false)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} /> : <IoMdEyeOff onClick={() => setShowConfirmPassword(true)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />}
                    </div>
                    {passwordMatchError && <div className="text-red-400 text-sm mt-1">Passwords do not match</div>}
                </div>

                <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg text-xs md:text-sm" type="submit">
                    Sign Up
                </button>

                {submitted && <p className="text-green-400 text-center text-sm">Account created successfully!</p>}
                {studentExist && <p className="text-red-400 text-sm text-center">Student already exists with this Roll Number or Email.</p>}
                <p className={`text-sm text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Already Have an account? <span className={`cursor-pointer font-medium transition ${theme === "dark"
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-purple-600 hover:text-purple-700"
                        }`} onClick={() => setIsSignUpActive(false)}>Login</span>
                </p>
            </form>
        </div>
    );
}
