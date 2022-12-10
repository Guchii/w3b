interface Window {
  ethereum: any;
}
interface Web3State {
  isInstalledWallet: boolean;
  isConnected: boolean;
  connectedAccount: string | null;
  contracts: Map<string, any>;
  balance: string | number;
  provider: any;
}

interface Web3Actions {
  setIsConnected: (pay: boolean) => void;
  setIsInstalledWallet: (pay: boolean) => void;
  setConnectedAccount: (pay: string | null) => void;
  addContract: (fn: (state: Web3Actions & Web3State) => unknown) => void;
  setBalance: (pay: number | string) => void;
  setProvider: (pay: any) => void;
}
interface Contract {
  address: string;
  abi: Array<any>;
}
