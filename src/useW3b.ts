import useWeb3Store from './web3store';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import shallow from 'zustand/shallow';

const abi = [] as Array<any>;
const contractAddress = '123123123091823012381231';

export const useW3b = () => {
  const [connectedAccount, setBalance, setContract] = useWeb3Store(
    (state: Web3Actions & Web3State) => [
      state.connectedAccount,
      state.setBalance,
      state.setContract,
    ],
    shallow
  );
  const [provider, setProvider] = useState<any>(null);

  const BalanceContract = useCallback(async () => {
    const balance = await provider.getBalance(connectedAccount);
    setBalance(ethers.utils.formatEther(balance));
    const LandContract = new ethers.Contract(
      contractAddress,
      abi,
      provider.getSigner()
    );
    setContract(LandContract);
  }, [connectedAccount, provider]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  useEffect(() => {
    if (connectedAccount && provider) BalanceContract();
  }, [connectedAccount, provider, BalanceContract]);
};
