"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // In actual usage, if user doesn't exist, we might hit authClient.signUp first if it's the first time owner config
    const { data, error } = await authClient.signIn.email({
        email, 
        password,
    });
    
    if (error) {
       setError(error.message || "Failed to authenticate.");
       setLoading(false);
       return;
    }
    
    window.location.href = "/admin"; // Redirect on success
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black -z-10" />
      
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-space tracking-tight mb-2">Secure Access</h1>
          <p className="text-gray-500 text-sm">Enter your administrative credentials</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-[2rem] p-8 border border-white/10 shadow-2xl">
          {error && (
             <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center">
               {error}
             </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="owner@domain.com"
                className="w-full px-5 py-3.5 glass rounded-xl border border-white/10 text-white text-sm bg-transparent placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all font-medium"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest font-medium block">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-5 py-3.5 glass rounded-xl border border-white/10 text-white text-sm bg-transparent placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all font-medium"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                 <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : "Authenticate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
