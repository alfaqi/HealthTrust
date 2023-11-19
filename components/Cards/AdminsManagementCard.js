import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grow,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { createHTContract } from "../../Constants/contractUtils";

export default () => {
  const [action, setAction] = useState("add");

  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleErrors = (error, message) => {
    setErrorMessage(message);

    console.log(error);
    console.log(message);
    if (!error) return;

    if (error.message.toLowerCase().includes("user rejected")) {
      setErrorMessage(
        "MetaMask Tx Signature: User denied transaction signature"
      );
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const handleConfirm = async () => {
    if (!address) {
      handleErrors("", "Please enter the address");
      return;
    }

    try {
      const contract = await createHTContract();
      let member;

      setIsLoading(true);

      if (action == "add") {
        member = await contract.addAdmin(address);
      } else if (action == "remove") {
        member = await contract.removeAdmin(address);
      }

      await member.wait();
      setIsLoading(false);
      setSuccessMessage("Successfully done!");
      setAddress("");
      setShowAllMembers(false);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [allMembers, setAllMembers] = useState([]);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const handleGetAllMembers = async () => {
    try {
      const contract = await createHTContract();

      const allMembers = await contract.getAllAdmins();
      console.log(allMembers);
      if (!allMembers) return;
      setAllMembers(allMembers);
      setShowAllMembers(!showAllMembers);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.value == "add") setAction("add");
    else setAction("remove");
    console.log(action);
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
      setSuccessMessage();
    }, 2000);
  }, [errorMessage, successMessage]);
  return (
    <div className="container h-screen">
      {errorMessage && (
        <Alert
          className="p-2 m-2"
          onClose={() => setErrorMessage("")}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert
          className="p-2 m-2"
          onClose={() => setSuccessMessage("")}
          severity="success"
        >
          {successMessage}
        </Alert>
      )}
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <div className="flex flex-col grid-cols-2 items-center">
          <Input
            className="w-80 p-2 mt-4"
            type="text"
            placeholder="Enter the admin address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl fullWidth className="w-72 p-2 mt-4">
            <InputLabel>Add / Remove Admin</InputLabel>
            <Select
              value={action}
              label="Add / Remove Admin"
              onChange={handleChange}
            >
              <MenuItem value={"add"}>Add</MenuItem>
              <MenuItem value={"remove"}>Remove</MenuItem>
            </Select>
          </FormControl>
          <Button
            disabled={isLoading}
            onClick={handleConfirm}
            className="w-72 p-2 mt-4 button "
          >
            <div>
              {isLoading ? (
                "Wait..."
              ) : (
                <p className="font-bold text-black">Confirm</p>
              )}
            </div>
          </Button>
          <Button
            onClick={handleGetAllMembers}
            className="w-72 p-2 mt-2 button "
          >
            <p className="text-slate-700">All Admins</p>
          </Button>
          {showAllMembers && (
            <Paper className="bg-transparent max-h-[50vh] overflow-auto">
              {allMembers.map((member, i) => {
                return (
                  <p key={i} className="font-bold p-2">
                    {"Admin " + (i + 1) + ": " + member}
                  </p>
                );
              })}
            </Paper>
          )}
        </div>
      </Grow>
    </div>
  );
};
