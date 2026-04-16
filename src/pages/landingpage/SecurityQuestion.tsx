import React from "react";

const SecuritySection: React.FC = () => {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-headline">
              Architectural Security
            </h2>
            <p className="text-lg text-on-surface-variant font-body">
              Security is not a feature; it is the foundation.
            </p>
          </div>

          <span className="material-symbols-outlined text-6xl text-primary-fixed-dim opacity-50">
            shield_lock
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quantum-Resistant",
              icon: "enhanced_encryption",
            },
            {
              title: "Tier-1 Compliance",
              icon: "verified_user",
            },
            {
              title: "Multi-Sig Governance",
              icon: "account_balance",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-surface-container-lowest p-10 rounded-xl transition-all hover:translate-y-[-8px] cursor-pointer hover:border-1"
            >
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-white">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-xl font-bold text-primary mb-4 font-headline">
                {item.title}
              </h3>

              <p className="text-on-surface-variant text-sm leading-relaxed">
                Secure infrastructure with advanced compliance and encryption.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
