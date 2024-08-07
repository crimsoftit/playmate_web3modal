import "../init";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

import Web3Modal from "web3modal";
import Web3 from "web3";
import "./style.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";


export const providerOptions = {
  binancechainwallet: {
    package: true
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "6ef9d3faf7dd490caf9b73a23fcfc95e"
    }
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: 'Playmate',
      infuraId: "6ef9d3faf7dd490caf9b73a23fcfc95e",
      rpc: "",
      //getChainId: 1,
      //chainId: 1, // -- eth mainnet
      chainId: 4, // -- rinkeby
      appLogoUrl: null,
      darkmode: true,
    }
  },
};





export default function WalletSpace() {

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });

  useEffect(() => {

    if (isConnected) {
      //alert (isConnected);
      setCurrentAccount
    }
    
  });


  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  async function connectWallet() {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.BrowserProvider(provider);
      
      await window.ethereum.send('eth_requestAccounts');
      var web3 = new Web3(provider);
      var accounts = await web3.eth.getAccounts();
      if (accounts) setCurrentAccount(accounts[0]);
      
      setIsConnected(true);
      document.querySelector('.wallet_address')!.innerHTML = accounts[0];

      const network = await library.getNetwork();
      setProvider(provider);
      //setLibrary(library);
      
      //setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };
  
  if (currentAccount != null) {
    return (
      <div className="box_3">
          {


            
            
              isConnected
                ? <div className="ac_address_box">
                    <p className="overflow_ellipsis">
                      { currentAccount }
                    </p>
                  </div>
                  
                
                : <button disabled className="btn btn-three" id="connectWalletBtn" onClick={ connectWallet }>
                  <span className="wallet_address">{ currentAccount }</span>
                </button>
            
          }
            
      </div>
    );
    
  } else {
    return (
      <button className="btn btn-three items-center justify-center   rounded-half bg-blue-high px-10 text-dim-black hover:bg-blue-high/80 md:w-auto" id="connectWalletBtn" onClick={ connectWallet }>
        <span className="wallet_address">Connect Wallet</span>
      </button>
    );
  }
}
