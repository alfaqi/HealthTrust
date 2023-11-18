import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  WalletForContract,
  WalletForContractPWD,
  createHTContract,
} from "../../Constants/contractUtils";
import { transferAmount } from "../../Constants/APIsCalls";
import { Search } from "@mui/icons-material";

export default () => {
  const [address, setAddress] = useState();
  const [summary, setSummary] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientCondition, setPatientCondition] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [reportsIDs, setReportsIDs] = useState([]);
  const [reportID, setReportID] = useState(0);
  const [pervSummary, setPervSummary] = useState("");
  const [hasSummary, setHasSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [takenFunds, setTakenFunds] = useState(true);

  const [newRequest, setNewRequest] = useState([]);

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
    } else if (
      error.message.toLowerCase().includes("only patient or doctor can")
    ) {
      setErrorMessage("Only the doctor in question can view!");
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const handleConfirm = async () => {
    setErrorMessage();
    if (!reportID) {
      handleErrors("", "Please select one of the report request");
      return;
    }
    if (!summary) {
      handleErrors("", "Plaese enter summary");
      return;
    }

    try {
      const contract = await createHTContract();

      setIsLoading(true);
      const member = await contract.submitMedicalReport(
        reportID,
        summary,
        patientAddress,
        address
      );

      await member.wait();
      setIsLoading(false);
      setSuccessMessage("Successfully done!");
      getPatientCondition();
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleWithdraw = async () => {
    setErrorMessage();
    try {
      const contract = await createHTContract();

      const report = await contract.medicalReports(Number(reportID));
      if (report[6] == 0 && report[7] && report[8]) {
        alert("You already took your funds");
        return;
      }
      setIsLoading(true);
      const tx = await contract.withdraw(reportID, address);
      await transferAmount(
        WalletForContract,
        address,
        WalletForContractPWD,
        report[6].toString()
      );
      await tx.wait();
      setSuccessMessage("Successfully done!");
      setIsLoading(false);
      // getAllReports();
      getPatientCondition();
    } catch (error) {
      handleErrors(error);
    }
  };

  const getPatientsReports = async () => {
    setErrorMessage();
    setPatientAddress("");
    setAmountPaid("");
    setPatientCondition("");
    setSummary("");
    setReportID();
    setPervSummary("");
    try {
      const contract = await createHTContract();
      const doc = await contract.doctors(address);
      if (doc[0] == "0x0000000000000000000000000000000000000000") {
        handleErrors("", "Only doctor can add medical report");
        return;
      }
      const allMembers = await contract.reportCount();

      let reportsIDs = [];
      let newRequestID = [];
      for (let i = 1; i <= allMembers; i++) {
        const report = await contract.medicalReports(i);
        if (report[4]?.toLowerCase() == address?.toLocaleLowerCase()) {
          if (report[3] == "0x") {
            newRequestID.push(report[0].toString());
          }
        }
        reportsIDs.push(report[0].toString());
      }
      setReportsIDs(reportsIDs);
      setNewRequest(newRequestID);
    } catch (error) {
      handleErrors(error);
    }
  };

  const getPatientCondition = async () => {
    setErrorMessage();
    setPatientCondition();

    try {
      const contract = await createHTContract();
      const report = await contract.medicalReports(Number(reportID));

      const doc = await contract.doctors(address);

      if (doc[0].toLowerCase() != address.toLowerCase()) {
        setTakenFunds(true);
        return;
      }
      const reportDecoded = await contract.decodeMedical(
        Number(reportID),
        address,
        report[2]
      );

      if (report[3] == "0x") {
        setHasSummary(false);
      } else {
        setHasSummary(true);

        const reportDecoded = await contract.decodeMedical(
          Number(reportID),
          address,
          report[3]
        );
        setPervSummary(reportDecoded[2]);
      }

      if (report[6] == 0 && report[7] && report[8]) {
        setTakenFunds(true);
      } else {
        setTakenFunds(false);
      }
      setPatientCondition(reportDecoded[2]);
      setPatientAddress(report[5]);
      setAmountPaid(report[6]);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleChange = (event) => {
    setReportID(event.target.value);
    setSummary("");
    setPatientCondition("");
    setPervSummary("");
    setPatientAddress("");
    setAmountPaid("");
    setHasSummary(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
      setSuccessMessage();
    }, 2000);
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);
  }, []);
  return (
    <div className="container h-full">
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
          {newRequest.length > 0 && (
            <p>You have {newRequest.length} new report request...</p>
          )}
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-row">
              <Input
                className="w-80 p-2"
                type="text"
                placeholder="Enter your address..."
                value={address}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={!address}
                      className="font-bold text-black"
                      onClick={getPatientsReports}
                      edge={"end"}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-row">
              <FormControl fullWidth className="w-52 p-2 mt-2">
                <InputLabel>Report ID</InputLabel>
                <Select
                  value={reportID}
                  label="Report ID"
                  onChange={handleChange}
                >
                  {reportsIDs?.map((report, i) => {
                    return (
                      <MenuItem key={i} value={report}>
                        {report.toString()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth className="w-52 p-2 mt-2">
                <InputLabel>New Report Request</InputLabel>
                <Select
                  value={reportID}
                  label="New Report Request"
                  onChange={handleChange}
                >
                  {newRequest?.map((report, i) => {
                    return (
                      <MenuItem key={i} value={report}>
                        {report.toString()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                disabled={!reportID}
                className="w-52 p-2 mt-2 button font-bold text-black"
                onClick={getPatientCondition}
              >
                Get Patient report
              </Button>
            </div>
          </div>
          {patientAddress && amountPaid && (
            <div className="flex gap-2 m-2">
              <p>Patient Address: {patientAddress}</p>
              <p>Amount Paid: {amountPaid.toString()} Tọ̀rọ̀</p>
            </div>
          )}
          <TextField
            className="w-[50vw] p-2 mt-2"
            multiline
            disabled={true}
            placeholder="Patient Condition..."
            value={patientCondition}
            rows={4}
          />
          {hasSummary ? (
            <>
              <TextField
                className="w-[50vw] p-2 mt-2"
                multiline
                value={pervSummary}
                disabled={true}
                rows={4}
              />

              {!takenFunds && (
                <Button
                  disabled={isLoading}
                  className="w-72 p-2 mt-2 button font-bold text-black"
                  onClick={handleWithdraw}
                >
                  Withdraw funds
                </Button>
              )}
            </>
          ) : (
            <>
              <TextField
                className="w-[50vw] p-2 mt-2"
                multiline
                placeholder="Write the summary..."
                value={summary}
                rows={4}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Button
                disabled={!summary}
                onClick={handleConfirm}
                className="w-72 p-2 mt-2 font-bold text-black button"
              >
                {isLoading ? (
                  "Wait..."
                ) : (
                  <p className="font-bold text-black">Confirm</p>
                )}
              </Button>
            </>
          )}
        </div>
      </Grow>
    </div>
  );
};
