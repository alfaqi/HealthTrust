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
  Tooltip,
} from "@mui/material";
import { createHTContract, downloadPdf } from "../../Constants/contractUtils";
import { CloudDownload, Search } from "@mui/icons-material";
import UploadFileToIPFSModal from "../Modals/UploadFileToIPFSModal";

export default () => {
  const [action, setAction] = useState("");
  const [address, setAddress] = useState("");
  const [reportsID, setReportsID] = useState([]);
  const [decodePD, setDecodePD] = useState("");
  const [decodeDDAddress, setDecodeDDAddress] = useState("");
  const [decodeDDRespond, setDecodeDDRespond] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const downloadReport = () => {
    downloadPdf(decodePD[0], decodePD[1], decodeDDAddress, decodeDDRespond);
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

  const getReportByPatientAddress = async () => {
    setErrorMessage();
    setDecodePD("");
    setAction();
    try {
      const contract = await createHTContract();
      const reportCount = await contract.reportCount();
      let patientMRs = new Array(reportCount);

      for (let i = 1; i <= reportCount; i++) {
        const patientMR = await contract.medicalReports(i);
        if (patientMR[5].toLowerCase() == address.toLowerCase()) {
          patientMRs[i - 1] = await contract.medicalReports(i);
        }
      }
      setReportsID(patientMRs);
      if (!patientMRs[0].reportId)
        handleErrors("", "There is no medical report for this patient.");
    } catch (error) {
      handleErrors(error);
    }
  };

  let doctorRespond;
  const getReportByID = async (ID) => {
    if (!ID) return;
    setErrorMessage();
    setDecodePD("");
    try {
      const contract = await createHTContract();
      const report = await contract.medicalReports(ID);
      const msg1 = await contract.decodeMedical(ID, address, report[2]);
      if (report[3] != "0x") {
        doctorRespond = await contract.decodeMedical(ID, address, report[3]);
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
    getReportByID(event.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
    }, 2000);
  }, [errorMessage]);

  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);
  }, []);

  return (
    <div className="container w-[50vw] h-screen">
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
            <FormControl fullWidth className="w-72 p-2 m-2">
              <InputLabel>Report ID</InputLabel>
              <Select value={action} label="Report ID" onChange={handleChange}>
                {reportsID?.map((report, i) => {
                  return (
                    <MenuItem key={i} value={report.reportId}>
                      {report.reportId?.toString()}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Input
              className="w-80 p-2 m-2"
              type="text"
              placeholder="Patient address..."
              value={address}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={!address}
                    className="font-bold text-black"
                    onClick={getReportByPatientAddress}
                    edge={"end"}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setAddress(e.target.value)}
            />
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
                  <Tooltip title="Download Report">
                    <button
                      className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                      onClick={downloadReport}
                    >
                      <CloudDownload color="info" />
                    </button>
                  </Tooltip>
                  <UploadFileToIPFSModal
                    address={decodeDDAddress}
                    recordId={decodePD[0]}
                    uploadFile={downloadPdf(
                      decodePD[0],
                      decodePD[1],
                      decodeDDAddress,
                      decodeDDRespond,
                      true
                    )}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Grow>
    </div>
  );
};
