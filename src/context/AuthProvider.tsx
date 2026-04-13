import {
  useState,
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type AuthType = {
  auth: any;
  //user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<any>>;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  // setUser: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<any>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
