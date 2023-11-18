import { createContext, useState } from "react";

export const ContractContext = createContext();
export const ContractContextProvider = ({ children }) => {
  const [addressGlobal, setAddressGlobal] = useState("");
  const [passwordGlobal, setPasswordGlobal] = useState("");

  return (
    <ContractContext.Provider
      value={{
        addressGlobal,
        passwordGlobal,
        setAddressGlobal,
        setPasswordGlobal,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
