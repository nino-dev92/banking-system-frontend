import type { SetStateAction } from "react";
import SideNav from "./SideNav";
import { useAuth } from "../context/AuthProvider";

// type ModalProps = {
//   createAccount: () => Promise<void>;
//   setName: React.Dispatch<SetStateAction<string | null>>;
// };

const Mode = () => {
  const { auth } = useAuth();

  const runAction = async (
    FN: Function,
    action: React.Dispatch<SetStateAction<string | null>>,
  ) => {
    await FN();
    action(auth.username);
  };

  return (
    <>
      <SideNav />

      <div className="m-20 border flex-col justify-center p-4 rounded min-w-100 ml-85">
        <h1 className="text-center text-2xl">Create Account</h1>
        <p className="m-10 text-center text-2xl">
          You dont have an account with us
        </p>
        <div className="flex justify-center">
          <button className="border p-2 bg-green-500 rounded cursor-pointer hover:bg-green-400 hover:text-white">
            Create Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Mode;
