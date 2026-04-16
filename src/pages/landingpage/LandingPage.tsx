import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "../../components/NavBar";
import SecuritySection from "./SecurityQuestion";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-background text-on-surface">
      <Navbar />
      <main className="pt-20 z-2">
        <Hero />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
