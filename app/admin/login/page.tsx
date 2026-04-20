"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError("Invalid administrative credentials. Access denied.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-transform">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-black text-secondary-blue tracking-tighter">
            AidIran<span className="text-primary-green">.io</span>
          </span>
        </Link>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Administrative Portal</h2>
        <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-widest">Secure Entry Only</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-10 shadow-2xl rounded-[2.5rem] border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <ShieldAlert className="w-24 h-24" />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <ShieldAlert className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Email Identity</label>
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-blue">
                    <Lock className="h-4 w-4" />
                 </div>
                 <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-0 transition-all font-bold"
                    placeholder="admin@aidiran.io"
                 />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Security Key</label>
              <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-blue">
                    <Lock className="h-4 w-4" />
                 </div>
                 <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-0 transition-all font-bold"
                    placeholder="••••••••••••"
                 />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 h-16 rounded-2xl shadow-xl shadow-emerald-100 disabled:opacity-50"
              >
                {loading ? "Authenticating..." : (
                  <>Secure Access <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">
             Authorized Personnel Only <br /> All Access Attempts Are Logged
          </p>
        </div>
      </div>
    </div>
  );
}
