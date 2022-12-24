export const getChainInfo = async (chainId: string | number) => {
  const response = await fetch('https://chainid.network/chains.json', {
    method: 'GET',
  });
  const data = await response.json();
  const chain = data.find((chain: any) => chain.chainId == chainId);
  if (!!chain) return chain;
  return null;
};

export const getCurrentChain = async () => {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  return chainId;
};

export const addChain = async (chainId: string | number) => {
  const chain = await getChainInfo(chainId);
  if (!chain) return;
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x' + chain.chainId.toString(16),
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: chain.rpc,
          blockExplorerUrls: chain.explorers.map((explorer: any) => explorer.url),
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

export const switchChain = async (chainId: number) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + chainId.toString(16) }],
    });
  } catch (error) {
    if ((error as any).code === 4902) {
      await addChain(chainId);
    }
  }
};
