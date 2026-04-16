import type { SetStateAction } from "react";
import { useState } from "react";
import SideNav from "./SideNav";
import { useAuth } from "../context/AuthProvider";

type ModalProps = {
  createAccount: () => Promise<void>;
  setName: React.Dispatch<SetStateAction<string | null>>;
};

const Modal = ({ createAccount, setName }: ModalProps) => {
  const { auth, setHasAccount } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const runAction = async (
    FN: Function,
    action: React.Dispatch<SetStateAction<string | null>>,
  ) => {
    await FN();
    action(auth.username);
    setHasAccount(true);
  };

  return (
    <div className="place-items-center place-content-center">
      <SideNav open={open} setOpen={setOpen} />

      <div className="ml-0 sm:m-20 sm:ml-85 border flex-col justify-center p-4 rounded max-w-90">
        <h1 className="text-center text-2xl">Create Account</h1>
        <p className="m-10 text-center text-2xl">
          You dont have an account with us
        </p>
        <div className="flex justify-center">
          <button
            className="border p-2 bg-green-500 rounded cursor-pointer hover:bg-green-400 hover:text-white"
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
