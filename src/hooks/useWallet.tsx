import { useEffect, useState } from 'react';
import Web3 from 'web3'

export function useWallet(){
    const [accounts,setAccounts] = useState("");
    const [loading,setLoading] = useState(true);
    const [isAvailable,setIsAvailable] = useState(false);
    const [web3,setWeb3] = useState<Web3 | null>(null);

    const connectWallet = async () => {
        const provider = (window as any).ethereum;
        if (provider) {
          const new_web3 = new Web3(provider);
          await new_web3.eth.requestAccounts();
          const res = await new_web3.eth.getAccounts();
          setWeb3(new_web3)
          setAccounts(res[0])
          setIsAvailable(true);
        }
        else {
            setIsAvailable(false);
        }

        setLoading(false)
    }

    connectWallet();

    return [web3,accounts,loading,isAvailable];
}
