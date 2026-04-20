import Link from "next/link";
import { ShieldCheck, Eye, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function TransparencyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 py-24">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">Transparency & Trust</h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              We believe trust is earned through evidence. At AidIran.io, we track every transaction and provide visual proof of every distribution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 container px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-black text-primary-blue uppercase tracking-widest">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">The 100% Impact Promise</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Except for third-party payment processing fees (Stripe/PayPal), every cent of your donation is used for on-ground relief operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              { 
                icon: <FileText className="w-6 h-6 text-primary-blue" />, 
                title: "Public Receipts", 
                desc: "We upload official invoices and procurement receipts for all medical and food supplies purchased." 
              },
              { 
                icon: <Eye className="w-6 h-6 text-primary-green" />, 
                title: "Visual Evidence", 
                desc: "Our field volunteers record photos and videos of distributions, ensuring donors see the impact firsthand." 
              },
              { 
                icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />, 
                title: "Audited Ledger", 
                desc: "An internal ledger is maintained and available for scrutiny by high-tier donors and institutional partners." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-blue rounded-[3rem] p-12 text-white relative overflow-hidden">
           <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
           <h3 className="text-3xl font-black mb-6 tracking-tight">Vetting & Compliance</h3>
           <div className="space-y-6 text-blue-100 font-medium">
              <p>
                Our partners are selected based on strict criteria:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-green shrink-0" />
                  <span>Valid legal NGO status in respective jurisdictions.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-green shrink-0" />
                  <span>Proven record of delivering aid in conflict zones.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-green shrink-0" />
                  <span>Willingness to provide GPS-tagged and time-stamped distribution data.</span>
                </li>
              </ul>
              <div className="pt-10">
                <Link href="/campaigns" className="inline-flex items-center gap-3 bg-white text-primary-blue px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-colors">
                  View Real-World Proof <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
