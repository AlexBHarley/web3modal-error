"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import dynamic from "next/dynamic";
import { WagmiConfig } from "wagmi";
import { mainnet, optimism } from "wagmi/chains";

const chains = [mainnet, optimism];
const projectId = "50c3481ab766b0e9c611c9356a42987b";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

function Web3Provider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
