import {
  AddCircle,
  GetApp,
  OpenInNew,
  RemoveCircle,
  WifiProtectedSetup,
} from "@mui/icons-material";
import { Alert, Button, Grow, Tooltip } from "@mui/material";
import { createHTLivestreamContract } from "../../Constants/contractUtils";
import { useCreateStream } from "@livepeer/react";
import { useEffect, useState } from "react";

export default () => {
  const [address, setAddress] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [live, setLive] = useState();

  const [isLoading, setIsLoading] = useState(false);

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

  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(
    address
      ? {
          name: address,
        }
      : null
  );

  const handleAddLive = async () => {
    try {
      const contract = await createHTLivestreamContract();
      setIsLoading(true);
      const tx = await contract.addLive(
        address,
        stream.streamKey,
        stream.playbackId
      );
      await tx.wait();
      setSuccessMessage("Successfully done!");
      setIsLoading(false);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteLive = async () => {
    try {
      const contract = await createHTLivestreamContract();
      setIsLoading(true);
      const tx = await contract.addLive(address, "", "");
      await tx.wait();
      setSuccessMessage("Successfully done!");
      setIsLoading(false);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handelGetLive = async () => {
    try {
      const contract = await createHTLivestreamContract();
      setIsLoading(true);
      const live = await contract.getLive(address);
      if (!(live.streamID === "")) {
        setLive(live);
      }
      setIsLoading(false);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handelGotoLive = async () => {
    window.open(`/Live/Live?id=${address}`, "_blank");
  };
  useEffect(() => {
    const AccountAddress = localStorage.getItem("AccountAddress");
    setAddress(AccountAddress);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
      setSuccessMessage();
    }, 2000);
  }, [errorMessage, successMessage]);

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <div className="h-screen">
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <p>First: Generate New Livestream</p>
            <Tooltip title="Generate new livestream">
              <button
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                onClick={createStream}
                disabled={isLoading}
              >
                <WifiProtectedSetup color="info" />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center">
            <p>Second: Save the Livestream</p>
            <Tooltip title="Save new livestream keys">
              <button
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                onClick={handleAddLive}
                disabled={isLoading}
              >
                <AddCircle color="info" />
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-col items-center">
            <p>Get the Keys</p>
            <Tooltip title="Get livestream keys">
              <button
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                onClick={handelGetLive}
                disabled={isLoading}
              >
                <GetApp color="info" />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center">
            <p>Goto Live with patients</p>
            <Tooltip title="Goto Livestream">
              <button
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                onClick={handelGotoLive}
                disabled={isLoading}
              >
                <OpenInNew color="info" />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center">
            <p>Delete Livestream</p>
            <Tooltip title="Delete livestream">
              <button
                className="m-1 p-3 bg-slate-200 hover:bg-slate-400 rounded"
                onClick={handleDeleteLive}
                disabled={isLoading}
              >
                <RemoveCircle color="error" />
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          {live && (
            <>
              <p>{"https://lvpr.tv/broadcast/" + live.streamID}</p>
              <p>{"https://livepeercdn.studio/hls/" + live.playbackID}</p>
            </>
          )}
        </div>
      </div>
    </Grow>
  );
};
