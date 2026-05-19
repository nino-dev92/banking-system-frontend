import "../styles/sidenav.css";
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiHandWithdraw } from "react-icons/pi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type NavProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({ open, setOpen }: NavProps) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <MdOutlineDashboard size={22} /> },
    { to: "/deposit", label: "Deposit", icon: <FcMoneyTransfer size={22} /> },
    { to: "/withdraw", label: "Withdraw", icon: <PiHandWithdraw size={22} /> },
    { to: "/transfer", label: "Transfer", icon: <FaMoneyBillTransfer size={22} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col w-64 bg-slate-900 h-screen fixed left-0 top-0 z-50 border-r border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              C
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none tracking-tight">CPRBANK</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Premium Vault</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              setAuth({});
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-rose-400 font-bold hover:bg-rose-500/10 transition-colors uppercase text-xs tracking-widest border border-slate-800"
          >
            <FaPowerOff />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-slate-900 z-70 transition-transform duration-500 ease-in-out sm:hidden flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              C
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none tracking-tight">CPRBANK</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Premium Vault</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-slate-400">
            <IoArrowBackCircleOutline size={32} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800"
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="font-semibold text-lg">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              setAuth({});
              navigate("/login");
            }}
            className="w-full h-14 bg-rose-500/10 text-rose-400 rounded-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <FaPowerOff />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
