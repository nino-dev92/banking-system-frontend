import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState<string>("");

  return (
    <nav className="navbar">
      <div className="logo">CPR Bank</div>

      <div className="nav-links">
        <NavLink
          to="/login"
          className={active === "login" ? "active" : ""}
          onClick={() => setActive("login")}
        >
          Log In
        </NavLink>
        <NavLink
          to="/signup"
          className={active === "signup" ? "active" : ""}
          onClick={() => setActive("signup")}
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
