import { createContext, useState, useEffect } from "react";
import { BACK_URI } from "../utils/constants";
import axios from "axios";

const api = axios.create({
  baseURL: BACK_URI,
  withCredentials: true
});

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function hydrateSession() {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    // Hydrate from session on mount
    hydrateSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}