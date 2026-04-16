import React from "react";

const Footer: React.FC = () => {
  const today: Date = new Date();
  const year = today.getFullYear();

  return (
    <footer className="w-full border-t bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-screen-2xl mx-auto gap-6">
        <div>
          <div className="text-lg text-white font-bold">CPR Bank</div>
          <div className="text-xs text-white">© {year} CPR Bank</div>
        </div>

        <div className="flex gap-6 text-xs">
          {["Terms of Service", "Privacy Policy", "Security Architecture"].map(
            (link) => (
              <a key={link} href="#">
                {link}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
