import { atom } from 'recoil';
import Web3 from 'web3';

export const isLoggedInAtom = atom({
    key: "isLoggedInAtom",
    default: false,
});
