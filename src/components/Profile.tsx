import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

import React, { useEffect } from "react";

export const Profile = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({
    // uncomment to test with ENS, this is vitalik.eth's address
    // address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    address,
    chainId: 1,
  });
  const { chain: network } = useNetwork();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const networkSwitch = useSwitchNetwork();

  if (isLoading && network?.id !== 137) {
    if (networkSwitch?.switchNetwork) {
      //call only once to avoid infinite loop
      networkSwitch.switchNetwork(137);
    }
  }

  if (isConnected) {
    return (
      <div>
        <p>Connected to {network?.name}</p>
        <p>Address: {address}</p>
        <p>ENS Name: {ensName || "no ENS domain"}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};
