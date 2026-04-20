"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { ShieldCheck, Globe, Users, TrendingUp, Save, Upload, Copy } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [settings, setSettings] = useState<any>({
    usdtAddress: "",
    btcAddress: "",
    ethAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") redirect("/admin/login");
    if (status === "authenticated") {
        fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const [statsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/settings")
      ]);
      const statsData = await statsRes.json();
      const settingsData = await settingsRes.json();
      setStats(statsData);
      setSettings(settingsData);
    } catch (e) {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      alert("Settings updated successfully!");
    } catch (e) {
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Initializing Secure Dashboard...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
               <ShieldCheck className="w-8 h-8 text-primary-blue" /> Admin Operational Hub
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">AidIran.io Command Center</p>
          </div>
          <div className="flex gap-4">
             <button onClick={fetchData} className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Refresh Node</button>
             <button className="px-6 py-3 bg-primary-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100">Export Registry</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: "Total Impact", value: `$${stats?.totalRaised?.toLocaleString()}`, icon: <TrendingUp className="w-6 h-6" />, color: "text-primary-green" },
              { label: "Verified Donors", value: stats?.donorCount?.toLocaleString(), icon: <Users className="w-6 h-6" />, color: "text-primary-blue" },
              { label: "Vetted Missions", value: "08", icon: <Globe className="w-6 h-6" />, color: "text-purple-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                    {stat.icon}
                 </div>
                 <div>
                    <h3 className={`text-4xl font-black tracking-tighter mb-1 ${stat.color}`}>{stat.value}</h3>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                 </div>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Recent Activity */}
           <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-2xl font-black mb-8 tracking-tighter">Real-Time Ledger</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                     <th className="pb-6">Donor Identity</th>
                     <th className="pb-6">Amount</th>
                     <th className="pb-6">Gateway</th>
                     <th className="pb-6">Timestamp</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm font-bold text-gray-600">
                    {stats?.recentDonations?.length > 0 ? stats.recentDonations.map((d: any, i: number) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-6">{d.donorName}</td>
                        <td className="py-6 text-primary-green">{d.currency} {d.amount}</td>
                        <td className="py-6 uppercase text-[10px] tracking-widest">{d.paymentMethod}</td>
                        <td className="py-6 opacity-60 font-medium">{new Date(d.createdAt).toLocaleDateString()}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="py-12 text-center opacity-40 italic">Waiting for incoming signals...</td></tr>
                    )}
                 </tbody>
               </table>
             </div>
           </div>

           {/* Settings Panel */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-black mb-6 tracking-tighter">Mission Config</h3>
                 <div className="space-y-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">USDT (TRC20/ERC20)</label>
                       <input 
                         value={settings.usdtAddress} 
                         onChange={(e) => setSettings({...settings, usdtAddress: e.target.value})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-sm font-black focus:outline-none focus:border-primary-blue transition-all" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">BTC Network Address</label>
                       <input 
                         value={settings.btcAddress} 
                         onChange={(e) => setSettings({...settings, btcAddress: e.target.value})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-sm font-black focus:outline-none focus:border-primary-blue transition-all" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Campaign Target Goal ($)</label>
                       <input 
                         type="number"
                         value={settings.targetGoal} 
                         onChange={(e) => setSettings({...settings, targetGoal: Number(e.target.value)})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-sm font-black focus:outline-none focus:border-primary-blue transition-all" 
                       />
                    </div>
                    <button 
                      onClick={saveSettings} 
                      disabled={saving}
                      className="w-full bg-primary-blue text-white h-16 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                      {saving ? "Deploying..." : <><Save className="w-5 h-5" /> Push Changes</>}
                    </button>
                 </div>
              </div>

              <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white">
                 <h4 className="text-lg font-black mb-4 tracking-tight">Transparency Relay</h4>
                 <p className="text-xs font-medium text-gray-400 leading-loose mb-6">
                    Upload new field proof to update all campaigns. Verified photos will be automatically synced to global timelines.
                 </p>
                 <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <Upload className="w-6 h-6 mx-auto mb-2 opacity-40 text-primary-green" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Queue File</span>
                 </div>
              </div>

              {/* Payment integration Guide */}
              <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
                 <h4 className="text-lg font-black mb-4 tracking-tight">Payment Integration Guide</h4>
                 <div className="space-y-4 text-xs font-bold leading-relaxed opacity-90">
                    <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                       <p className="text-primary-green mb-1 uppercase tracking-widest text-[10px]">Crypto Assets</p>
                       <p>Change addresses in the "Mission Config" above. Users will see the new address instantly.</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                       <p className="text-yellow-400 mb-1 uppercase tracking-widest text-[10px]">Stripe / PayPal</p>
                       <p>Update your API Keys in your hosting provider's (Vercel/VPS) "Environment Variables" to make payments live.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
