import useWeb3Store from './web3store';
import { useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import shallow from 'zustand/shallow';

export const useW3b = () => {
  const [connectedAccount, setBalance, provider, setProvider] = useWeb3Store(
    (state: Web3Actions & Web3State) => [
      state.connectedAccount,
      state.setBalance,
      state.provider,
      state.setProvider,
    ],
    shallow
  );

  const BalanceContract = useCallback(async () => {
    const balance = await provider.getBalance(connectedAccount);
    setBalance(ethers.utils.formatEther(balance));
  }, [connectedAccount, provider]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  useEffect(() => {
    if (connectedAccount && provider) BalanceContract();
  }, [connectedAccount, provider, BalanceContract]);
};
