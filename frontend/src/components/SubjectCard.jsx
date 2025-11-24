import { FaStar } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';
import { ThemeContext } from '../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function SubjectCard({ subject, index }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`border ${theme === "light" ? "border-gray-400" : "border-gray-700"} rounded-lg shadow-md p-4 flex flex-col gap-2 hover:scale-105 transition-transform`}>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 text-white text-sm font-medium'>
                    <span className={`rounded-lg border-2 ${theme === "light" ? "text-blue-800" : "text-blue-200"} border-blue-700 px-2 py-1 bg-blue-600/30`}>{subject.branch}</span>
                    <span className={`rounded-lg border-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"} border-gray-700 px-2 py-1 bg-gray-100/5`}>Sem {subject.semester}</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <h1 className={`text-lg font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{subject.name}</h1>
                <h3 className={`flex justify-between items-center font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>Credits: <span>{subject.credits}</span></h3>
                <h3 className={`flex justify-between items-center font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>PYQs Available: <span>{subject.pyqs_available || 0}</span></h3>
                <h3 className={`flex justify-between items-center font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>Downloads: <span>{subject.downloads || 0}</span></h3>
            </div>
            <Link to={`/subject/${subject._id}`}>
                <button className='flex gap-2 items-center justify-center w-full rounded-lg bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-white py-2 font-semibold text-xs md:text-sm hover:shadow-lg transition-all cursor-pointer'>
                    <FiBookOpen /> View PYQs
                </button>
            </Link>
        </div>
    );
}
