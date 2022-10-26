import React, { PropsWithChildren, useState } from "react";
import Appwrite from "./service";

//type for the context
type AppwriteContextType = {
  appwrite: Appwrite;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

//create the context
const AppwriteContext = React.createContext<AppwriteContextType>({
  appwrite: new Appwrite(),
  loggedIn: false,
  setLoggedIn: () => {},
});

const AppwriteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AppwriteContext.Provider
      value={{ appwrite: new Appwrite(), loggedIn, setLoggedIn }}
    >
      {children}
    </AppwriteContext.Provider>
  );
};
export { AppwriteProvider, AppwriteContext };
