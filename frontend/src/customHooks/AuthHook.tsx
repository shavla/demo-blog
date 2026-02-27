import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { isTokenValid, getUser, getToken } from '../utils/auth';
import { connectSocket, disconnectSocket } from "../utils/socketService";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const valid = isTokenValid();
      const storedUser = getUser();
      const storedToken = getToken();

       if (valid && storedUser) {
        setUser(storedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
        connectSocket(storedUser.id); // reconnect socket on page refresh
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    connectSocket(user.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    disconnectSocket();
    // navigate("/login"); // redirect without reload
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};