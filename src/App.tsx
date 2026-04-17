import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./pages/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/actions/Deposit";
import Withdraw from "./pages/actions/Withdraw";
import Transfer from "./pages/actions/Transfer";
import LandingPage from "./pages/landingpage/LandingPage";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
        </Route>
        <Route path="/spinner" element={<Spinner />} />
      </Routes>
    </>
  );
}

export default App;
