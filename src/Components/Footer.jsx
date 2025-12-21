import { Link } from "react-router";
import { Heart, Mail, MapPin, Facebook, Instagram, Twitter, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand & Mission */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-xl bg-[#ea0606] flex items-center justify-center shadow-lg shadow-red-900/20">
                                <Heart className="h-6 w-6 text-white fill-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Blood<span className="text-[#ea0606]">Link</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Empowering communities by connecting life-saving blood donors with those in urgent need. Every drop counts in our mission to save lives.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#ea0606] hover:text-white transition-all duration-300 border border-slate-700"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="hover:text-[#ea0606] transition-colors">Home</Link></li>
                            <li><Link to="/donation-requests" className="hover:text-[#ea0606] transition-colors">Donation Requests</Link></li>
                            <li><Link to="/search" className="hover:text-[#ea0606] transition-colors">Search Donors</Link></li>
                            <li><Link to="/funding" className="hover:text-[#ea0606] transition-colors">Funding & Donate</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="#" className="hover:text-[#ea0606] transition-colors">How it Works</Link></li>
                            <li><Link to="#" className="hover:text-[#ea0606] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-[#ea0606] transition-colors">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-[#ea0606] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm">
                                <Phone size={18} className="text-[#ea0606] shrink-0" />
                                <span>+880 1234 567 890</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <Mail size={18} className="text-[#ea0606] shrink-0" />
                                <span>support@bloodlink.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <MapPin size={18} className="text-[#ea0606] shrink-0" />
                                <span>123 Health Ave, Sector 7, Dhaka</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} BloodLink. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Security</Link>
                        <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;