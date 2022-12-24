import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useWeb3Store } from './web3store';

export const useContract = (contractInfo: Contract) => {
  const [
    provider,
    contracts,
    addContract,
  ] = useWeb3Store((state: Web3Actions & Web3State) => [
    state.provider,
    state.contracts,
    state.addContract,
  ]);

  useEffect(() => {
    console.log('tryna add contract to the store');
    addContract((state: Web3Actions & Web3State) => {
      if (state.contracts.has(contractInfo.address)) {
        console.log('contract already in store');
        return;
      }
      try {
        console.log('contract not in store, adding it now');
        const contract = new ethers.Contract(
          contractInfo.address,
          contractInfo.abi,
          provider.getSigner()
        );
        state.contracts.set(contractInfo.address, contract);
      } catch (error) {
        console.log(error);
      }
    });
  }, [provider]);

  return contracts.get(contractInfo.address);
};
