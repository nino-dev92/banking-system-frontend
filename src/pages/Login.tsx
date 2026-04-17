import { useState, type FormEvent, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import React from "react";
import Navbar from "../components/NavBar";
import "../styles/login.css";
import { useAuth } from "../context/AuthProvider";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const apiAxios = useAxios();

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body: Object = { username: username.toLowerCase(), password };
    try {
      const response: AxiosResponse = await apiAxios.post(
        "/auth/login",
        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } },
      );

      setAuth({
        accessToken: response?.data?.accessToken,
        username: response?.data?.username,
        islogged: true,
      });
      if (!response?.data?.accNumber) navigate("/create-account");
      if (response.status == 200) navigate("/dashboard");
    } catch (error: any) {
      setMessage(error.response.data?.error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      {/* Main */}
      <main className="main">
        <div className="login-container">
          {/* Left Panel */}
          <div className="left-panel">
            <div>
              <h2>Securing the Global Standard.</h2>
              <p>
                Access the world's most resilient institutional vault. Your
                assets are protected by architectural grade security protocols.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <div>
              <p className="text-center text-red-500">{message}</p>
            </div>
            <div className="header">
              <h1>Log In</h1>
              <br />
              <p>Verification required for institutional entry.</p>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Your username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label>Password</label>
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          © {new Date().getFullYear()} CPR Bank Institutional Banking. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;
