import useWeb3Store from './web3store';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';

export const useMetaMask = () => {
  const [
    isInstalledWallet,
    setConnectedAccount,
    setIsInstalledWallet,
    setIsConnected,
  ] = useWeb3Store(
    (state: Web3State & Web3Actions) => [
      state.isInstalledWallet,
      state.setConnectedAccount,
      state.setIsInstalledWallet,
      state.setIsConnected,
    ],
    shallow
  );

  const onChangeAccounts = async () => {
    window.ethereum.on('accountsChanged', function(accounts: string[]) {
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setConnectedAccount(null);
        setIsConnected(false);
      }
    });
  };

  const onChangeChain = async () => {
    window.ethereum.on('chainChanged', function(_chainId: string) {
      console.log('chainChanged:', parseInt(_chainId));
      window.location.reload();
    });
  };

  const checkIfWalletIsConnected = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (accounts && accounts.length) {
      setConnectedAccount(accounts[0]);
      setIsConnected(true);
    } else {
      setConnectedAccount(null);
      setIsConnected(false);
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    setIsInstalledWallet(!!window.ethereum);
  }, []);

  useEffect(() => {
    try {
      if (!isInstalledWallet) {
        checkIfWalletIsConnected();
        onChangeAccounts();
        onChangeChain();
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error in useMetaMask hook');
    }
  }, [isInstalledWallet]);
};
