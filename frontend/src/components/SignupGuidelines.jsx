import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from '../App';
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdVerifiedUser, MdBlock } from 'react-icons/md';

export default function SignupGuidelines({ isOpen, onClose }) {
    const { theme } = useContext(ThemeContext);

    if (!isOpen) return null;

    const guidelines = [
        {
            icon: <IoMdMail className="text-2xl" />,
            title: "Use Real Email Address",
            description: "You MUST use a real, active email ending with valid domains (gmail.com, outlook.com, etc.)",
            type: "critical"
        },
        {
            icon: <MdVerifiedUser className="text-2xl" />,
            title: "Password Reset Links",
            description: "Fake or temporary emails won't receive password reset links. You'll lose access to your account!",
            type: "warning"
        },
        {
            icon: <FaCheckCircle className="text-2xl" />,
            title: "Correct Credentials",
            description: "Use your actual name and roll number. This helps maintain a genuine academic community.",
            type: "info"
        },
        {
            icon: <MdBlock className="text-2xl" />,
            title: "No Fake Details",
            description: "Using dummy/fake information will lead to permanent ban from the platform.",
            type: "critical"
        }
    ];

    const getTypeColor = (type) => {
        switch(type) {
            case 'critical':
                return theme === 'dark' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : 'bg-red-50 border-red-200 text-red-700';
            case 'warning':
                return theme === 'dark' 
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' 
                    : 'bg-yellow-50 border-yellow-200 text-yellow-700';
            case 'info':
                return theme === 'dark' 
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                    : 'bg-blue-50 border-blue-200 text-blue-700';
            default:
                return '';
        }
    };

    const modalContent = (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div 
                    className={`relative max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden ${
                        theme === 'dark'
                            ? 'bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-white/10'
                            : 'bg-white border border-gray-200'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={`relative px-6 py-6 border-b ${
                        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
                        
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-xl ${
                                    theme === 'dark' 
                                        ? 'bg-purple-500/20' 
                                        : 'bg-purple-100'
                                }`}>
                                    <FaExclamationTriangle className={`text-2xl ${
                                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                                    }`} />
                                </div>
                                <div>
                                    <h2 className={`text-md md:text-2xl font-bold ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Important Guidelines
                                    </h2>
                                    <p className={`text-xs md:text-sm mt-1 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Please read carefully before signing up
                                    </p>
                                </div>
                            </div>
                            
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-lg transition-all ${
                                    theme === 'dark'
                                        ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                            {guidelines.map((guideline, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border-2 ${getTypeColor(guideline.type)}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {guideline.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-md md:text-lg mb-1">
                                                {guideline.title}
                                            </h3>
                                            <p className="text-xs md:text-sm opacity-90">
                                                {guideline.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className={`mt-6 p-4 rounded-xl border ${
                            theme === 'dark'
                                ? 'bg-purple-500/5 border-purple-500/20'
                                : 'bg-purple-50 border-purple-200'
                        }`}>
                            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
                                theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                            }`}>
                                <FaCheckCircle />
                                Why This Matters?
                            </h4>
                            <ul className={`text-xs md:text-sm space-y-1 ml-6 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                <li className="list-disc">We want to maintain a genuine academic community</li>
                                <li className="list-disc">Real emails ensure you can recover your account</li>
                                <li className="list-disc">Authentic information helps us provide better services</li>
                                <li className="list-disc">Fake accounts harm the community and will be removed</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`px-6 py-4 border-t ${
                        theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                    }`}>
                        <div className="flex items-center justify-between gap-8">
                            <p className={`text-xs sm:text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                By signing up, you agree to follow these guidelines
                            </p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-xs sm:text-sm text-nowrap"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(147, 51, 234, 0.3)'};
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? 'rgba(147, 51, 234, 0.7)' : 'rgba(147, 51, 234, 0.5)'};
                }
            `}</style>
        </>
    );

    // Render the modal using a portal to the document body
    return createPortal(modalContent, document.body);
}
