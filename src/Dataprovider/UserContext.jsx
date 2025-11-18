import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const UserToken = createContext();

export const TokenProvider = ({ children }) => {
  const { data, isError, error } = useQuery({
    queryKey: ["userlogin"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://softechbackend-2.onrender.com/admin/check", {
          withCredentials: true,
        });
        return res.data; // Return the data directly
      } catch (err) {
        console.error("Token check error:", err);
        throw err; // Let React Query handle the error
      }
    },
    retry: false, // Disable retries to avoid spamming the backend
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  console.log("Token data:", data, "Error:", isError ? error : null);

  return (
    <UserToken.Provider value={{ data, axios }}>
      {children}
    </UserToken.Provider>
  );
};
