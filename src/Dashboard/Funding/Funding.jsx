import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Calendar, User, DollarSign } from 'lucide-react';

const Funding = () => {
    const [funds, setFunds] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/funds')
            .then(res => setFunds(res.data));
    }, [axiosSecure]);

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
                <h1 className="text-3xl font-black">Funding Records</h1>
                <p className="text-slate-400">View all contributions made by our community.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="py-5 pl-8 rounded-tl-[2rem]">Donor Email</th>
                            <th>Amount</th>
                            <th className="pr-8 text-right rounded-tr-[2rem]">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {funds.map(fund => (
                            <tr key={fund._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 pl-8 font-bold text-slate-900">{fund.donorEmail}</td>
                                <td className="font-black text-green-600">${fund.amount}</td>
                                <td className="pr-8 text-right text-slate-500">
                                    {new Date(fund.paidAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;