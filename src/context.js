import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: {
    firstname: "",
    lastname: "",
  },
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setUser({
        firstname: "Agil",
        lastname: "Atakishiyev",
      });
    }, 3000);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
