import { Alert, Button, Grow, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { changePWD } from "../../Constants/APIsCalls";
import EnsAvatar from "../EnsAvatar";
import { Save } from "@mui/icons-material";

export default () => {
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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

  const handleChangePWD = async () => {
    setErrorMessage();

    if (!oldPassword) {
      handleErrors("Please enter old password...");
      return;
    }
    if (!password || !password2) {
      handleErrors("Please enter new password...");
      return;
    }
    if (password != password2) {
      handleErrors("passwords not matched...");
      return;
    }

    setWaiting(true);
    try {
      const tr = await changePWD(address, oldPassword, password);

      if (tr.data.error) {
        handleErrors(tr.data.error);
        console.log(tr);
        return;
      }

      console.log(tr);
      setSuccessMessage(tr.data.message);
      localStorage.setItem("pwd", password);

      setOldPassword("");
      setPassword("");
      setPassword2("");
      setWaiting(false);
    } catch (error) {
      handleErrors(error);
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
            <Input
              className="w-80 p-2"
              type="text"
              placeholder="Enter address..."
              value={address}
              disabled={true}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              className="w-80 p-2"
              type="password"
              placeholder="Enter old password..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              className="w-80 p-2"
              type="password"
              placeholder="Enter new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="w-80 p-2"
              type="password"
              placeholder="Re-enter new password..."
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <div className="flex justify-center">
              <Button
                className="mt-2 p-3 bg-slate-200 hover:bg-slate-400"
                onClick={handleChangePWD}
                disabled={waiting}
              >
                <Save />
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-2 m-2">
            <EnsAvatar address={address} size={150} />
          </div>
        </div>
      </div>
    </Grow>
  );
};
