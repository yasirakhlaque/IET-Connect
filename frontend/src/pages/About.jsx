import { useContext } from "react";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGithub, FaLinkedin, FaGraduationCap, FaRocket, FaUsers, FaHeart } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function About() {
    const { theme } = useContext(ThemeContext);

    const teamMembers = [
        {
            name: "Dev Anand",
            role: "Visionary & Idea Creator",
            image: "/team/dev-anand-sir.jpg",
            iconColor: theme === "dark" ? "text-yellow-400" : "text-yellow-600",
            bgGradient: theme === "dark" 
                ? "from-yellow-900/40 to-orange-900/40 border-yellow-700/50" 
                : "from-yellow-50 to-orange-50 border-yellow-200",
            description: "The mastermind behind IET-Connect. Dev conceptualized the vision of creating a collaborative platform for students.",
            education: "Researcher at IIT Bombay",
            badge: "Alumni of DBRAU",
            achievement: "Currently working at IIT Bombay as a researcher, Dev brings invaluable insights from his journey.",
            social: {
                github: "https://github.com/heydevanand",
                linkedin: "https://www.linkedin.com/in/heydevanand/",
                twitter: "https://x.com/heydevanand"
            }
        },
        {
            name: "Yasir Akhlaque",
            role: "Developer & Designer",
            image: "/team/yasir-akhlaque.jpg",
            iconColor: theme === "dark" ? "text-teal-400" : "text-teal-600",
            bgGradient: theme === "dark" 
                ? "from-teal-900/40 to-blue-900/40 border-teal-700/50" 
                : "from-teal-50 to-blue-50 border-teal-200",
            description: "Transformed the vision into reality. Yasir architected, designed, and developed the entire platform from scratch.",
            education: "3rd Year CSE Student at DBRAU",
            badge: "Full-Stack Developer",
            achievement: "Passionate about creating impactful solutions that help students succeed academically.",
            social: {
                github: "https://github.com/yasirakhlaque",
                linkedin: "https://www.linkedin.com/in/yasirakhlaque",
                twitter: "https://x.com/___Yas_bytes_"
            }
        }
    ];

    const platformFeatures = [
        {
            icon: FaUsers,
            title: "Collaborative Learning",
            description: "Students helping students through shared resources"
        },
        {
            icon: FaRocket,
            title: "Easy Access",
            description: "Quick and simple access to previous year question papers"
        },
        {
            icon: FaHeart,
            title: "Community Driven",
            description: "Built by students, for students, with love and dedication"
        }
    ];

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navbar />
            
            <div className="pt-20 pb-16 px-4">
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            theme === "dark" 
                                ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" 
                                : "bg-teal-100 text-teal-700 border border-teal-200"
                        }`}>
                            About Us
                        </span>
                    </div>
                    
                    <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        Empowering Students Through
                        <span className="block mt-2 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                            Collaborative Learning
                        </span>
                    </h1>
                    
                    <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}>
                        IET-Connect is more than just a platform—it's a movement to democratize access to 
                        educational resources and foster a culture of sharing and collaboration among students.
                    </p>
                </div>

                {/* Our Story Section */}
                <div className="max-w-6xl mx-auto mb-20">
                    <div className={`rounded-2xl p-8 md:p-12 border ${
                        theme === "dark" 
                            ? "bg-gradient-to-br from-gray-800 to-gray-900 border-white/10" 
                            : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                    } shadow-xl relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                        
                        <div className="relative z-10">
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3 ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                                <FaRocket className="text-teal-500" />
                                Our Story
                            </h2>
                            
                            <div className={`space-y-4 text-base md:text-lg leading-relaxed ${
                                theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}>
                                <p>
                                    IET-Connect was born from a simple yet powerful idea: students shouldn't struggle 
                                    to find previous year question papers and study materials. What started as a concept 
                                    by <span className="font-semibold text-teal-500">Dev Anand</span>, a brilliant mind 
                                    now working as a researcher at IIT Bombay, has transformed into a comprehensive 
                                    platform serving the entire student community.
                                </p>
                                
                                <p>
                                    <span className="font-semibold text-teal-500">Yasir Akhlaque</span>, a passionate 
                                    3rd-year Computer Science student at DBRAU, took on the challenge of bringing this 
                                    vision to life. Through countless hours of coding, designing, and refining, Yasir 
                                    single-handedly architected and developed the entire platform—from the elegant 
                                    frontend interface to the robust backend infrastructure.
                                </p>
                                
                                <p>
                                    Today, IET-Connect stands as a testament to what's possible when vision meets 
                                    execution, and when students come together to help each other succeed. We're not 
                                    just building a platform; we're building a community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        Meet The Team
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className={`rounded-2xl p-8 border ${
                                theme === "dark" 
                                    ? "bg-white/[0.03] border-white/10 hover:border-teal-500/30" 
                                    : "bg-white border-gray-200 hover:border-teal-300"
                            } shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group`}>
                                
                                {/* Background decoration */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${member.bgGradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />
                                
                                <div className="relative z-10">
                                    {/* Profile Image and Badge */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 ${
                                            theme === "dark" ? "border-white/20" : "border-gray-200"
                                        } shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to gradient with initials if image fails to load
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `
                                                        <div class="w-full h-full bg-gradient-to-br ${member.bgGradient} flex items-center justify-center">
                                                            <span class="text-3xl md:text-4xl font-bold ${member.iconColor}">
                                                                ${member.name.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                    `;
                                                }}
                                            />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            theme === "dark" 
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" 
                                                : "bg-purple-100 text-purple-700 border border-purple-200"
                                        }`}>
                                            {member.badge}
                                        </span>
                                    </div>
                                    
                                    {/* Name and Role */}
                                    <h3 className={`text-2xl font-bold mb-2 ${
                                        theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}>
                                        {member.name}
                                    </h3>
                                    
                                    <p className={`text-lg font-semibold mb-4 ${member.iconColor}`}>
                                        {member.role}
                                    </p>
                                    
                                    {/* Description */}
                                    <p className={`text-sm md:text-base mb-4 leading-relaxed ${
                                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                        {member.description}
                                    </p>
                                    
                                    {/* Education */}
                                    <div className={`flex items-center gap-2 mb-2 text-sm ${
                                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                        <FaGraduationCap className={member.iconColor} />
                                        <span className="font-medium">{member.education}</span>
                                    </div>
                                    
                                    {/* Achievement */}
                                    <p className={`text-sm italic mb-4 ${
                                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                        {member.achievement}
                                    </p>
                                    
                                    {/* Social Links (if available) */}
                                    {member.social && (
                                        <div className="flex gap-3 pt-4 border-t border-white/10">
                                            <a href={member.social.github} className={`p-2 rounded-lg transition-all ${
                                                theme === "dark" 
                                                    ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" 
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                                            }`}>
                                                <FaGithub size={20} />
                                            </a>
                                            <a href={member.social.linkedin} className={`p-2 rounded-lg transition-all ${
                                                theme === "dark" 
                                                    ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-blue-500" 
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-900"
                                            }`}>
                                                <FaLinkedin size={20} />
                                            </a>
                                            <a href={member.social.twitter} className={`p-2 rounded-lg transition-all ${
                                                theme === "dark" 
                                                    ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-900" 
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                                            }`}>
                                                <FaXTwitter size={20} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Features */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                        What We Stand For
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {platformFeatures.map((feature, index) => (
                            <div key={index} className={`rounded-xl p-6 border text-center ${
                                theme === "dark" 
                                    ? "bg-white/[0.03] border-white/10 hover:border-teal-500/30" 
                                    : "bg-white border-gray-200 hover:border-teal-300"
                            } shadow-lg transition-all duration-300 hover:shadow-xl`}>
                                <feature.icon className={`text-4xl mx-auto mb-4 ${
                                    theme === "dark" ? "text-teal-400" : "text-teal-600"
                                }`} />
                                <h3 className={`text-xl font-bold mb-2 ${
                                    theme === "dark" ? "text-white" : "text-gray-900"
                                }`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-sm ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="max-w-4xl mx-auto">
                    <div className={`rounded-2xl p-8 md:p-12 text-center border ${
                        theme === "dark" 
                            ? "bg-gradient-to-br from-teal-900/20 to-blue-900/20 border-teal-500/30" 
                            : "bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200"
                    } shadow-xl`}>
                        <FaHeart className={`text-5xl mx-auto mb-6 ${
                            theme === "dark" ? "text-teal-400" : "text-teal-600"
                        }`} />
                        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                            Our Mission
                        </h2>
                        <p className={`text-lg md:text-xl leading-relaxed ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                            To create an inclusive, accessible, and collaborative platform where every student 
                            has the resources they need to excel. We believe in the power of shared knowledge 
                            and the strength of community-driven learning.
                        </p>
                        <div className="mt-8">
                            <a href="/upload" className={`inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300`}>
                                Join Our Community
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-6xl mx-auto mt-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Built With", value: "❤️" },
                            { label: "For Students", value: "By Students" },
                            { label: "University", value: "DBRAU" },
                            { label: "Open Source", value: "Coming Soon" }
                        ].map((stat, index) => (
                            <div key={index} className={`rounded-xl p-6 text-center border ${
                                theme === "dark" 
                                    ? "bg-white/[0.03] border-white/10" 
                                    : "bg-white border-gray-200"
                            } shadow-lg`}>
                                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                                    theme === "dark" ? "text-teal-400" : "text-teal-600"
                                }`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
