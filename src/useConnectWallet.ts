import useWeb3Store from './web3store';
import shallow from 'zustand/shallow';
export const useConnectWallet = () => {

  const [isInstalledWallet, setConnectedAccount, setIsConnected] = useWeb3Store(
    (state: Web3State & Web3Actions) => [
      state.isInstalledWallet,
      state.setConnectedAccount,
      state.setIsConnected,
    ],
    shallow
  );

  const connectWallet = async () => {
    if (!isInstalledWallet) {
      throw new Error('No ethereum object.');
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (accounts && accounts.length) {
      setConnectedAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  return connectWallet;
};