import React from "react";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthProvider";
import useAxios from "../hooks/useAxios";
import type { AxiosResponse } from "axios";
import Spinner from "../components/Spinner";
import TopBar from "../components/TopBar";

interface Transaction {
  type: string;
  amount: number;
  date: string;
  description: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [name, setName] = useState<string | null>("");
  const [history, setHistory] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number | null>(0);
  const [accountNum, setAccountNum] = useState<number | null>(null);
  const [income, setIncome] = useState<number | null>(0);
  const [spent, setSpent] = useState<number | null>(0);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const { auth, hasAccount, setHasAccount } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const apiAxios = useAxios();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth?.username) return;
    setLoading(true);
    fetchAccounts();
  }, [auth]);

  const fetchAccounts = async () => {
    try {
      if (!auth?.username) return;
      const response: AxiosResponse = await apiAxios.get(
        `/accounts/${auth.username}`,
        { withCredentials: true },
      );
      setName(response?.data?.name);
      setAccountNum(response?.data?.accNumber);
      setBalance(response?.data?.balance);
      setHistory(response?.data?.history || []);
      setIncome(response?.data?.income);
      setSpent(response?.data?.spent);
    } catch (error: any) {
      setHasAccount(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    try {
      await apiAxios.post("/accounts", JSON.stringify({ name: auth.username }));
      fetchAccounts();
    } catch (error: any) {
      alert(error?.response?.data?.error);
    }
  };

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status?.toLowerCase()) {
      case "completed":
        return { backgroundColor: "#dcfce7", color: "#166534", padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" };
      case "pending":
        return { backgroundColor: "#fef9c3", color: "#854d0e", padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" };
      case "failed":
        return { backgroundColor: "#fee2e2", color: "#991b1b", padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" };
      default:
        return { backgroundColor: "#f1f5f9", color: "#475569", padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" };
    }
  };

  const isCredit = (type: string) => type === "deposit" || type === "transfer-in";

  return (
    <>
      {loading && <Spinner />}

      {!hasAccount && !loading && (
        <Modal createAccount={createAccount} setName={setName} />
      )}

      {hasAccount && !loading && (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" }}>
          <SideNav open={open} setOpen={setOpen} />
          <TopBar name={name as string} setOpen={setOpen} open={open} />

          <main className="dashboard-main" style={{ paddingTop: "80px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 64px 24px" }}>

              {/* Page Header */}
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
                  Welcome back, <span style={{ color: "#2563eb" }}>{name}</span>
                </h1>
                <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>
                  Here's what's happening with your accounts today.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="dashboard-cards-grid">

                {/* Balance Card */}
                <div style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "24px",
                  padding: "40px",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(15,23,42,0.25)"
                }}>
                  <div style={{
                    position: "absolute", top: "-60px", right: "-60px",
                    width: "250px", height: "250px",
                    backgroundColor: "rgba(59,130,246,0.12)",
                    borderRadius: "50%", filter: "blur(50px)"
                  }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#94a3b8", margin: "0 0 10px 0" }}>
                      Available Balance
                    </p>
                    <h2 className="balance-card-amount" style={{ fontWeight: 800, color: "#ffffff", margin: "0 0 32px 0", letterSpacing: "-1px", lineHeight: 1 }}>
                      ₦{balance?.toLocaleString()}.00
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px" }}>
                      <div>
                        <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#475569", margin: "0 0 4px 0" }}>Acct No.</p>
                        <p style={{ fontFamily: "monospace", fontSize: "16px", color: "#e2e8f0", margin: 0, letterSpacing: "2px", wordBreak: "break-all" }}>
                          {String(accountNum).replace(/(.{5})/g, "$1 ").trim()}
                        </p>
                      </div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        backgroundColor: "rgba(16,185,129,0.15)", color: "#34d399",
                        padding: "6px 14px", borderRadius: "999px",
                        fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px"
                      }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#34d399", display: "inline-block" }} />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Overview Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 28px 0" }}>
                    Monthly Overview
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "14px",
                        backgroundColor: "#f0fdf4", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "22px", flexShrink: 0
                      }}>↑</div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Income</p>
                        <p style={{ fontSize: "22px", fontWeight: 800, color: "#16a34a", margin: 0 }}>+₦{income?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "14px",
                        backgroundColor: "#fff1f2", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "22px", flexShrink: 0
                      }}>↓</div>
                      <div>
                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Spent</p>
                        <p style={{ fontSize: "22px", fontWeight: 800, color: "#dc2626", margin: 0 }}>-₦{spent?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "10px", color: "#cbd5e1", margin: "28px 0 0 0", fontStyle: "italic" }}>Based on last 30 days</p>
                </div>
              </div>

              {/* Transactions Table */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    Recent Transactions
                  </h2>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    style={{ fontSize: "13px", fontWeight: 600, color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: "6px 12px" }}
                  >
                    {showHistory ? "Collapse" : "Expand All"}
                  </button>
                </div>

                {showHistory && (
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                  }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                          {["Transaction", "Amount", "Date", "Status"].map(h => (
                            <th key={h} style={{
                              padding: "16px 20px", fontSize: "11px", fontWeight: 700,
                              color: "#64748b", textTransform: "uppercase", letterSpacing: "1px",
                              textAlign: "left"
                            }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {history.length > 0 ? (
                          history.slice().reverse().map((tx, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "18px 20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                  <div style={{
                                    width: "40px", height: "40px", borderRadius: "12px",
                                    backgroundColor: isCredit(tx.type) ? "#f0fdf4" : "#fff1f2",
                                    color: isCredit(tx.type) ? "#16a34a" : "#dc2626",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "18px", fontWeight: 700, flexShrink: 0
                                  }}>
                                    {isCredit(tx.type) ? "↓" : "↑"}
                                  </div>
                                  <div>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{tx.description || "Transaction"}</p>
                                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "3px 0 0 0", textTransform: "capitalize" }}>
                                      {tx.type?.replace(/-/g, " ")}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: "18px 20px" }}>
                                <span style={{ fontSize: "15px", fontWeight: 800, color: isCredit(tx.type) ? "#16a34a" : "#dc2626" }}>
                                  {isCredit(tx.type) ? "+" : "-"}₦{tx.amount?.toLocaleString()}.00
                                </span>
                              </td>
                              <td style={{ padding: "18px 20px" }}>
                                <p style={{ fontSize: "13px", color: "#334155", margin: 0, fontWeight: 600 }}>
                                  {new Date(tx.date).toLocaleDateString()}
                                </p>
                                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0 0" }}>
                                  {new Date(tx.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </td>
                              <td style={{ padding: "18px 20px" }}>
                                <span style={getStatusStyle(tx.status)}>{tx.status || "completed"}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} style={{ padding: "60px 20px", textAlign: "center" }}>
                              <p style={{ fontSize: "16px", color: "#94a3b8", margin: 0 }}>No transactions yet.</p>
                              <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "8px 0 0 0" }}>Start by making a deposit.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;
