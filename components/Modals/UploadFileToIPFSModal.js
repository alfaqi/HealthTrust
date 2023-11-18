import { Button, Tooltip } from "@mui/material";

import { Web3Storage } from "web3.storage";
import { createHTContractIPFS } from "../../Constants/contractUtils";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";

const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN;
const client = new Web3Storage({ token });

const prefix = "https://";
const prefixIPFS = "ipfs://";
const suffix = ".ipfs.w3s.link";

export default ({ address, recordId, uploadFile }) => {
  const [waiting, setWaiting] = useState(false);
  async function uploadToIPFS() {
    try {
      setWaiting(true);
      console.log("uploading new file");
      const blob = new Blob([uploadFile], { type: "application/pdf" });

      console.log(blob);

      const cid = await client.put([blob], {
        wrapWithDirectory: false,
      });
      console.log(`${prefix}${cid}${suffix}`);

      const contract = await createHTContractIPFS();
      console.log(address.toString(), recordId, `${prefix}${cid}${suffix}`);
      await contract.addToIPFS(
        address.toString(),
        recordId,
        `${prefix}${cid}${suffix}`
      );
      setWaiting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <Tooltip title="Upload Report to IPFS">
      <Button
        className="m-1 p-3 bg-slate-200 hover:bg-slate-400"
        onClick={uploadToIPFS}
        disabled={waiting}
      >
        <CloudUpload />
      </Button>
    </Tooltip>
  );
};
