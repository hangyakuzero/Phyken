"use client";
import React, { useState, useEffect } from 'react';
import solar from "../../../public/solar.png";
import Image from 'next/image';
import { providers } from '@ethersproject/providers';
import { ethers } from 'ethers';
import {utils} from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import {BigNumber} from "@ethersproject/bignumber";


import PhykenNFT from '../../PhykenNFT.json';

const PhykenNFTAddress = "0x937de80986a9ec86c6020a791ac9e4a85eeb859a";

export default function Mint() {
    const [mintAmount, setMintAmount] = useState(1);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    
    useEffect(() => {
        async function checkMetaMask() {
            if (typeof window.ethereum !== 'undefined' && window.ethereum.selectedAddress !== null) {
                setIsWalletConnected(true);
            }
        }
        checkMetaMask();
    }, []);

    const switchToPolygonAmoy = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0X13882',
                        chainName: 'Amoy',
                        rpcUrls: [' https://rpc-amoy.polygon.technology/'], // RPC URL for Polygon Amoy
                        nativeCurrency: {
                            name: 'Polygon',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        blockExplorerUrls: ['https://www.oklink.com/amoy'] // Block explorer URL for Polygon Amoy
                    }]
                });
            } catch (error) {
                console.error('Error switching to Polygon Amoy:', error);
            }
        } else {
            console.error('MetaMask extension not found');
        }
    };

    const handleConnectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsWalletConnected(true);
            await switchToPolygonAmoy(); // Switch to Polygon Amoy after connecting
        } catch (error) {
            console.error('Error connecting MetaMask:', error);
        }
    };
    
    const handleMint = async () => {
        if (!window.ethereum || !window.ethereum.selectedAddress) {
            console.error('MetaMask is not connected or initialized.');
            return;
        } try {
            // Request accounts if not already available
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                PhykenNFTAddress,
                PhykenNFT.abi,
                signer
            );
    
           
            const mintAmountInEth = parseFloat(mintAmount);
            if (isNaN(mintAmountInEth)) {
                console.error('Invalid mint amount:', mintAmount);
                return;
            }
    
            // Convert to wei manually
            const mintAmountInWei = BigInt(mintAmountInEth * 10**18); // 1 ETH = 10^18 Wei
    
            const overrides = {
                value: mintAmountInWei.toString()
            };
    
            const tx = await contract.mint(mintAmountInWei, overrides);
            await tx.wait(); // Wait for the transaction to be mined
            console.log('Minted successfully:', tx.hash);
        } catch (error) {
            console.error('Error minting:', error);
        }
    };

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 10) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div className='bg-base-100 h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0' style={{ paddingTop: '5rem' }}>
            <div className="flex items-center mb-0">
                <Image src={solar} width={250} height={250} style={{ animation: 'bounce 3s infinite', marginLeft: '-30rem' }} />
                <div className="ml-3">
                    <h1 className="text-4xl font-bold">Solar farms</h1>
                    <p>Invest in solar farms spread across xyz acres located in abc.</p>
                </div>
            </div>
            <div  style={{ marginLeft: "-30rem", marginTop: "-5rem" }}>
                <button onClick={handleDecrement}>-</button>
                <span className='ml-2 mr-2'>{mintAmount}</span>
                <button onClick={handleIncrement}>+</button><br/>
                <p  style={{ marginLeft: "-3rem"}}>Total Price: {mintAmount * 0.0001} ETH</p>
            </div>
            <div className="mt-4" style={{ marginLeft: "-38rem", marginTop: "2rem" }}> {/* Adjust marginTop for button position */}
                {!isWalletConnected ? (
                    <button className="btn btn-accent" onClick={handleConnectMetaMask}>Connect Wallet</button>
                ) : (
                    <button className="btn btn-accent" onClick={handleMint}>Mint Now</button>
                )}
            </div>
            <style jsx>{`
                @keyframes bounce {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
