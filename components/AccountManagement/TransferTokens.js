import { Alert, Button, Grow, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { transferAmount } from "../../Constants/APIsCalls";
import EnsAvatar from "../EnsAvatar";
import { MoveDown } from "@mui/icons-material";

export default () => {
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");

  const [waiting, setWaiting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");

    setAddress(AccountAddress);
  }, []);
  const handleErrors = (message) => {
    setErrorMessage(message);
    console.log(message);
  };

  const handleTransfer = async () => {
    setErrorMessage();

    if (!address) {
      handleErrors("Please enter which account will transfer form...");
      return;
    }
    if (!address2) {
      handleErrors("Please enter which account will transfer to...");
      return;
    }
    if (!password) {
      handleErrors("Please enter your password...");
      return;
    }
    if (!amount) {
      handleErrors("Please enter amount that you want to transfer...");
      return;
    }
    setWaiting(true);

    try {
      const tr = await transferAmount(address, address2, password, amount);

      if (tr.data.error) {
        handleErrors(tr.data.error);
        console.log(tr);
        return;
      }

      console.log(tr);
      setSuccessMessage(tr.data.message);
      setWaiting(false);
      setPassword("");
      setAmount("");
      setAddress2("");
      setAddress("");
    } catch (error) {
      handleErrors(error);
    } finally {
      setWaiting(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
      setSuccessMessage();
    }, 2000);
  }, [errorMessage, successMessage]);

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <div className="container h-screen">
        {errorMessage && (
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        )}

        <div className="flex flex-row items-center justify-center gap-2 p-2 m-2">
          <div className="flex flex-col p-2 m-2">
            <EnsAvatar address={address} size={150} />
          </div>
          <div className="flex flex-col p-2 m-2">
            <Input
              className="w-80 p-2 m-2"
              type="text"
              placeholder="From..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              className="w-80 p-2 m-2"
              type="text"
              placeholder="To..."
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />

            <Input
              className="w-80 p-2 m-2"
              type="password"
              placeholder="Your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="w-80 p-2 m-2"
              type="text"
              placeholder="Amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-center">
              <Button
                className="mt-2 p-3 bg-slate-200 hover:bg-slate-400"
                onClick={handleTransfer}
                disabled={waiting}
              >
                <MoveDown />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Grow>
  );
};
