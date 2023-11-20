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
import { Save } from "@mui/icons-material";

export default () => {
  const [action, setAction] = useState("add");

  const [address, setAddress] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [timeAvailablity, setTimeAvailablity] = useState("");
  const [perSession, setPerSession] = useState("");
  const [rating, setRating] = useState("");

  const [allMembers, setAllMembers] = useState([]);
  const [showAllMembers, setShowAllMembers] = useState(false);

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
    if (!perSession) {
      handleErrors("", "Price Per Session");
      return;
    }

    try {
      const contract = await createHTContract();
      let member;

      setIsLoading(true);

      if (action == "add") {
        member = await contract.addDoctor(
          address,
          specialty,
          perSession,
          timeAvailablity,
          rating
        );
      } else if (action == "remove") {
        member = await contract.removeDoctor(address);
      }

      await member.wait();
      setSuccessMessage("Successfully done!");
      setIsLoading(false);
      setAddress("");
      setTimeAvailablity("");
      setRating("");
      setPerSession("");
      setSpecialty("");
      setShowAllMembers(false);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllMembers = async () => {
    try {
      const contract = await createHTContract();

      const allMembers = await contract.getAllDoctors();
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
            placeholder="Doctor address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {action == "add" && (
            <div className="flex flex-row gap-2">
              <div>
                <Input
                  className="w-80 p-2 mt-4"
                  type="text"
                  placeholder="Doctor's specialty..."
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
                <Input
                  className="w-80 p-2 mt-4"
                  type="text"
                  placeholder="Doctor's rate..."
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div>
                <Input
                  className="w-80 p-2 mt-4"
                  type="text"
                  placeholder="Doctor's price per session..."
                  value={perSession}
                  onChange={(e) => setPerSession(e.target.value)}
                />
                <Input
                  className="w-80 p-2 mt-4"
                  type="text"
                  placeholder="Doctor's time availablity..."
                  value={timeAvailablity}
                  onChange={(e) => setTimeAvailablity(e.target.value)}
                />
              </div>
            </div>
          )}
          <FormControl fullWidth className="w-72 p-2 mt-4">
            <InputLabel>Add / Remove Doctor</InputLabel>
            <Select
              value={action}
              label="Add / Remove Doctor"
              onChange={handleChange}
            >
              <MenuItem value={"add"}>Add</MenuItem>
              <MenuItem value={"remove"}>Remove</MenuItem>
            </Select>
          </FormControl>
          <button
            className="mt-2 p-3 bg-slate-200 hover:bg-slate-400 rounded"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            <Save color="info" />
          </button>
          <Button
            onClick={handleGetAllMembers}
            className="w-72 p-2 mt-2 button "
          >
            <p className="text-slate-700">All Doctors</p>
          </Button>
          {showAllMembers && (
            <Paper className="bg-transparent max-h-[50vh] overflow-auto">
              {allMembers.map((member, i) => {
                return (
                  <p key={i} className="font-bold p-2">
                    {"Doctor " + (i + 1) + ": " + member}
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
