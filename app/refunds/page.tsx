export default function RefundsPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-12">Refund Protocol</h1>
        
        <div className="space-y-12">
          <div className="bg-primary-blue/5 p-10 rounded-[2.5rem] border border-primary-blue/10">
            <h2 className="text-2xl font-black text-primary-blue mb-4 tracking-tight italic">The Humanitarian Context</h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Due to the nature of emergency relief—where funds are often converted to physical supplies and mobilized within hours—donations are generally considered <strong>final and non-refundable</strong>.
            </p>
          </div>

          <div className="space-y-10 px-4">
             <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Fiat Transaction Disputes</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  We recognize that mistakes happen. For donations via Card or PayPal, we will consider refund requests within <strong>48 hours</strong> of the transaction if the donation was an obvious error.
                </p>
             </div>

             <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Crypto Irreversibility</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Cryptocurrency donations (USDT, BTC, ETH) are processed via immutable blockchain ledgers. These transactions cannot be reversed or refunded under any technical circumstance. 
                </p>
             </div>

             <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">How to Request a Review</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  To request a refund review, email our lead operations desk with your transaction ID and the reason for the request.
                </p>
                <div className="font-black text-primary-blue text-xl">info@aidiran.io</div>
             </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
          Protocol Effective: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
