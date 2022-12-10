import create from 'zustand';
import produce from 'immer';

const useWeb3Store = create<Web3State & Web3Actions>()(set => ({
  isInstalledWallet: false,
  isConnected: false,
  connectedAccount: null,
  contracts: new Map([]),
  balance: 0,
  provider: null,
  setIsConnected: pay => set({ isConnected: pay }),
  setIsInstalledWallet: pay => set({ isInstalledWallet: pay }),
  setConnectedAccount: pay => set({ connectedAccount: pay }),
  addContract: fn => set(produce(fn)),
  setBalance: pay => set({ balance: pay }),
  setProvider: pay => set({ provider: pay }),
}));

export default useWeb3Store;
