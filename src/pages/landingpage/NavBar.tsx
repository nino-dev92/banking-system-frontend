import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-blue-950 dark:text-white">
          Sovereign Ledger
        </div>

        <div className="hidden md:flex gap-8 font-semibold text-sm">
          {["Solutions", "Security", "Vaults", "Institutional", "Insights"].map(
            (item) => (
              <a key={item} href="#" className="hover:text-blue-900">
                {item}
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold">Sign In</button>
          <button className="signature-gradient text-white px-6 py-2.5 rounded-md text-sm">
            Open Vault
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
