"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ConsultationBooking } from "@/lib/firestore";
import { Loader2, Eye, X, Check, Globe, Linkedin, MessageSquare, Clock, MapPin, Building2, Calendar, Mail, User } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";
import { APP_ID } from "@/lib/constants";

export function ConsultationManager() {
    const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<ConsultationBooking | null>(null);

    useEffect(() => {
        const q = query(collection(db, `apps/${APP_ID}/consultations`), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ConsultationBooking[];
            setBookings(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id: string, status: 'new' | 'contacted' | 'archived') => {
        try {
            await updateDoc(doc(db, `apps/${APP_ID}/consultations`, id), { status });
            // Close modal if the selected booking is updated
            if (selectedBooking?.id === id) {
                setSelectedBooking(prev => prev ? { ...prev, status } : null);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Consultation Requests</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{bookings.length} Requests</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950">
                        <tr>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Business</th>
                            <th className="px-6 py-3">Preferred Time</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center bg-slate-900/50">No requests found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            {booking.name}
                                            {booking.status === 'new' && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                                        </div>
                                        <div className="text-xs text-slate-500">{booking.email}</div>
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-xs">{booking.businessInfo}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs">
                                            <div>{booking.preferredTime}</div>
                                            <div className="text-slate-500">{booking.location}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs border ${booking.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            booking.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-slate-700 text-slate-300 border-slate-600'
                                            }`}>
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            className="p-2 hover:bg-slate-700 rounded transition-colors text-emerald-400"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {selectedBooking.name}
                                    <span className={`px-2 py-0.5 rounded text-xs border font-normal ${selectedBooking.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        selectedBooking.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            'bg-slate-700 text-slate-300 border-slate-600'
                                        }`}>
                                        {selectedBooking.status.toUpperCase()}
                                    </span>
                                </h2>
                                <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                                    <Mail className="w-3 h-3" /> {selectedBooking.email}
                                </p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="text-slate-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Actions */}
                            <div className="flex gap-2 mb-6">
                                {selectedBooking.status !== 'contacted' && (
                                    <button
                                        onClick={() => updateStatus(selectedBooking.id!, 'contacted')}
                                        className="flex-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Check className="w-4 h-4" /> Mark as Contacted
                                    </button>
                                )}
                                {selectedBooking.status !== 'archived' && (
                                    <button
                                        onClick={() => updateStatus(selectedBooking.id!, 'archived')}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 py-2 rounded flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Archive
                                    </button>
                                )}
                            </div>

                            {/* Info Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Contact & Social</h4>

                                    {selectedBooking.website && (
                                        <div className="flex items-start gap-3 text-slate-300">
                                            <Globe className="w-4 h-4 text-emerald-500 mt-1" />
                                            <div>
                                                <div className="text-xs text-slate-500">Website</div>
                                                <a href={selectedBooking.website} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline decoration-slate-700 underline-offset-4">
                                                    {selectedBooking.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 text-slate-300">
                                        <Linkedin className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500">Social Media</div>
                                            <a href={selectedBooking.socialMedia} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline decoration-slate-700 underline-offset-4">
                                                {selectedBooking.socialMedia}
                                            </a>
                                        </div>
                                    </div>

                                    {selectedBooking.whatsapp && (
                                        <div className="flex items-start gap-3 text-slate-300">
                                            <MessageSquare className="w-4 h-4 text-emerald-500 mt-1" />
                                            <div>
                                                <div className="text-xs text-slate-500">WhatsApp</div>
                                                {selectedBooking.whatsapp}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Scheduling</h4>

                                    <div className="flex items-start gap-3 text-slate-300">
                                        <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500">Location</div>
                                            {selectedBooking.location}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 text-slate-300">
                                        <Clock className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500">Preferred Time</div>
                                            {selectedBooking.preferredTime}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 text-slate-300">
                                        <Calendar className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500">Submitted On</div>
                                            {selectedBooking.createdAt?.toDate().toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-slate-800 pt-6">
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Business Details</h4>
                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Business Info</div>
                                            <p className="text-slate-300 text-sm leading-relaxed">{selectedBooking.businessInfo}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                    <div className="flex items-start gap-3">
                                        <MessageSquare className="w-4 h-4 text-emerald-500 mt-1" />
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">Message / Goals</div>
                                            <p className="text-slate-300 text-sm leading-relaxed">{selectedBooking.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
