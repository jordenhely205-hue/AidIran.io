import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Globe } from "lucide-react";

const campaigns = [
  {
    id: "medical-supplies",
    title: "Emergency Medical Supplies",
    desc: "Providing essential trauma kits, medicines, and surgical equipment to hospitals facing critical shortages.",
    raised: 850400,
    goal: 1000000,
    image: "/hero_aid_workers_1775987800391.png",
    donors: "12,402"
  },
  {
    id: "food-water",
    title: "Food & Clean Water Relief",
    desc: "Daily distribution of hot meals, dry rations, and clean drinking water to displaced families in safe zones.",
    raised: 400200,
    goal: 500000,
    image: "/hero_child_portrait_1775987813159.png",
    donors: "3,000"
  }
];

export default function CampaignsPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">Ongoing Relief Operations</h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Every campaign is directly managed by our field teams with 100% transparency. Choose a cause and track your impact in real-time.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-gray-50 px-6 py-4 rounded-2xl flex flex-col items-center border border-gray-100 shadow-sm">
                <span className="text-2xl font-black text-primary-blue">08</span>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active</span>
             </div>
             <div className="bg-gray-50 px-6 py-4 rounded-2xl flex flex-col items-center border border-gray-100 shadow-sm">
                <span className="text-2xl font-black text-primary-green">100%</span>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Direct</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          {campaigns.map((camp) => (
            <div key={camp.id} className="group premium-card overflow-hidden hover:translate-y-[-8px]">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image 
                  src={camp.image} 
                  alt={camp.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black text-primary-blue flex items-center gap-2 shadow-lg">
                  <ShieldCheck className="w-4 h-4" /> VETTED RELIEF
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-3 text-sm font-black text-primary-green uppercase tracking-[0.2em] mb-4">
                   <Globe className="w-4 h-4" /> Global Support
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-primary-blue transition-colors">
                  {camp.title}
                </h2>
                <p className="text-gray-500 font-medium mb-8 line-clamp-2 leading-relaxed h-12">
                  {camp.desc}
                </p>
                
                <div className="space-y-4 mb-10">
                   <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Raised thus far</span>
                         <span className="text-3xl font-black text-gray-900tracking-tighter">${camp.raised.toLocaleString()}</span>
                      </div>
                      <span className="text-primary-green font-black text-lg">{Math.round((camp.raised / camp.goal) * 100)}%</span>
                   </div>
                   <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div 
                         className="h-full bg-primary-green transition-all duration-1000" 
                         style={{ width: `${(camp.raised / camp.goal) * 100}%` }}
                      />
                   </div>
                   <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Target Goal: ${camp.goal.toLocaleString()}</p>
                </div>

                <Link href={`/campaigns/${camp.id}`} className="block">
                   <button className="w-full btn-primary h-16 text-lg rounded-[1.5rem] flex items-center justify-center gap-3 shadow-emerald-100">
                      Support Campaign <ArrowRight className="w-6 h-6" />
                   </button>
                </Link>
                
                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                   <span>{camp.donors} Trusted Donors</span>
                   <span className="text-primary-blue">Live Updates Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
