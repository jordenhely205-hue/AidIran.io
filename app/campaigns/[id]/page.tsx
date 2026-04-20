import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Globe, Clock, CheckCircle2, Heart, ArrowLeft, Users } from "lucide-react";
import DonationWidget from "@/components/DonationWidget";

export default async function CampaignSinglePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const campaignTitle = resolvedParams.id.replace("-", " ").toUpperCase();
  
  // Dynamic Image Selection
  const mainImage = resolvedParams.id === "medical-supplies" 
    ? "/hero_aid_workers_1775987800391.png" 
    : "/hero_child_portrait_1775987813159.png";

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header Info */}
      <div className="bg-gray-50 pt-16 pb-32">
        <div className="container">
           <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest mb-10 hover:text-primary-blue transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to Campaigns
           </Link>
           <div className="max-w-4xl">
              <div className="flex items-center gap-3 text-primary-green font-black uppercase tracking-widest text-xs mb-6 px-4 py-2 bg-emerald-50 w-fit rounded-full border border-emerald-100">
                 <ShieldCheck className="w-4 h-4" /> Secure Humanitarian Mission
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8 leading-tight">
                 {campaignTitle}
              </h1>
              <div className="flex flex-wrap gap-8 text-gray-500 font-bold uppercase tracking-widest text-xs">
                 <div className="flex items-center gap-2"><Globe className="w-5 h-5" /> Global Access</div>
                 <div className="flex items-center gap-2"><Users className="w-5 h-5" /> 15k+ Involved</div>
                 <div className="flex items-center gap-2 text-primary-blue"><Clock className="w-5 h-5" /> Active Since Apr 2026</div>
              </div>
           </div>
        </div>
      </div>

      <div className="container -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* Main Story Content */}
          <div className="lg:col-span-8 space-y-16">
            <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-black/5">
               <Image 
                 src={mainImage} 
                 alt={campaignTitle} 
                 fill 
                 className="object-cover" 
               />
            </div>

            <div className="space-y-10 px-4">
               <h2 className="text-4xl font-black text-gray-900 tracking-tight">The Mission Strategy</h2>
               <div className="prose prose-xl max-w-none text-gray-500 font-medium leading-relaxed space-y-6">
                  <p>
                    This is a critical intervention focused on the direct delivery of life-saving infrastructure. Due to the intensification of the conflict, supply chains have collapsed, leaving local clinics without basic trauma management essentials.
                  </p>
                  <p>
                    Our ground teams in coordination with vetted local NGOs are maintaining a secure corridor for the transport of pharmaceuticals, food rations, and medical hardware. Every dollar you contribute is allocated instantly to these logistics.
                  </p>
               </div>

               {/* Impact Points */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
                  {[
                    { title: "Direct Distribution", desc: "No red tape. Hand-to-hand delivery verified by GPS loggers." },
                    { title: "Cold Chain Storage", desc: "Ensuring all medicines stay effective during transit." },
                    { title: "Real-time Verification", desc: "Photos of every delivery published to this timeline." },
                    { title: "Vetted Ground Teams", desc: "Operations managed by UN-certified local staff." }
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:ring-2 hover:ring-primary-blue transition-all">
                       <CheckCircle2 className="w-8 h-8 text-primary-green mb-4" />
                       <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                       <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>

               {/* Timeline / Proof */}
               <div className="pt-20">
                  <h2 className="text-3xl font-black text-gray-900 mb-12 flex items-center gap-4">
                     Transparency Timeline <span className="h-1 flex-1 bg-gray-100 rounded-full" />
                  </h2>
                  <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-8 before:w-1 before:bg-gray-100 before:rounded-full">
                     {[
                       { date: "Yesterday", title: "Batch 04 Delivered", desc: "500 trauma kits reached the North-Central triage center.", color: "primary-green" },
                       { date: "3 Days Ago", title: "Security Clearance", desc: "The logistic corridor from the border was secured for next 4 shipments.", color: "primary-blue" }
                     ].map((update, i) => (
                       <div key={i} className="relative pl-24 group">
                          <div className={`absolute left-5 top-1 w-8 h-8 bg-white border-4 border-${update.color} rounded-full z-10 group-hover:scale-125 transition-transform`} />
                          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">{update.date}</span>
                             <h4 className="text-xl font-black text-gray-900 mb-2">{update.title}</h4>
                             <p className="text-gray-500 font-medium text-sm leading-relaxed">{update.desc}</p>
                             <div className="mt-6 aspect-video bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-300 text-xs border border-gray-100">
                                [FIELD PROOF IMAGE PENDING]
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-8">
               <div className="premium-card p-1 bg-white ring-1 ring-gray-100 shadow-3xl">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-8">
                       <div className="flex -space-x-3">
                          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />)}
                       </div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Supporters</span>
                    </div>

                    <div className="mb-10">
                      <div className="flex justify-between text-sm font-black text-gray-900 mb-3">
                        <span className="tracking-tighter text-3xl">$850,400</span>
                        <span className="text-primary-green self-end mb-1">85%</span>
                      </div>
                      <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                        <div className="h-full bg-primary-green w-[85%] relative overflow-hidden">
                           <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Raised of $1M target</span>
                      </div>
                    </div>

                    <DonationWidget />

                    <div className="mt-10 pt-10 border-t border-gray-50 space-y-6">
                       <h4 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Verified Supporters</h4>
                       <div className="space-y-6">
                          {[
                            { name: "Anonymous Donor", amount: "$1,000", time: "Just Now" },
                            { name: "Sarah Malik", amount: "$50", time: "2 Hours Ago" }
                          ].map((d, i) => (
                            <div key={i} className="flex gap-4 items-center">
                               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                  <Heart className="w-4 h-4 text-primary-blue fill-current" />
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-sm font-black text-gray-800 tracking-tight">{d.name}</span>
                                  <span className="text-[10px] font-bold text-primary-green uppercase tracking-widest">{d.amount} • {d.time}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>

               {/* Secondary Trust Box */}
               <div className="bg-primary-blue p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <Globe className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                  <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Your Data is Secure.</h4>
                  <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6 opacity-80">
                    We use AES-256 bank-level encryption and full Stripe-compliant verification for all financial transits.
                  </p>
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="w-8 h-8 text-primary-green" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Global Safety Protocol</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
