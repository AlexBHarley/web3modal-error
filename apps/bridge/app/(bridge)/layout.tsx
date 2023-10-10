"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

function Web3Provider({ children }: { children: React.ReactNode }) {
  const { chains, wagmiConfig } = useMemo(() => {
    const { chains, publicClient } = configureChains(
      [mainnet, optimism],
      [publicProvider()]
    );

    const { connectors } = getDefaultWallets({
      appName: "Superbridge",
      projectId: "50c3481ab766b0e9c611c9356a42987b",
      chains,
    });

    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });
    return { chains, wagmiConfig };
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "Superbridge",
          learnMoreUrl: "https://superbridge.app/help",
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
