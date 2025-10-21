import { useContext } from 'react';
import { ThemeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
export default function ThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
    setTheme(prevTheme => {
        const newTheme = prevTheme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme); // Save to localStorage
        return newTheme;
    });
};


    return (
        <button
            onClick={toggleTheme}
            className={`p-3  rounded-full text-white transition-all duration-200 ${theme === "light" ? "bg-black hover:bg-gray-800" : "bg-gray-500/10 text-yellow-500 hover:bg-gray-300/30"}`}
        >
            {theme === "light" ? <FaMoon /> : <MdOutlineWbSunny />}
        </button>
    );
}