import { MdOutlineMenu } from "react-icons/md";
import React from "react";

type BarProps = {
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBar = ({ name, setOpen, open }: BarProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 sm:left-64 h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-10 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <MdOutlineMenu size={24} />
        </button>
        <div className="h-10 w-px bg-slate-200 hidden sm:block mx-2"></div>
        <div className="hidden sm:block">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Security Status</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-900">Encrypted Session</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900 leading-none">{name.toUpperCase()}</p>
          <p className="text-xs text-slate-500 mt-1">Premium Client</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold shadow-sm">
          {name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
