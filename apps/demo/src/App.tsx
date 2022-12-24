import "./App.css";
import {
  useW3b,
  useConnectWallet,
  useW3bValues,
  useContract,
  addChain,
  getCurrentChain,
} from "@guchii/w3b";
import abi from "../contract/abi.json";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
  useW3b();
  const { isConnected, connectedAccount, balance } = useW3bValues();
  const myContract = useContract({
    address: "0x346f5CE29332D6fec3c99F66033d138649451d61",
    abi,
  });
  const [data, setData] = useState<any>(null);
  const query = useQuery(
    ["todo"],
    async () => {
      const data = await myContract.idToTodo(2);
      return data;
    },
    {
      onSuccess(data) {
        setData(JSON.stringify(data));
        setError(null);
      },
      enabled: !!myContract,
    }
  );
  const [error, setError] = useState<any>(null);
  const connectWallet = useConnectWallet();
  const [sameChain, setSameChain] = useState<boolean>(false);
  const toggleTodo = useMutation(
    async () => {
      const txn = await myContract.toggle(2, { gasLimit: 3000000 });
      await txn.wait();
      return txn.hash;
    },
    {
      onSuccess: () => {
        console.log("success")
        query.refetch();
      },
      onError: () => {
        setError("Error toggling todo");
      },
    }
  );
  const getSameChain = async () => {
    const chainId = await getCurrentChain();
    if (chainId !== "0x" + (80001).toString(16)) {
      setSameChain(false);
    }
    setSameChain(true);
  };
  useEffect(() => {
    getSameChain();
    if (!isConnected) {
      setData(null);
    }
  }, [isConnected]);
  return (
    <div className="bg-yellow-300 text-sm text-gray-800 h-screen w-screen grid place-items-center">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col items-center">
        {data}
        {connectedAccount ? (
          <>
            <div className="mt-4">{connectedAccount}</div>
            <div className="mt-4">{balance} matic</div>
          </>
        ) : (
          <button
            className="rounded-full mt-2 bg-yellow-700 text-white px-8 py-4 active:translate-x-2 duration-100"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        <button
          className="rounded-full mt-2 bg-yellow-700 text-white px-8 py-4 active:translate-x-2 duration-100"
          onClick={() => toggleTodo.mutate()}
        >
          Toggle Todo Id 2
        </button>
        <button
          className="rounded-full mt-2 bg-yellow-800 text-white px-8 py-4 active:translate-x-2 duration-100"
          onClick={() => toggleTodo.mutate()}
        >
          Add Todo
        </button>
        {!sameChain && (
          <button
            className="rounded-full mt-2 bg-red-700 text-white px-8 py-4 active:translate-x-2 duration-100"
            onClick={() => addChain(80001)}
          >
            Switch To/Add Mumbai
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
