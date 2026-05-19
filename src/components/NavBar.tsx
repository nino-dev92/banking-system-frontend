import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-12 z-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">
          C
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">CPRBANK</span>
      </div>

      <div className="flex items-center gap-6">
        <NavLink
          to="/login"
          className={({ isActive }) => 
            `text-sm font-bold uppercase tracking-widest transition-colors ${
              isActive ? "text-blue-600" : "text-slate-900 hover:text-black"
            }`
          }
        >
          Log In
        </NavLink>
        <NavLink
          to="/signup"
          className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-slate-900/10 active:scale-95"
        >
          Get Started
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
