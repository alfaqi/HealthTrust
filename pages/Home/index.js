import { Grow } from "@mui/material";
import Link from "next/link";

export default () => {
  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
      <div className="container h-screen flex flex-col mx-auto">
        <p>Make sure your on Toro Blockchain testnet</p>
        <p>Add Toro to your Wallet</p>
        <Link
          className="underline"
          href={"https://chainlist.org/chain/toronet%20testnet"}
          target="_blank"
        >
          Go to Chainlist.org
        </Link>
        <h4>Step 1: Connecting to Toronet With MetaMask</h4>
        <ol>
          <li>
            Inside of MetaMask, click the toggle that by default says “Ethereum
            Mainnet”.
          </li>
          <li>Then select “Add Network”.</li>
          <li>Set the name to Toronet Test Network.</li>
          <li>
            Set the “New RPC URL”, set it to the current public RPC address for
            the Toronet testnet:{" "}
            <Link
              className="underline"
              href="https://testnet.toronet.org/rpc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://testnet.toronet.org/rpc/
            </Link>
          </li>
          <li>Set “Chain ID” to 54321.</li>
          <li>
            Set the blockchain explorer to{" "}
            <Link
              className="underline"
              href="https://testnet.toronet.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://testnet.toronet.org/
            </Link>
          </li>
        </ol>

        <h4>Step 2: Add Toro Token into MetaMask</h4>
        <ol>
          <li>
            On the Add Token page, click on the Import tokens to expand the
            search window.
          </li>
          <li>
            Enter the token address in the field called Token Address:{" "}
            <span className="font-semibold">
              0x21fe4779B8b8e00Fb76e754A1D527ad758DfEdE7
            </span>
          </li>
          <li>Click Next to proceed.</li>
          <li>
            You will be redirected to confirm adding a token. Click Add Token to
            confirm.
          </li>
        </ol>
      </div>
    </Grow>
  );
};
