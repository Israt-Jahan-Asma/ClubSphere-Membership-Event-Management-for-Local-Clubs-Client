import React from 'react';
import { Heart, Search, Droplets, Shield, Clock, MapPin, Bell, Phone, Mail, ArrowRight } from "lucide-react";

const Featured = () => {
    // Features data
    const features = [
        { icon: Heart, title: "Easy Registration", description: "Quick and simple donor registration process." },
        { icon: MapPin, title: "Location Search", description: "Find donors near you quickly." },
        { icon: Bell, title: "Notifications", description: "Get notified when someone needs your blood type." },
        { icon: Shield, title: "Verified Donors", description: "All donors are verified for safety." },
        { icon: Clock, title: "24/7 Available", description: "Access the platform anytime." },
        { icon: Heart, title: "Community", description: "Join a caring community of donors." },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="section-container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Making Donation <span className="text-[#ea0606]">Simple</span>
                    </h2>
                    <p className="text-slate-600">We've built a platform that bridges the gap between donors and patients instantly.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="stats-card border-t-4 border-t-[#ea0606]">
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-[#ea0606]" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;