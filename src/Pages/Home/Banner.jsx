import { Link } from "react-router";
import { Heart, Search, Droplets, Shield, Clock, MapPin, Bell, Phone, Mail, ArrowRight } from "lucide-react";

const Banner = () => {
    // Stats data
    const stats = [
        { icon: Users, value: "10K+", label: "Active Donors" },
        { icon: Droplets, value: "25K+", label: "Lives Saved" },
        { icon: Heart, value: "500+", label: "Daily Donations" },
    ];

    

    return (
        <div className="pt-6"> {/* Reduced top padding from pt-20 to pt-6 */}

            {/* Hero / Banner Section */}
            <section className="bg-slate-50 py-12 md:py-20"> {/* Reduced py-16 to py-12 */}
                <div className="section-container">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#ea0606] text-sm font-bold mb-6 border border-red-100">
                            <Heart className="h-4 w-4 fill-[#ea0606]" />
                            Save Lives, Donate Blood
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Your Blood Can <span className="text-[#ea0606]">Save Lives</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            Join our community of heroes. Connect with those in need and make a lasting difference in someone's life today.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/register" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                                <Heart className="h-5 w-5 fill-white" />
                                Join as a Donor
                            </Link>
                            <Link to="/search" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
                                <Search className="h-5 w-5" />
                                Search Donors
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                        <stat.icon className="h-6 w-6 text-[#ea0606]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>




        </div>
    );
};

// Internal icon fix for missing import in original code
const Users = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export default Banner;