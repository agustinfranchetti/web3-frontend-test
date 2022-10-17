import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const Profile = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected)
    return (
      <div>
        Connected to {ensName ?? address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return <button onClick={() => connect()}>Connect Wallet</button>;
};
