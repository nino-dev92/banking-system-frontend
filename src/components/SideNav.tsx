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

  return (
    <div>
      {/**Desktop nav */}
      <aside className="hidden sm:flex bg-gradient-to-br from-[#00296f] to-[#001644] h-screen w-64 fixed left-0 top-0 overflow-y-auto z-50 flex-col py-8 px-4">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl text-white font-bold text-blue-950 leading-tight">
                CPR
              </div>
              <div className="text-[10px] text-white uppercase tracking-widest font-bold">
                Institutional Vault
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 navlinks">
          <NavLink
            to="/dashboard"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer text-slate-500 hover:text-blue-900 hover:bg-blue-500`}
          >
            <span>
              <MdOutlineDashboard />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/deposit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <FcMoneyTransfer />
            </span>
            <span>Deposit</span>
          </NavLink>
          <NavLink
            to="/withdraw"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <PiHandWithdraw />
            </span>
            <span>Withdraw</span>
          </NavLink>
          <NavLink
            to="/transfer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <FaMoneyBillTransfer />
            </span>
            <span>Transfer</span>
          </NavLink>
        </nav>

        <div className="mt-auto">
          <button
            className="w-full border-white text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-500 transition"
            onClick={() => {
              localStorage.removeItem("auth");
              setAuth({});
              navigate("/login");
            }}
          >
            <span>
              <FaPowerOff />
            </span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/**Mobile Nav */}
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-65"} sm:flex bg-gradient-to-br from-[#00296f] to-[#001644] h-screen w-64 fixed left-0 top-0 overflow-y-auto z-50 flex-col py-8 px-4 transition-all duration-700`}
      >
        <div className="mb-10 px-2">
          <div className="">
            <IoArrowBackCircleOutline
              size={30}
              style={{ color: "white", marginBottom: "20px" }}
              className="cursor-pointer hover:text-red-500"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl text-white font-bold text-blue-950 leading-tight">
                CPR
              </div>
              <div className="text-[10px] text-white uppercase tracking-widest font-bold">
                Institutional Vault
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 navlinks">
          <NavLink
            to="/dashboard"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer text-slate-500 hover:text-blue-900 hover:bg-blue-500`}
          >
            <span>
              <MdOutlineDashboard />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/deposit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <FcMoneyTransfer />
            </span>
            <span>Deposit</span>
          </NavLink>
          <NavLink
            to="/withdraw"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <PiHandWithdraw />
            </span>
            <span>Withdraw</span>
          </NavLink>
          <NavLink
            to="/transfer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-blue-900 hover:bg-blue-500 transition cursor-pointer"
          >
            <span>
              <FaMoneyBillTransfer />
            </span>
            <span>Transfer</span>
          </NavLink>
        </nav>

        <div className="mt-auto">
          <button
            className="w-full border-white text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-500 transition"
            onClick={() => {
              localStorage.removeItem("auth");
              setAuth({});
              navigate("/login");
            }}
          >
            <span>
              <FaPowerOff />
            </span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
