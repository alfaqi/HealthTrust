import { Alert, Button, Grow, Input, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ContractContext } from "../../Constants/ContractContext";
import { verifyKey } from "../../Constants/APIsCalls";
import { useRouter } from "next/router";
import EnsAvatar from "../EnsAvatar";
import SkeletonImageModal from "../Modals/SkeletonImageModal";
import { Login } from "@mui/icons-material";

export default () => {
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [waiting, setWaiting] = useState(false);

  const router = useRouter();

  const handleErrors = (message) => {
    setErrorMessage(message);
    console.log(message);
  };
  const { setAddressGlobal, setPasswordGlobal } = useContext(ContractContext);
  const handleLogin = async () => {
    setErrorMessage("");

    if (!address) {
      handleErrors("Please enter your address...");
      return;
    }
    if (!password) {
      handleErrors("Please enter password...");
      return;
    }
    setWaiting(true);

    try {
      const tr = await verifyKey(address, password);

      if (tr.data.error == "no keystore record found") {
        handleErrors(
          "This account not registered to our system, please create new account."
        );
        console.log(tr);
        return;
      }
      if (tr.data.error) {
        handleErrors(tr.data.error);
        console.log(tr);
        return;
      }

      setAddressGlobal(address);
      setPasswordGlobal(password);

      localStorage.setItem("AccountAddress", address);
      localStorage.setItem("pwd", password);

      setSuccessMessage("Successful!");
      setWaiting(false);
      setTimeout(() => {
        router.push("/Account/Check");
      }, 1000);
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
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col p-2 m-2">
            {address ? (
              <EnsAvatar address={address} size={100} />
            ) : (
              <SkeletonImageModal width={100} height={100} />
            )}
          </div>
          <Input
            className="w-80 p-2"
            type="text"
            placeholder="Enter your address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Input
            className="w-80 p-2"
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="mt-2 p-3 bg-slate-200 hover:bg-slate-400"
            onClick={handleLogin}
            disabled={waiting}
          >
            <Login />
          </Button>
        </div>
      </div>
    </Grow>
  );
};
