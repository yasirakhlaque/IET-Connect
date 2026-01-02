import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ModernDropdown({ options, value, onChange, placeholder, theme }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl font-medium transition-all min-w-[120px] md:min-w-[160px] ${
                    theme === "dark"
                        ? "bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white"
                        : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm"
                }`}
            >
                <span className="text-xs md:text-sm">
                    {value || placeholder}
                </span>
                <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl border z-[100] ${
                        theme === "dark"
                            ? "bg-[#1e293b] border-white/10 backdrop-blur-xl"
                            : "bg-white border-gray-200"
                    }`}
                >
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 transition-all text-xs md:text-sm ${
                                value === option
                                    ? theme === "dark"
                                        ? "bg-blue-500/20 text-blue-300 font-medium"
                                        : "bg-blue-50 text-blue-700 font-medium"
                                    : theme === "dark"
                                    ? "text-gray-300 hover:bg-white/[0.05]"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
