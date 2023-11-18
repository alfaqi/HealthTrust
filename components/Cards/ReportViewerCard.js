import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grow,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createHTContract, downloadPdf } from "../../Constants/contractUtils";

export default () => {
  const [action, setAction] = useState("");
  const [address, setAddress] = useState("");
  const [reportsID, setReportsID] = useState([]);
  const [decodePD, setDecodePD] = useState("");
  const [decodeDDAddress, setDecodeDDAddress] = useState("");
  const [decodeDDRespond, setDecodeDDRespond] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const lineLength = 50;
  const downloadReport = () => {
    downloadPdf(
      decodePD[0],
      decodePD[1],
      decodeDDAddress,
      decodeDDRespond,
      lineLength
    );
  };

  const handleErrors = (error, message) => {
    setErrorMessage(message);
    console.log(error);
    console.log(message);
    if (!error) return;

    if (error.message.toLowerCase().includes("user rejected")) {
      setErrorMessage(
        "MetaMask Tx Signature: User denied transaction signature"
      );
    } else if (error.message.toLowerCase().includes("patient or doctor")) {
      setErrorMessage("Only Patient or Doctor can view this report!");
    } else {
      setErrorMessage("Error occurred while processing.");
    }
  };

  const getAllReports = async () => {
    try {
      const contract = await createHTContract();

      const allMembers = await contract.reportCount();
      let reportsID = new Array(allMembers);

      for (let i = 1; i <= allMembers; i++) {
        reportsID[i - 1] = await contract.medicalReports(i);
      }
      setReportsID(reportsID);
    } catch (error) {
      handleErrors(error);
    }
  };

  let doctorRespond;
  const getReport = async () => {
    setErrorMessage();
    setDecodePD("");
    try {
      const contract = await createHTContract();

      const report = await contract.medicalReports(Number(action));
      const msg1 = await contract.decodeMedical(
        Number(action),
        address,
        report[2]
      );
      if (report[3] != "0x") {
        doctorRespond = await contract.decodeMedical(
          Number(action),
          address,
          report[3]
        );
      }
      setDecodePD(msg1);
      setDecodeDDAddress(report[5]);
      setDecodeDDRespond(
        doctorRespond
          ? doctorRespond[2]
          : "The doctor didn't see yours, please be patient.."
      );
    } catch (error) {
      handleErrors(error);
    }
  };
  const handleChange = (event) => {
    setDecodePD();
    setAction(event.target.value);
  };
  useEffect(() => {
    getAllReports();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
    }, 2000);
  }, [errorMessage]);
  return (
    <div className="container w-[50vw]">
      {errorMessage && (
        <Alert
          className="p-2 m-2"
          onClose={() => setErrorMessage("")}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}

      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <div className="flex flex-col grid-cols-2 items-center">
          <div className="flex flex-row gap-2">
            <FormControl fullWidth className="w-72 p-2 mt-2">
              <InputLabel>Report ID</InputLabel>
              <Select
                // className="text-white"
                value={action}
                label="Report ID"
                onChange={handleChange}
              >
                {reportsID?.map((report) => {
                  return (
                    <MenuItem value={report.reportId}>
                      {report.reportId?.toString()}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Input
              className="w-80 p-2"
              type="text"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <Button
              disabled={!(action && address)}
              onClick={getReport}
              className="w-72 p-2 mt-4 font-bold text-black"
            >
              view report
            </Button>
          </div>
          {decodePD && (
            <>
              <div className="flex flex-row gap-2">
                <p className="p-2 mt-2">Doctor: </p>

                <Input
                  className="w-80 p-2 mt-2"
                  type="text"
                  disabled={true}
                  value={decodePD[1]}
                />
              </div>
              <div className="flex flex-row gap-2">
                <p className="p-2 mt-2">Patient: </p>

                <Input
                  className="w-80 p-2 mt-2"
                  type="text"
                  disabled={true}
                  value={decodeDDAddress}
                />
              </div>

              <TextField
                className="w-[50vw] p-2 mt-2"
                multiline
                disabled={true}
                value={decodePD[2]}
                rows={4}
              />
              <TextField
                className="w-[50vw] p-2 mt-2"
                multiline
                disabled={true}
                value={decodeDDRespond}
                rows={4}
              />
              {!doctorRespond && (
                <div>
                  <Button
                    className="text-slate-700 font-bold"
                    onClick={downloadReport}
                  >
                    Download Report
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Grow>
    </div>
  );
};
