import { MdOutlineMenu } from "react-icons/md";
import React from "react";

type BarProps = {
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBar = ({ name, setOpen, open }: BarProps) => {
  return (
    <header className="fixed top-0 left-0 sm:left-64 right-0 h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-8 z-40">
      <div className="flex sm:hidden cursor-pointer hover:border-1 transition ease-in duration-100 rounded p-1">
        <MdOutlineMenu size={30} onClick={() => setOpen(!open)} />
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:flex text-xl font-bold text-blue-950">
          CPR Bank
        </span>
      </div>
      <h2 className="text-2xl font-bold">Welcome {name?.toUpperCase()}</h2>
    </header>
  );
};

export default TopBar;
