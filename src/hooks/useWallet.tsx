import { useEffect, useState } from 'react';
import Web3 from 'web3'

export function useWallet(){
    const [accounts,setAccounts] = useState("");
    const [loading,setLoading] = useState(true);
    const [web3,setWeb3] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
          const new_web3 = new Web3(window.ethereum);
          await new_web3.eth.requestAccounts();
          const res = await new_web3.eth.getAccounts();
          setWeb3(new_web3)
          setAccounts(res[0])
        }
        else {
            console.log("Wallet not connected");
        }
    }

    useEffect(()=>{
        connectWallet().then(()=>{
            setLoading(false);
        })
    },[])

    return [web3,accounts,loading];
}
