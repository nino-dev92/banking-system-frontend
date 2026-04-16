import React, { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import useAxios from "../api/apiAxios";
import type { AxiosResponse } from "axios";

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setMessage("Password must be 6 digits");
      return;
    }
    const body: Object = JSON.stringify({ username, password });
    try {
      const response: AxiosResponse = await useAxios.post(
        "/auth/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(body);
      setUsername("");
      setPassword("");
      if (response.status === 201) {
        setMessage("Signup successful");
        navigate("/login");
      }
    } catch (error: any) {
      setMessage(error.response.data?.error);
    }
  };

  return (
    <div className="signup-container">
      <main className="signup-main">
        <Navbar />
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
              <div>
                <p className="text-center text-red-500">{message}</p>
              </div>
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
              By creating an account, you agree to the Sovereign Vault protocol
              and privacy standards.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Signup;
