import Header from "/components/Header";
import "/styles/globals.css";
import "/styles/argon-design-system-react.css";
import Head from "next/head";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { ContractContextProvider } from "/Constants/ContractContext";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY_CORS,
  }),
});

const projectId = process.env.NEXT_PUBLIC_WGMI_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>HealthTrust</title>
        <meta name="description" content="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <LivepeerConfig client={livepeerClient}>
          <ContractContextProvider>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Component {...pageProps} />
          </ContractContextProvider>
        </LivepeerConfig>
      </WagmiConfig>
    </div>
  );
}
