import SideNav from "../../components/SideNav";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthProvider";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";
import TopBar from "../../components/TopBar";
import { toast, Toaster } from "sonner";

const Deposit = () => {
  const [name, setName] = useState<string | null>("");
  const [amount, setAmount] = useState<number | string>("");
  const [balance, setBalance] = useState<number | null>(0);
  const [accountNum, setAccountNum] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { auth, hasAccount } = useAuth();
  const apiAxios = useAxios();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!auth?.username) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    fetchAccounts();
    //setLoading(false);
    console.log(auth);
  }, [auth]);

  const fetchAccounts = async () => {
    try {
      if (!auth?.username) return;

      const response = await apiAxios.get(
        `/accounts/${auth.username}`,
        {
          withCredentials: true,
        },
      );
      setLoading(false);
      setName(response?.data?.name);
      setAccountNum(response?.data?.accNumber);
      setBalance(response?.data?.balance);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    try {
      await apiAxios.post("/accounts", JSON.stringify({ name: auth.username }));
      toast.success("Account Created");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleAction = async (fn: Function) => {
    try {
      await fn();
      fetchAccounts();
      setTimeout(() => {
        
      }, 3000);
    } catch (err: any) {
      toast.error(err.response?.data?.error);
    }
  };

  const deposit = async () => {
    try {
      if (amount == " " || amount == 0) return toast.error("Invalid amount");
      await apiAxios.post("/deposit", JSON.stringify({ name, amount }));
      toast.success("Deposit Successful");
      setAmount("");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      {loading && <Spinner />}

      {!hasAccount && !loading && (
        <>
          <Toaster position="top-right" richColors />
          <Modal createAccount={createAccount} setName={setName} />
        </>
      )}

      {hasAccount && !loading && (
        <div className="min-h-screen bg-[#f8fafc]">
          <Toaster position="top-right" richColors />
          <SideNav open={open} setOpen={setOpen} />
          <TopBar name={name as string} setOpen={setOpen} open={open} />

          <main className="pl-0 sm:pl-64 pt-20 transition-all duration-300">
            <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
              <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Deposit Funds</h1>
                <p className="text-slate-500 mt-1">Add capital to your institutional account securely.</p>
              </header>

              <section className="grid grid-cols-1 gap-8">
                {/* Balance Card - Refined for actions page */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Current Balance</p>
                      <h2 className="text-4xl font-bold">₦{balance?.toLocaleString()}.00</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Account</p>
                      <p className="font-mono text-lg text-slate-200">
                        {String(accountNum).replace(/(.{5})/g, "$1 ").trim()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deposit Form */}
                <div className="premium-card p-8 sm:p-12">
                  <div className="max-w-md mx-auto space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Enter Deposit Amount</h3>
                      <p className="text-slate-500 text-sm mt-1">Funds will be credited immediately.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₦</span>
                        <input
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 text-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                          placeholder="0.00"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[1000, 5000, 10000].map((val) => (
                          <button
                            key={val}
                            onClick={() => setAmount(val)}
                            className="py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                          >
                            +₦{val.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                        onClick={() => handleAction(deposit)}
                      >
                        Confirm Deposit
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                      Secure transaction authorized by CPR Institutional Protocols.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Deposit;
