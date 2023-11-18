import { Alert, Button, Checkbox, Grow, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  WalletForContract,
  createHTContract,
} from "../../Constants/contractUtils";
import { getBalance, transferAmount } from "../../Constants/APIsCalls";

export default () => {
  const router = useRouter();
  const [patientAddress, setPatientAddress] = useState("");
  const [password, setPassword] = useState("");
  const [feeling, setFeeling] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [agree, setAgree] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    const pwd = localStorage.getItem("pwd");

    setPatientAddress(AccountAddress);
    setPassword(pwd);
  }, []);

  const handleErrors = (error, message) => {
    setErrorMessage(message);
    console.log(error);
    console.log(message);
    if (!error) return;

    if (error.message.toLowerCase().includes("user rejected")) {
      setErrorMessage(
        "MetaMask Tx Signature: User denied transaction signature"
      );
    } else if (
      error.message
        .toLowerCase()
        .includes("only doctors can perform this action")
    ) {
      setErrorMessage("Only doctors can perform this action!");
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const handleRegister = async () => {
    setErrorMessage();
    if (!feeling) {
      handleErrors("", "Please tell us what do you feel...");
      return;
    }

    if (!dateOfBirth) {
      handleErrors("", "Please ehter your birthdate...");
      return;
    }

    if (!agree) {
      handleErrors("", "you must agree for paying to doctor");
      return;
    }

    const balance = await getBalance(patientAddress);

    if (balance.data.balance < doctor[2].toString()) {
      handleErrors(
        "",
        "You don't have sufficient funds to proceed with this action."
      );
      return;
    }

    const contract = await createHTContract();
    try {
      // const doctor = await contract.doctors(doctor[0]);

      const tr = await transferAmount(
        patientAddress,
        WalletForContract,
        password,
        doctor[2].toString()
      );

      if (tr.data.error) {
        handleErrors("", tr.data.error);
        console.log(tr);
        return;
      }

      const tx = await contract.requestMedicalReport(
        patientAddress,
        doctor[0],
        new Date(dateOfBirth) / 1000,
        feeling,
        doctor[2]
      );
      await tx.wait();
      setSuccessMessage("Medical report requested successfully!");
      setFeeling("");
      setAgree(false);
    } catch (error) {
      handleErrors(error);
    }
  };

  const checkAccount = async (AccountAddress) => {
    try {
      const contract = await createHTContract();
      const doc = await contract.doctors(AccountAddress);
      if (doc[0] == "0x0000000000000000000000000000000000000000") {
        alert(
          "Sorry, no doctor was found with this address. Please ensure it's correct and try again."
        );
        router.push("/Register");
        return;
      }
      setDoctor(doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const { id } = router.query;
    checkAccount(id);
  }, [router.query.id]);

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
        {isLoading ? (
          <div className="flex flex-col">
            <div className="flex justify-center p-2 m-2">
              <h4>Loading...</h4>
            </div>
          </div>
        ) : (
          <div className="p-2 m-2">
            <h4 className="p-2 m-2 items-center font-bold">
              Registeration Form
            </h4>
            <p className="p-2 m-2 text-lg">
              Doctor: <b className="underline">{doctor[0]}</b>
            </p>
            <p className="p-2 m-2">Specialization: {doctor[1]}</p>

            <TextField
              className="w-[50vw] p-2 m-2"
              multiline
              placeholder="What do you feel?..."
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              rows={4}
            />
            <div className="p-2 flex flex-row">
              <div>
                <label className="p-2 m-2 text-base">Birthdate: </label>
                <input
                  className="p-2 m-2 bg-transparent"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <Checkbox
                value={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <p className="py-1">
                You agree to pay <b>{doctor[2]?.toString()} Tọ̀rọ̀</b> to the
                doctor.
              </p>
            </div>
            <div>
              <Button
                className="w-52 m-2 p-3 bg-slate-200 hover:bg-slate-400"
                onClick={handleRegister}
              >
                <p className="font-bold text-black">Register</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Grow>
  );
};
