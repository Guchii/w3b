import useWeb3Store from './web3store';
import { useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import shallow from 'zustand/shallow';

export const useW3b = () => {
  const [
    isInstalledWallet,
    setConnectedAccount,
    setIsInstalledWallet,
    setIsConnected,
    connectedAccount,
    setBalance,
    provider,
    setProvider,
  ] = useWeb3Store(
    (state: Web3State & Web3Actions) => [
      state.isInstalledWallet,
      state.setConnectedAccount,
      state.setIsInstalledWallet,
      state.setIsConnected,
      state.connectedAccount,
      state.setBalance,
      state.provider,
      state.setProvider,
    ],
    shallow
  );

  const getBalance = useCallback(async () => {
    const balance = await provider.getBalance(connectedAccount);
    setBalance(ethers.utils.formatEther(balance));
  }, [connectedAccount, provider]);

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

  if (!isInstalledWallet) {
    throw new Error('No ethereum object');
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  useEffect(() => {
    if (connectedAccount && provider) getBalance();
  }, [getBalance]);

  useEffect(() => {
    checkIfWalletIsConnected();
    onChangeAccounts();
    onChangeChain();
  }, []);
};
