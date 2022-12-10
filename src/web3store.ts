import create from 'zustand';

const useWeb3Store = create<Web3State & Web3Actions>()(set => ({
  isInstalledWallet: false,
  isConnected: false,
  connectedAccount: null,
  contract: null,
  balance: 0,
  setIsConnected: pay => set({ isConnected: pay }),
  setIsInstalledWallet: pay => set({ isInstalledWallet: pay }),
  setConnectedAccount: pay => set({ connectedAccount: pay }),
  setContract: pay => set({ contract: pay }),
  setBalance: pay => set({ balance: pay }),
}));

export default useWeb3Store;
