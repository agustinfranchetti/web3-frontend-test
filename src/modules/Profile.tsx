import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const Profile = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({
    // uncomment to test with ENS, this is vitalik.eth's address
    // address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    address,
    chainId: 1,
  });
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { chain: network } = useNetwork();

  if (isConnected)
    return (
      <div>
        <p>Connected to {network?.name}</p>
        <p>Address: {address}</p>
        <p>ENS Name: {ensName || "no ENS domain"}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};
