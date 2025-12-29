import { FiBookOpen, FiDownload, FiClock, FiLayers } from 'react-icons/fi';
import { ThemeContext } from '../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function SubjectCard({ subject, index }) {
    const { theme } = useContext(ThemeContext);

    // Dynamic Glass Styles based on theme
    const glassCardStyle = theme === "light"
        ? "bg-white/40 border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-800"
        : "bg-gray-900/40 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-gray-100";

    const badgeStyle = theme === "light"
        ? "bg-blue-500/10 text-blue-700 border-blue-200/50"
        : "bg-blue-400/10 text-blue-300 border-blue-400/20";

    const subTextStyle = theme === "light" ? "text-gray-600" : "text-gray-400";

    return (
        <div 
            className={`
                relative group overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1
                flex flex-col justify-between p-5 gap-4
                ${glassCardStyle}
            `}
        >
            {/* Optional: A subtle gradient blob in the background for depth if you want it */}
            <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none ${theme === 'light' ? 'bg-blue-400' : 'bg-[#0FB8AD]'}`}></div>

            <div>
                {/* Header: Badges */}
                <div className='flex justify-between items-start mb-3'>
                    <div className='flex gap-2 text-xs font-semibold tracking-wide'>
                        <span className={`px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeStyle}`}>
                            {subject.branch}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full border backdrop-blur-sm ${theme === "light" ? "bg-gray-200/50 border-gray-300/50 text-gray-700" : "bg-gray-700/30 border-gray-600/30 text-gray-300"}`}>
                            Sem {subject.semester}
                        </span>
                    </div>
                </div>

                {/* Body: Title & Info */}
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-bold leading-tight line-clamp-2'>
                        {subject.name}
                    </h1>
                    
                    <div className={`grid grid-cols-2 gap-y-2 text-sm ${subTextStyle}`}>
                        {/* <div className='flex items-center gap-2'>
                            <FiLayers className="opacity-70" /> 
                            <span>Credits: <span className="font-medium opacity-100">{subject.credits}</span></span>
                        </div> */}
                        <div className='flex items-center gap-2'>
                            <FiBookOpen className="opacity-70" /> 
                            <span>PYQs: <span className="font-medium opacity-100">{subject.pyqs_available || 0}</span></span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FiDownload className="opacity-70" /> 
                            <span>Downloads: <span className="font-medium opacity-100">{subject.downloads || 0}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer: Action Button */}
            <Link to={`/subject/${subject._id}`} className="mt-2">
                <button className='group/btn relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/90 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-95 cursor-pointer'>
                    <FiBookOpen className="text-lg transition-transform group-hover/btn:-rotate-12" />
                    <span>View Materials</span>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                </button>
            </Link>
        </div>
    );
}