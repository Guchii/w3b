import shallow from 'zustand/shallow';
import { useWeb3Store } from './web3store';

export const useW3bValues = () => {
  const [
    isInstalledWallet,
    isConnected,
    connectedAccount,
    balance,
    provider,
    contracts,
  ] = useWeb3Store(
    (state: Web3State & Web3Actions) => [
      state.isInstalledWallet,
      state.isConnected,
      state.connectedAccount,
      state.balance,
      state.provider,
      state.contracts,
    ],
    shallow
  );

  return {
    isInstalledWallet,
    isConnected,
    connectedAccount,
    balance,
    provider,
    contracts,
  };
};
