import SideNav from "../../components/SideNav";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthProvider";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/Spinner";
import TopBar from "../../components/TopBar";
import { toast, Toaster } from "sonner";

const Transfer = () => {
  const [name, setName] = useState<string | null>("");
  const [receiver, setReceiver] = useState<string>("");
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

    fetchAccounts();
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
      fetchAccounts();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleAction = async (fn: Function) => {
    try {
      await fn();
      fetchAccounts();
    } catch (err: any) {
      console.log(err);
    }
  };

  const transfer = async () => {
    if (receiver === "") return toast.error("Please insert receiver");
    if (receiver.toLowerCase() === name) return toast.error("Invalid");
    try {
      await apiAxios.post(
        "/transfer",
        JSON.stringify({ sender: name, amount: amount, receiver }),
      );
      toast.success("Transfer Successful");
      setAmount("");
      setReceiver("");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setAmount("");
      setReceiver("");
    }
  };

  return (
    <>
      {loading && <Spinner />}

      {!hasAccount && !loading && (
        <Modal createAccount={createAccount} setName={setName} />
      )}

      {hasAccount && !loading && (
        <div className="min-h-screen bg-[#f8fafc]">
          <Toaster position="top-right" richColors />
          <SideNav open={open} setOpen={setOpen} />
          <TopBar name={name as string} setOpen={setOpen} open={open} />

          <main className="pl-0 sm:pl-64 pt-20 transition-all duration-300">
            <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
              <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transfer Funds</h1>
                <p className="text-slate-500 mt-1">Inter-bank institutional capital transfer.</p>
              </header>

              <section className="grid grid-cols-1 gap-8">
                {/* Balance Card */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Available Liquidity</p>
                      <h2 className="text-4xl font-bold">₦{balance?.toLocaleString()}.00</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Source Account</p>
                      <p className="font-mono text-lg text-slate-200">
                        {String(accountNum).replace(/(.{5})/g, "$1 ").trim()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transfer Form */}
                <div className="premium-card p-8 sm:p-12">
                  <div className="max-w-md mx-auto space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Swift Transfer</h3>
                      <p className="text-slate-500 text-sm mt-1">Securely move assets between accounts.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Receiver Account Name</label>
                        <input
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="Target username"
                          type="text"
                          value={receiver}
                          onChange={(e) => setReceiver(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Capital Amount</label>
                        <div className="relative group">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₦</span>
                          <input
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="0.00"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <button
                        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                        onClick={() => handleAction(transfer)}
                      >
                        Authorize Transfer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                      All transfers are final and subject to inter-node verification protocols.
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

export default Transfer;
