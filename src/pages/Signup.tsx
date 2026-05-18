import React, { useState, type FormEvent, } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Navbar from "../components/NavBar";
import useAxios from "../api/apiAxios";
import {Toaster, toast} from "sonner";

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
   const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be 6 digits");
      return;
    }
    const body = {
      username: username.trim().toLowerCase(),
      password,
    }
    
    try {
      const response = await useAxios.post(
        "/auth/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setUsername("");
      setPassword("");
      if (response.status === 201) {
        toast.success("Signup successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.response.data?.error);
    }
  };

  return (
    <div className="signup-container">
      <main className="signup-main">
        <Navbar />
        <Toaster position="top-right" richColors/>
        {/* Left Section */}
        <section className="signup-left">
          <div className="left-content">
            <h1>Secure Your Legacy</h1>
            <p>
              Enter the sovereign vault. Our architectural approach to digital
              finance ensures your assets are secured with institutional-grade
              precision.
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className="signup-right">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Create Access</h2>
              <p>Initialize your institutional profile to begin.</p>
            </div>

            <form onSubmit={handleSubmit} className="form">
              {/* Username */}
              <div className="form-group">
                <label>Username</label>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    <span className="text-sm">
                      {passwordVisible === true ? "hide" : "show"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>

            <div className="divider">
              <span>Secure Gateway</span>
            </div>

            <div className="login-link">
              <p>
                Already have an account?
                <Link to="/login"> Log in. </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="signup-footer">
            <div className="badges">
              <div>
                <span className="material-symbols-outlined">verified_user</span>
                <span>Verified Node</span>
              </div>

              <div>
                <span className="material-symbols-outlined">encrypted</span>
                <span>E2E Encrypted</span>
              </div>
            </div>

            <p>
              By creating an account, you agree to the CPR banking protocol and
              privacy standards.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Signup;
