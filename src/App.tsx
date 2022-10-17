import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { Profile } from "./modules/Profile";
const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains: [chain.mainnet, chain.polygon] }),
    new WalletConnectConnector({
      chains: [chain.mainnet, chain.polygon],
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export const App = () => {
  return (
    <WagmiConfig client={client}>
      <Profile />
      <div className="App">
        <p>Testing web3 login</p>
      </div>
    </WagmiConfig>
  );
};
