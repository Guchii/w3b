interface Window {
  ethereum: any;
}
interface Web3State {
  isInstalledWallet: boolean;
  isConnected: boolean;
  connectedAccount: string | null;
  contract: ethers.Contract | null;
  balance: string | number;
}

interface Web3Actions {
  setIsConnected: (pay: boolean) => void;
  setIsInstalledWallet: (pay: boolean) => void;
  setConnectedAccount: (pay: string | null) => void;
  setContract: (pay: ethers.Contract) => void;
  setBalance: (pay: number | string) => void;
}

interface Contract {
  address: string;
  abi: Array<any>;
}