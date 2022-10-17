import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { publicProvider } from "wagmi/providers/public";
import { Profile } from "./components/Profile";
const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains: [chain.polygon] }),
    new WalletConnectConnector({
      chains: [chain.polygon],
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
