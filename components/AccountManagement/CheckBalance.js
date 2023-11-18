import { Alert, Button, Grow, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { getBalance } from "../../Constants/APIsCalls";
import EnsAvatar from "../EnsAvatar";
import { AccountBalanceWallet } from "@mui/icons-material";

export default () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");

    setAddress(AccountAddress);
  }, []);
  const handleErrors = (error, message) => {
    setErrorMessage(message);
    console.log(message);
  };

  const handleBalance = async () => {
    setErrorMessage();
    setBalance();
    if (!address) {
      handleErrors("", "Please enter your account address...");
      return;
    }
    setWaiting(true);
    try {
      const tr = await getBalance(address);

      if (tr.data.error) {
        handleErrors("", tr.data.error);
        console.log(tr);
        return;
      }
      console.log(tr);
      console.log(tr.data.balance);
      setBalance(tr.data.balance);
      setWaiting(false);
    } catch (error) {
      handleErrors(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
    }, 2000);
  }, [errorMessage]);

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <div className="container  h-screen">
        {errorMessage && (
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        )}
        <div className="flex flex-row items-center justify-center gap-2 p-2 m-2">
          <div className="flex flex-col p-2 m-2">
            <EnsAvatar address={address} size={100} />
          </div>
          <div className="flex flex-col p-2 m-2">
            <Input
              className="w-80 p-2 m-2"
              type="text"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex justify-center">
              <Button
                className="mt-2 p-3 bg-slate-200 hover:bg-slate-400"
                onClick={handleBalance}
                disabled={waiting}
              >
                <AccountBalanceWallet />
              </Button>
            </div>
            <p className="text-base p-2 m-2">
              Your balance is:{" "}
              <b className="font-semibold">
                {balance ? balance + " Tọ̀rọ̀" : ""}
              </b>
            </p>
          </div>
        </div>
      </div>
    </Grow>
  );
};
