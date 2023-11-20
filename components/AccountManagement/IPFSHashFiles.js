import { useEffect, useState } from "react";
import {
  createHTContract,
  createHTContractIPFS,
} from "../../Constants/contractUtils";
import Link from "next/link";
import { Alert, Grow, Paper } from "@mui/material";
import EnsAvatar from "../EnsAvatar";

export default () => {
  const [address, setAddress] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
  useEffect(() => {
    const handleGetAllMembers = async () => {
      try {
        const AccountAddress = localStorage.getItem("AccountAddress");
        setAddress(AccountAddress);

        const HTContract = await createHTContract();
        const reportCount = await HTContract.reportCount();

        const IPFSContract = await createHTContractIPFS();
        let allFilesArr = [];
        for (let i = 1; i <= reportCount; i++) {
          const allFiles = await IPFSContract.getIPFSHashes(AccountAddress, i);
          if (!allFiles) return;
          allFilesArr.push(allFiles);
        }
        setAllFiles(allFilesArr);
      } catch (error) {
        handleErrors(error);
      }
    };
    handleGetAllMembers();
  }, []);

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <div className="container h-screen">
        {errorMessage && (
          <Alert onClose={() => setErrorMessage("")} severity="error">
            {errorMessage}
          </Alert>
        )}
        <div className="flex flex-row items-center justify-center gap-2 p-2 m-2">
          <div className="flex flex-col p-2 m-2">
            <EnsAvatar address={address} size={100} />
          </div>
          <div className="flex flex-col p-2 m-2">
            <p>My Files</p>

            <Paper className="bg-transparent max-h-[50vh] overflow-auto">
              {allFiles.map((file, i) => {
                return (
                  <Link
                    key={i}
                    className="p-2 underline"
                    href={file.toString()}
                    target="_blank"
                  >
                    {file.toString()}
                  </Link>
                );
              })}
            </Paper>
          </div>
        </div>
      </div>
    </Grow>
  );
};
