import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Testnet!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });

    const rinkebyChainId = "0x4";

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  });

  return (
    <div>
      {currentAccount === "" ? (
        <button className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>Please connect to the Rinkeby Testnet</div>
        </div>
      )}
    </div>
  );
}

export default App;
