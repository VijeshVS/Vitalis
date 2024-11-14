'use client'
// pages/login.js
import { useWallet } from '@/hooks/useWallet';
import React from 'react';

// Placeholder Ethereum logo URL
const ethereumLogoUrl = 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022';

export default function Login() {
    const [web3, account, loading] = useWallet();

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-800 text-white">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Vitalis</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {account ? (
                            <p>Connected to {account}</p>
                        ) : (
                            <p>Failed to connect to wallet</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
