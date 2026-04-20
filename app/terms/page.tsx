export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-12">Terms of Operations</h1>
        
        <div className="prose prose-lg max-w-none text-gray-500 font-medium leading-relaxed space-y-12">
          <section className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">1. Purpose of Platform</h2>
            <p>
              AidIran.io is a humanitarian crowdfunding platform designed to mobilize resources for civilian relief. By using this service, you acknowledge that all contributions are intented for charitable purposes as described in our active campaigns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">2. Allocation of Funds</h2>
            <p>
              We guarantee that 100% of the funds received (net of payment gateway fees) are disbursed to the designated relief efforts. We do not charge a platform fee for our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">3. Donor Conduct & Safety</h2>
            <p>
              Donors must provide accurate information if choosing non-anonymous options. We use bank-grade encryption to secure all financial and personal data. We reserve the right to reject donations from sources verified as fraudulent by our payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">4. Intellectual Property</h2>
            <p>
              All evidence, photos, and reports published on this site are property of AidIran.io and our respective NGO partners. Re-publication without attribution or written consent is prohibited.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
