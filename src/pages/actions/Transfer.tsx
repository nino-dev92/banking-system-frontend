import SideNav from "../../components/SideNav";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthProvider";
import useAxios from "../../hooks/useAxios";
import type { AxiosResponse } from "axios";
import Spinner from "../../components/Spinner";
import TopBar from "../../components/TopBar";

const Transfer = () => {
  const [name, setName] = useState<string | null>("");
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [balance, setBalance] = useState<number | null>(0);
  const [accountNum, setAccountNum] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [income, setIncome] = useState<number | null>(0);
  const [spent, setSpent] = useState<number | null>(0);
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

      const response: AxiosResponse = await apiAxios.get(
        `/accounts/${auth.username}`,
        {
          withCredentials: true,
        },
      );
      setLoading(false);
      setName(response?.data?.name);
      setAccountNum(response?.data?.accNumber);
      setBalance(response?.data?.balance);
      setIncome(response?.data?.income);
      setSpent(response?.data?.spent);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    try {
      await apiAxios.post("/accounts", JSON.stringify({ name: auth.username }));
      alert("Account Created");
    } catch (error: any) {
      alert(error?.response?.data?.error);
    }
  };

  const handleAction = async (fn: Function) => {
    try {
      await fn();
      fetchAccounts();
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.error);
    }
  };

  const transfer = async () => {
    if (receiver === "") return setMessage("Please insert receiver");
    if (receiver.toLowerCase() === name) return setMessage("Invalid");
    try {
      await apiAxios.post(
        "/transfer",
        JSON.stringify({ sender: name, amount: amount, receiver }),
      );
      setMessage("Transfer Successful");
      setAmount("");
      setReceiver("");
    } catch (error: any) {
      setMessage(error?.response?.data?.message);
      setAmount("");
      setReceiver("");
    }
  };

  return (
    <>
      {loading && <Spinner />}

      {!hasAccount && !loading && (
        <>
          <Modal createAccount={createAccount} setName={setName} />
        </>
      )}

      {hasAccount && !loading && (
        <div className="bg-background text-on-background min-h-screen">
          {/* Sidebar */}
          <SideNav open={open} setOpen={setOpen} />

          {/* Topbar */}
          <TopBar name={name as string} setOpen={setOpen} open={open} />

          {/* Main */}
          <main className="pl-5 pr-5 pt-24 sm:pl-65 pb-12 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8 flex-col justify-center">
              {/* Balance Section */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gradient-to-br from-[#00296f] to-[#001644] rounded-xl p-8 text-white flex flex-col justify-between min-h-[240px]">
                  <div>
                    <p className="text-sm opacity-70 mb-1">
                      Total Available Balance
                    </p>
                    <h1 className="text-5xl font-extrabold">
                      N{balance?.toLocaleString()}.00
                    </h1>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    <div>
                      <p className="text-xs uppercase opacity-70">
                        Account Number
                      </p>
                      <p className="font-mono text-lg">{accountNum}</p>
                    </div>
                  </div>
                </div>

                {/* Side Card */}
                <div className="bg-gray-100 rounded-xl p-6 space-y-6">
                  <h3 className="font-bold">Monthly Overview</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Income</span>
                      <span className="text-green-600 font-bold">
                        +N{income}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Spent</span>
                      <span className="text-red-500 font-bold">-N{spent}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Deposit*/}
              <div className="text-center text-green-500 bg-blue-200">
                {message && <h2>{message}</h2>}
              </div>
              <section className="space-y-6 flex-col items-center justify-center border-1 border-color-blue-400 p-5 rounded-xl">
                <h2 className="text-2xl font-bold text-center">Transfer</h2>
                <div className="bg-white p-4 max-w-100 flex-col m-auto">
                  <input
                    className="border p-2 rounded w-full mb-3"
                    placeholder="Receiver"
                    type="text"
                    value={receiver as string}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  <input
                    className="border p-2 rounded w-full mb-3"
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <div className="flex gap-4 justify-center">
                    <button
                      className="border p-2 rounded bg-green-500 text-white cursor-pointer hover:bg-green-400"
                      onClick={() => handleAction(transfer)}
                    >
                      Transfer
                    </button>
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
