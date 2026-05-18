import type { SetStateAction } from "react";
import { useState } from "react";
import SideNav from "./SideNav";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  createAccount: () => Promise<void>;
  setName: React.Dispatch<SetStateAction<string | null>>;
};

const Modal = ({ createAccount, setName }: ModalProps) => {
  const { auth, setHasAccount } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const runAction = async (
    FN: Function,
    action: React.Dispatch<SetStateAction<string | null>>,
  ) => {
    await FN();
    action(auth.username);
    setHasAccount(true);
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <SideNav open={open} setOpen={setOpen} />

      <div className="mx-4 sm:m-20 sm:ml-85 border flex flex-col justify-center items-center p-8 rounded max-w-md w-full bg-white text-black shadow-lg">
        <h1 className="text-center text-2xl font-bold">Create Account</h1>
        <p className="m-6 text-center text-xl">
          You dont have an account with us
        </p>
        <div className="flex justify-center">
          <button
            className="border p-2 px-4 bg-green-500 rounded cursor-pointer hover:bg-green-400 hover:text-white transition"
            onClick={() => runAction(createAccount, setName)}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
