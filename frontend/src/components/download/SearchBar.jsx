import { FaSearch } from "react-icons/fa";

export default function SearchBar({ searchQuery, setSearchQuery, theme }) {
    return (
        <div className={`flex items-center gap-3 flex-1 rounded-xl px-4 py-2.5 border ${
            theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-gray-200"
        }`}>
            <FaSearch className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent outline-none ${
                    theme === "dark" 
                        ? "text-white placeholder-gray-400" 
                        : "text-gray-700 placeholder-gray-500"
                }`}
            />
        </div>
    );
}
