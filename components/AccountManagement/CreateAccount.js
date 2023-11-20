import { Alert, Button, Grow, Input } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createNewAccount } from "../../Constants/APIsCalls";
import { ContractContext } from "../../Constants/ContractContext";
import { useRouter } from "next/router";
import SkeletonImageModal from "../Modals/SkeletonImageModal";
import EnsAvatar from "../EnsAvatar";

export default () => {
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [waiting, setWaiting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleErrors = (message) => {
    setErrorMessage(message);
    console.log(message);
  };
  const { setAddressGlobal, setPasswordGlobal } = useContext(ContractContext);
  const handleCreateAccount = async () => {
    setErrorMessage("");

    if (!password || !password2) {
      handleErrors("Please enter password...");
      return;
    }
    if (password != password2) {
      handleErrors("passwords not matched...");
      return;
    }

    try {
      setWaiting(true);
      const tr = await createNewAccount(password);

      if (tr.data.error) {
        handleErrors(tr.data.error);
        return;
      }
      if (tr.data.address) {
        setAddress(tr.data.address);
      }

      setAddressGlobal(tr.data.address);
      setPasswordGlobal(password);

      localStorage.setItem("AccountAddress", tr.data.address);
      localStorage.setItem("pwd", password);

      setSuccessMessage("Successful!");
      setWaiting(false);

      setTimeout(() => {
        router.push("/Register");
      }, 5000);
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

        <div className="flex flex-col justify-center items-center gap-2 m-2">
          <div className="flex flex-col p-2 m-2">
            {address ? (
              <EnsAvatar address={address} size={100} />
            ) : (
              <SkeletonImageModal width={100} height={100} />
            )}
          </div>
          {address && (
            <Input
              className="w-80 p-2"
              type="text"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}

          <Input
            className="w-80 p-2"
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            className="w-80 p-2"
            type="password"
            placeholder="re-enter password..."
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            className="w-80 p-2 mt-2"
            disabled={waiting}
            onClick={handleCreateAccount}
          >
            <p className="font-bold text-black">Create new Address</p>
          </Button>
        </div>
      </div>
    </Grow>
  );
};
