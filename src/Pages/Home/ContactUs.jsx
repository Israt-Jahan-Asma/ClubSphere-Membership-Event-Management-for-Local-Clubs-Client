import { Phone, Mail, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import React, { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically connect to your backend or EmailJS
        console.log("Form Submitted:", formData);
        toast.success("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {/* CTA Section */}
            <section className="py-10">
                <div className="section-container">
                    <div className="bg-[#ea0606] rounded-[2rem] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Become a Lifesaver?</h2>
                        <p className="text-red-100 text-lg mb-10 max-w-xl mx-auto">
                            Your single donation can save up to three lives. Join us and start your journey as a donor today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="bg-white text-[#ea0606] hover:bg-red-50 px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2">
                                Register Now <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-[#ea0606] text-sm font-bold mb-4">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Contact <span className="text-[#ea0606]">Our Team</span>
                    </h2>
                    <p className="text-slate-600">
                        Have questions about donation? Our team is available 24/7 to help you save lives.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side: Contact Information */}
                    <div className="space-y-6">
                        <div className="stats-card flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#ea0606] transition-colors duration-300">
                                <Phone className="h-6 w-6 text-[#ea0606] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Call Us Directly</h3>
                                <p className="text-slate-600 mt-1">Emergency & General Inquiries</p>
                                <p className="text-[#ea0606] font-bold text-xl mt-1">+880 1234 567 890</p>
                            </div>
                        </div>

                        <div className="stats-card flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#ea0606] transition-colors duration-300">
                                <Mail className="h-6 w-6 text-[#ea0606] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Email Support</h3>
                                <p className="text-slate-600 mt-1">We usually respond within 24 hours.</p>
                                <p className="text-slate-900 font-semibold mt-1">support@bloodlink.com</p>
                            </div>
                        </div>

                        <div className="stats-card flex items-start gap-5 group">
                            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#ea0606] transition-colors duration-300">
                                <MapPin className="h-6 w-6 text-[#ea0606] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Main Office</h3>
                                <p className="text-slate-600 mt-1">123 Health Avenue, Sector 7</p>
                                <p className="text-slate-900 font-semibold mt-1">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <MessageSquare className="text-[#ea0606]" />
                            <h3 className="text-2xl font-bold text-slate-900">Send a Message</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="input-field"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="input-field"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="input-field"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="input-field resize-none"
                                    placeholder="Type your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary w-full py-4 text-lg">
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;