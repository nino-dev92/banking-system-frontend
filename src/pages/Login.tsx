import { useState, type FormEvent } from "react";
import useAxios from "../hooks/useAxios";
import React from "react";
import Navbar from "../components/NavBar";

import { useAuth } from "../context/AuthProvider";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const apiAxios = useAxios();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = { username: username.trim().toLowerCase(), password };
    try {
      const response = await apiAxios.post(
        "/auth/login",
        body,
        { headers: { "Content-Type": "application/json" } },
      );

      setAuth({
        accessToken: response?.data?.accessToken,
        username: response?.data?.username,
        islogged: true,
      });

      toast.success("Login successful");

     setTimeout(() => {
      if (!response?.data?.accNumber) navigate("/create-account");
      if (response.status == 200) navigate("/dashboard");
     }, 2000);

    } catch (error: any) {
      toast.error(error.response.data?.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Outfit']">
      <Toaster position="top-right" richColors />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Left Panel - Visuals & Branding */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-lg shadow-blue-600/20">
                C
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                Institutional Grade <br />
                <span className="text-blue-400">Wealth Management.</span>
              </h2>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-sm font-light">
                Access the world's most resilient private banking infrastructure. 
                Secured by titanium-grade encryption protocols.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-4 h-1 bg-slate-700 rounded-full"></div>)}
              </div>
              <span>Trusted by Global Entities</span>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="p-8 sm:p-16 flex flex-col justify-center">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
              <p className="text-slate-500 mt-2 font-medium">Please verify your credentials to enter the vault.</p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter your system ID"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all group-hover:border-slate-300"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Lock Recovery</a>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all group-hover:border-slate-300"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
              >
                Execute Login
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </form>

            <div className="mt-10 text-center text-sm">
              <span className="text-slate-400">Don't have an institutional account? </span>
              <button 
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Apply for Entry
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center border-t border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} CPR Bank Institutional. Secured by QuantumSafe™.
        </p>
      </footer>
    </div>
  );
};

export default Login;
