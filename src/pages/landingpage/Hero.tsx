import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex align-center overflow-hidden p-5">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-10 filter grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxd4C2p-RTTdd9I8r2U6n_7WdS0KYF5NpLtLMIrWsgtkis7OY5bBz56pMKBiMS7T01037VLAvwKZz9256rTXFrrqbpXHDLVV7huROh76zI_wtdqsmteqgLg4h4OPkq3_A-a7RudG7g_1aEOupkAn19VMXC0jt0VhAOc1qLOKrOX9eQuvUoi1xujfXwRjHDxVKVTwLnI8xoCG7ZXjO-2gOjBPCu23vXgaLtUqgMr595zL6V7D4AskAq2qIR0qRohU5hC14uZHu8TwTq"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-low to-background opacity-90"></div>
      </div>

      <div className="flex align-center max-w-screen-2xl mx-auto px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <h1 className="text-6xl md:text-8xl font-extrabold text-primary leading-[0.95] tracking-tighter mb-8 font-headline">
            The Sovereign Standard for{" "}
            <span className="text-on-primary-container">
              Institutional Assets.
            </span>
          </h1>

          <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed font-body">
            Customer friendly banking for all. World class standard with up to
            date and satisfactory customer care
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="signature-gradient text-white px-10 py-5 rounded-md font-headline font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              Open Your Vault
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 signature-gradient blur-3xl opacity-10 rounded-full"></div>

            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-2xl relative border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Active Ledger Status
                </div>
                <span className="flex items-center gap-2 text-secondary font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
                  SECURED
                </span>
              </div>

              <div className="space-y-6">
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[88%] h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary"></div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-headline font-bold text-primary">
                      $4.2B+
                    </div>
                    <div className="text-xs font-label text-on-surface-variant uppercase tracking-tighter">
                      Assets Under Custody
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-headline font-semibold text-secondary">
                      Tier-1
                    </div>
                    <div className="text-xs font-label text-on-surface-variant uppercase tracking-tighter">
                      Compliance Grade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
