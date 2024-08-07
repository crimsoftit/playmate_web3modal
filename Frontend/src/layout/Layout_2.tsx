import "../init";


import React, { Component, useEffect, useState } from "react";
import "./style.css";





import Web3Modal, { getChainId } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import WalletSdk from "@coinbase/wallet-sdk";
import { binancechainwallet, walletconnect } from "web3modal/dist/providers/connectors";
import Web3 from "web3";




export default function WalletSpace() {


  /// -- variables --
  //var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:4200/"));

  const web = new Web3();
 

  
  const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {

    web.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:4200'));



   web.eth.net.isListening()
   .then(() => alert('is connected'))
   .catch(e => console.log('Wow. Something went wrong: '+ e));

    

    // if ((window as any).ethereum) {
    //   setIsWalletInstalled(true);
    //   if ((currentAccount != null) ) {
    //     connectWallet;
    //   }
    // }

    
  });


  const providerOptions = {
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


  




  


  const web3Modal = new Web3Modal ({
      network: "rinkeby",
      theme: "dark",
      cacheProvider: true,
      providerOptions
    }
  );

  async function connectWallet() {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await window.ethereum.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
    setIsConnected(true);
    //currentAccount = accounts[0];
    document.querySelector('.wallet_address')!.innerHTML = accounts[0];

    //await web3Modal.toggleModal();
  }


  
  function refreshPage(){ 
    window.location.reload(); 
  }
  
  



  if (currentAccount != null) {
    return (
      <div className="box-3">
          {


            
            
              isConnected
                ? <div className="ac_address_box">
                    <p className="overflow_ellipsis">
                      { currentAccount }
                    </p>
                  </div>
                  
                
                : <button disabled className="btn btn-three items-center justify-center   rounded-half bg-blue-high px-10 text-dim-black hover:bg-blue-high/80 md:w-auto" id="connectWalletBtn" onClick={ connectWallet }>
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
