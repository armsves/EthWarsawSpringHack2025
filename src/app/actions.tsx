'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { createStreamableUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';

import readline from "node:readline";
import { http, createWalletClient, parseEther, GetBalanceParameters, erc20Abi, createPublicClient, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
//import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
//import { Token, erc20 } from "@goat-sdk/plugin-erc20";
//import { erc4626, Vault } from "@goat-sdk/plugin-erc4626";
//import { erc4626, Vault } from "../erc4626";
//import { sendETH } from "@goat-sdk/wallet-evm";
//import { viem } from "@goat-sdk/wallet-viem";
//import { ChainKey, createConfig, EVM } from '@lifi/sdk'
//import { ChainId, getQuote } from '@lifi/sdk'
//import { executeRoute, getRoutes, getToken } from '@lifi/sdk'

import { IFeature } from '@vialabs-io/node-core/types/IFeature';
import { IDriverBase } from '@vialabs-io/node-core/types/IDriverBase';
import { IMessage } from '@vialabs-io/node-core/types/IMessage';
import { Vladiator } from "@vialabs-io/node-core/Vladiator";
import { IVladiator } from "@vialabs-io/node-core/types/IVladiator";
import { ethers } from 'ethers';

import { arbitrum, mainnet, mantle, optimism, polygon, Chain, bsc, polygonAmoy, sepolia, mantleSepoliaTestnet, baseSepolia } from 'viem/chains'

class CustomFeature implements IFeature {
  public featureId = 7000000; // This is normally the correct feature ID to use in a custom project.
  public featureName = 'CustomFeature';
  public featureDescription = 'A custom feature that does something special.';

  async process(driver: IDriverBase, message: IMessage): Promise<IMessage> {
    console.log('Processing feature:', this.featureName);
    // Custom logic here, pull information from external database, call an API
    // or do multiple cross chain transactions. Any arbitrary code can run here
    // and any arbitrary data can be passed back to the receiving contract:
    //
    // It is also possible to encode complex data structures, which are decoded
    // on chain and able to be used by the implementing contract:
    //
    // message.featureReply = ethers.utils.defaultAbiCoder.encode();

    // Fetch data from the Pokémon API
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const data = await response.json();

    message.featureReply = await JSON.stringify("sss");
    //const types = ['string']; // Define the types of the data to be encoded
    //const values = [message.featureReply]; // Define the values to be encoded
    //message.featureReply = ethers.utils.defaultAbiCoder.encode(types, values);

    return message;
  }

  async isMessageValid(driver: IDriverBase, message: IMessage): Promise<boolean> {
    // Optional extra validation logic here - for example, off-chain KYC check or linking to
    // an off-chain database record or authentication service. 
    return true;
  }
}

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const myAddress = account.address;
const chains: Chain[] = [arbitrum, mainnet, optimism, polygon, mantle, bsc, polygonAmoy, sepolia, baseSepolia];

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});

/*
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})
  */

/*
createConfig({
  integrator: "LifiAI",
  providers: [
    EVM({
      getWalletClient: async () => client,
      switchChain: async (chainId) =>
        // Switch chain by creating a new wallet client
        createWalletClient({
          account,
          chain: chains.find((chain) => chain.id === chainId) as Chain,
          transport: http(),
        }),
    }),
  ],
});
*/

require("dotenv").config();

const ChainIdMap = [
  { id: 1, name: 'Ethereum', symbol: 'ETH' },
  { id: 137, name: 'Polygon', symbol: 'POL' },
  { id: 56, name: 'Binance Smart Chain', symbol: 'BNB' },
  { id: 100, name: 'xDai', symbol: 'DAI' },
  { id: 250, name: 'Fantom', symbol: 'FTM' },
  { id: 43114, name: 'Avalanche', symbol: 'AVA' },
  { id: 42161, name: 'Arbitrum', symbol: 'ARB' },
  { id: 10, name: 'Optimism', symbol: 'OPT' },
  { id: 8453, name: 'Base', symbol: 'BAS' },
  { id: 5000, name: 'Mantle', symbol: 'MNT' },
  {
    id: 84532, name: 'Base Sepolia', symbol: 'BAS',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    rpc: 'https://base-sepolia.drpc.org'
  },
  {
    id: 11155111, name: 'Ethereum Sepolia', symbol: 'ETH',
    usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    rpc: 'https://sepolia.drpc.org'
  },
  {
    id: 80002, name: 'Polygon Amoy', symbol: 'POL',
    usdcAddress: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582',
    rpc: 'https://polygon-amoy.drpc.org'
  },
];


/*
const walletClient = createWalletClient({
  account: account,
  transport: http("https://rpc.sepolia.mantle.xyz"),
  chain: mantleSepoliaTestnet,
});
// Define sozuHausResident token
const sozuHausResident: Token = {
  decimals: 18,
  symbol: "SHR",
  name: "SozuHausResident",
  chains: {
    "5003": {
      // Mantle Sepolia chain ID
      contractAddress: "0xdeB1e008F224c959B75aCCA5413a150DC7049E67", // Replace with actual contract address
    },
  },
};

// Define sozuHausResident Vault
const sozuHausResidentVault: Vault = {
  name: "SozuHausResidentVault",
  chains: {
    "5003": {
      // Mantle Sepolia chain ID
      contractAddress: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", // Replace with actual contract address
    },
  },
};
*/
/*
const tools = await getOnChainTools({
  wallet: viem(walletClient),
  plugins: [
    sendETH() as any, // Enable ETH transfers
    erc20({ tokens: [sozuHausResident] }), // Enable ERC20 token operations
    erc4626({ vaults: [sozuHausResidentVault] }), // Enable ERC4626 vault operations
  ],
});
*/


export interface Message {
  role: 'user' | 'assistant';
  content: string;
  display?: ReactNode;
}

const tools = {

  /*
  const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
})
  */

  getMyWalletAddress: tool({
    description: 'Get my wallet address',
    parameters: z.object({}),
    execute: async () => {
      return myAddress;
    },
  }),

  getCustomFeature: tool({
    description: 'Get the custom feature',
    parameters: z.object({}),
    execute: async () => {
      const customFeature = await new CustomFeature();

      return customFeature;
    }
  }),

  /*
  checkIfNativeToken: tool({
      description: 'Check if the token is native on the provided chain',
      parameters: z.object({
        chainName: z.string().describe('The chain id to check the token on'),
        tokenSymbol: z.string().describe('The token symbol between quotes to check'),
      }),
      execute: async ({ chainName, tokenSymbol }: { chainName: string, tokenSymbol: string }) => {
        const chain = ChainIdMap.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
        if (chain?.symbol.toLowerCase() === tokenSymbol.toLowerCase()) {
          return true;
        }
        return false;
      },
    }),
    */


  getBalance: tool({
    description: 'Get the balance of the token if its native on the provided chain',
    parameters: z.object({
      chainName: z.string().describe('The chain id to get the balance from'),
      //tokenAddress: z.string().describe('The token name to get the info for'),
      walletAddress: z.string().describe('The wallet address to get the balance for'),
    }),
    execute: async ({
      chainName,
      //tokenAddress, 
      walletAddress }: {
        chainName: string,
        //tokenAddress: string, 
        walletAddress: string
      }) => {

      const chains: Chain[] = [arbitrum, mainnet, optimism, polygon, mantle, bsc];

      const chainId = getChainIdByName(chainName);

      const chain = chains.find((chain) => chain.id === Number(chainId));
      if (!chain) {
        throw new Error(`Chain with ID ${chainId} not found`);
      }

      const publicClient = createPublicClient({
        chain,
        transport: http()
      })
      const balance = await publicClient.getBalance({
        address: walletAddress as `0x${string}`,
      })
      const balanceAsEther = formatEther(balance)
      console.log('el balance es: ', balanceAsEther);
      return balanceAsEther.toString();
    },
  }),

  getBalanceofToken: tool({
    description: 'Get the balance of the token if it is not native and is an ERC20 token on the provided chain',
    parameters: z.object({
      chainName: z.string().describe('The chain name to get the balance from'),
      tokenName: z.string().describe('The token name to get the info for but first needs to get the token address of the chain with the right number of decimals'),
      walletAddress: z.string().describe('The wallet address to get the balance for'),
    }),
    execute: async ({ chainName, tokenName, walletAddress }: { chainName: string, tokenName: string, walletAddress: string }) => {
      console.log('chainName: ', chainName);
      const chainId = getChainIdByName(chainName);
      console.log('chainId: ', chainId);

      if (chainId === undefined) {
        throw new Error(`Chain with name ${chainName} not found`);
      }

      const chain = chains.find((chain) => chain.id === Number(chainId.id));
      if (!chain) {
        throw new Error(`Chain with ID ${chainId.id} not found`);
      }

      const publicClient = createPublicClient({
        chain,
        transport: http()
      });

      // Retrieve the token address and decimals
      //const tokenInfo = await getToken(chainId, tokenName);
      const tokenAddress = chainId.usdcAddress;
      const tokenDecimals = 6;

      console.log('tokenAddress: ', tokenAddress);
      console.log('tokenDecimals: ', tokenDecimals);
      console.log('walletAddress: ', walletAddress);

      // Fetch the balance of the ERC20 token 
      const balance = await publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
      });

      // Format the balance with the correct number of decimals
      const formattedBalance = (Number(balance) / 10 ** tokenDecimals).toFixed(tokenDecimals);

      console.log('el balance es: ', formattedBalance);
      return formattedBalance;
    },
  }),

  supplyTokenToChain: tool({
    description: 'Supply the token to the chain',
    parameters: z.object({
      chainName: z.string().describe('The chain name to supply the token to'),
      tokenName: z.string().describe('The token name to supply to the chain'),
      amount: z.string().describe('The amount to supply to the chain'),
    }),
    execute: async ({ chainName, tokenName, amount }: { chainName: string, tokenName: string, amount: string }) => {
      const chainId = getChainIdByName(chainName);
      console.log('chainId: ', chainId);
      if (!chainId) {
        throw new Error(`Chain with name ${chainName} not found`);
      }

      const chain = chains.find((chain) => chain.id === Number(chainId.id));
      if (!chain) {
        throw new Error(`Chain with ID ${chainId.id} not found`);
      }

      const walletClient = createWalletClient({
        account: account,
        chain: chain,
        transport: http(),
      });

      ///////////////////////////////////////////////////
      /*
          id: 11155111, name: 'Ethereum Sepolia', symbol: 'ETH',
          usdcAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
          rpc: 'https://sepolia.drpc.org'
      */
      console.log('aqui voy')
      //const ethers = require('ethers');
      const provider = new ethers.JsonRpcProvider('https://1rpc.io/sepolia');
      //.providers.JsonRpcProvider('https://sepolia.drpc.org');
      //.providers.JsonRpcProvider('https://1rpc.io/sepolia');

      console.log('aqui voy 2')
      // Your Ethereum wallet private key
      const privateKey = process.env.WALLET_PRIVATE_KEY as `0x${string}`;
      const wallet = new ethers.Wallet(privateKey, provider);
      const myWalletAddress = wallet.address;

      // Mainnet Contract for cUSDC (https://compound.finance/docs#networks)
      const cTokenContractAddress = '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e';
      //const cTokenAbiJson = [{ "inputs": [{ "internalType": "address", "name": "underlying_", "type": "address" }, { "internalType": "contract ComptrollerInterface", "name": "comptroller_", "type": "address" }, { "internalType": "contract InterestRateModel", "name": "interestRateModel_", "type": "address" }, { "internalType": "uint256", "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint8", "name": "decimals_", "type": "uint8" }, { "internalType": "address payable", "name": "admin_", "type": "address" }, { "internalType": "address", "name": "implementation_", "type": "address" }, { "internalType": "bytes", "name": "becomeImplementationData", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "cashPrior", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event", "signature": "0x4dec04e750ca11537cabcd8a9eab06494de08da3735bc8871cd41250e190bc04" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event", "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event", "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "error", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "info", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event", "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "liquidator", "type": "address" }, { "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event", "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "minter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "mintAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event", "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event", "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract ComptrollerInterface", "name": "oldComptroller", "type": "address" }, { "indexed": false, "internalType": "contract ComptrollerInterface", "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event", "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldImplementation", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newImplementation", "type": "address" }], "name": "NewImplementation", "type": "event", "signature": "0xd604de94d45953f9138079ec1b82d533cb2160c906d1076d1f7ed54befbca97a" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract InterestRateModel", "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "internalType": "contract InterestRateModel", "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event", "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event", "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event", "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "redeemer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event", "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event", "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "benefactor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "addAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesAdded", "type": "event", "signature": "0xa91e67c5ea634cd43a12c5a482724b03de01e85ca68702a53d0c2f45cb7c1dc5" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "admin", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event", "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event", "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe9c714f2" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "addAmount", "type": "uint256" }], "name": "_addReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3e941010" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x601a0bf1" }, { "constant": false, "inputs": [{ "internalType": "contract ComptrollerInterface", "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4576b5db" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "implementation_", "type": "address" }, { "internalType": "bool", "name": "allowResign", "type": "bool" }, { "internalType": "bytes", "name": "becomeImplementationData", "type": "bytes" }], "name": "_setImplementation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x555bcc40" }, { "constant": false, "inputs": [{ "internalType": "contract InterestRateModel", "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf2b3abbd" }, { "constant": false, "inputs": [{ "internalType": "address payable", "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb71d1a0c" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xfca7820b" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6c540baf" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa6afed95" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf851a440" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd62ed3e" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x095ea7b3" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x70a08231" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3af9e669" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc5ebeaec" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x17bfdfbc" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95dd9193" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xaa5af0fd" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf8f9da28" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "internalType": "contract ComptrollerInterface", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5fe3b567" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x313ce567" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "delegateToImplementation", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0933c1ed" }, { "constant": true, "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "delegateToViewImplementation", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x4487152f" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xbd6d894d" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x182df0f5" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc37f68e2" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3b1d21a2" }, { "constant": true, "inputs": [], "name": "implementation", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5c60da1b" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "internalType": "contract InterestRateModel", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf3fdb15a" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xfe9c44ae" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }, { "internalType": "contract CTokenInterface", "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf5e3c462" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "mintAmount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa0712d68" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x06fdde03" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x26782247" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xdb006a75" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x852a12e3" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "repayBorrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0e752702" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "repayBorrowBehalf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x2608f818" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x173b9904" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb2a02ff1" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xae9d70b0" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95d89b41" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x47bd3718" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x73acee98" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8f840ddd" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18160ddd" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa9059cbb" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x23b872dd" }, { "constant": true, "inputs": [], "name": "underlying", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6f307dc3" }];

      const cTokenAbiJson = [{"inputs":[{"components":[{"internalType":"address","name":"governor","type":"address"},{"internalType":"address","name":"pauseGuardian","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"address","name":"baseTokenPriceFeed","type":"address"},{"internalType":"address","name":"extensionDelegate","type":"address"},{"internalType":"uint64","name":"supplyKink","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateSlopeLow","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateSlopeHigh","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateBase","type":"uint64"},{"internalType":"uint64","name":"borrowKink","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateSlopeLow","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateSlopeHigh","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateBase","type":"uint64"},{"internalType":"uint64","name":"storeFrontPriceFactor","type":"uint64"},{"internalType":"uint64","name":"trackingIndexScale","type":"uint64"},{"internalType":"uint64","name":"baseTrackingSupplySpeed","type":"uint64"},{"internalType":"uint64","name":"baseTrackingBorrowSpeed","type":"uint64"},{"internalType":"uint104","name":"baseMinForRewards","type":"uint104"},{"internalType":"uint104","name":"baseBorrowMin","type":"uint104"},{"internalType":"uint104","name":"targetReserves","type":"uint104"},{"components":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometConfiguration.AssetConfig[]","name":"assetConfigs","type":"tuple[]"}],"internalType":"struct CometConfiguration.Configuration","name":"config","type":"tuple"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Absurd","type":"error"},{"inputs":[],"name":"AlreadyInitialized","type":"error"},{"inputs":[],"name":"BadAsset","type":"error"},{"inputs":[],"name":"BadDecimals","type":"error"},{"inputs":[],"name":"BadDiscount","type":"error"},{"inputs":[],"name":"BadMinimum","type":"error"},{"inputs":[],"name":"BadPrice","type":"error"},{"inputs":[],"name":"BorrowCFTooLarge","type":"error"},{"inputs":[],"name":"BorrowTooSmall","type":"error"},{"inputs":[],"name":"InsufficientReserves","type":"error"},{"inputs":[],"name":"InvalidInt104","type":"error"},{"inputs":[],"name":"InvalidInt256","type":"error"},{"inputs":[],"name":"InvalidUInt104","type":"error"},{"inputs":[],"name":"InvalidUInt128","type":"error"},{"inputs":[],"name":"InvalidUInt64","type":"error"},{"inputs":[],"name":"LiquidateCFTooLarge","type":"error"},{"inputs":[],"name":"NegativeNumber","type":"error"},{"inputs":[],"name":"NoSelfTransfer","type":"error"},{"inputs":[],"name":"NotCollateralized","type":"error"},{"inputs":[],"name":"NotForSale","type":"error"},{"inputs":[],"name":"NotLiquidatable","type":"error"},{"inputs":[],"name":"Paused","type":"error"},{"inputs":[],"name":"SupplyCapExceeded","type":"error"},{"inputs":[],"name":"TimestampTooLarge","type":"error"},{"inputs":[],"name":"TooManyAssets","type":"error"},{"inputs":[],"name":"TooMuchSlippage","type":"error"},{"inputs":[],"name":"TransferInFailed","type":"error"},{"inputs":[],"name":"TransferOutFailed","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"absorber","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateralAbsorbed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdValue","type":"uint256"}],"name":"AbsorbCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"absorber","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"basePaidOut","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdValue","type":"uint256"}],"name":"AbsorbDebt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralAmount","type":"uint256"}],"name":"BuyCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"supplyPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"transferPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"withdrawPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"absorbPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"buyPaused","type":"bool"}],"name":"PauseAction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SupplyCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawReserves","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"absorber","type":"address"},{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"absorb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"accrueAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveThis","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseBorrowMin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseMinForRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseScale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenPriceFeed","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTrackingBorrowSpeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTrackingSupplySpeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowKink","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateSlopeHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateSlopeLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"buyCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"extensionDelegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"getAssetInfo","outputs":[{"components":[{"internalType":"uint8","name":"offset","type":"uint8"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint64","name":"scale","type":"uint64"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometCore.AssetInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getAssetInfoByAddress","outputs":[{"components":[{"internalType":"uint8","name":"offset","type":"uint8"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint64","name":"scale","type":"uint64"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometCore.AssetInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"utilization","type":"uint256"}],"name":"getBorrowRate","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getCollateralReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"priceFeed","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"utilization","type":"uint256"}],"name":"getSupplyRate","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"manager","type":"address"}],"name":"hasPermission","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initializeStorage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAbsorbPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isBorrowCollateralized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isBuyPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isLiquidatable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSupplyPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isTransferPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isWithdrawPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidatorPoints","outputs":[{"internalType":"uint32","name":"numAbsorbs","type":"uint32"},{"internalType":"uint64","name":"numAbsorbed","type":"uint64"},{"internalType":"uint128","name":"approxSpend","type":"uint128"},{"internalType":"uint32","name":"_reserved","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numAssets","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"supplyPaused","type":"bool"},{"internalType":"bool","name":"transferPaused","type":"bool"},{"internalType":"bool","name":"withdrawPaused","type":"bool"},{"internalType":"bool","name":"absorbPaused","type":"bool"},{"internalType":"bool","name":"buyPaused","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pauseGuardian","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"baseAmount","type":"uint256"}],"name":"quoteCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"storeFrontPriceFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplyKink","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateSlopeHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateSlopeLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"targetReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalsCollateral","outputs":[{"internalType":"uint128","name":"totalSupplyAsset","type":"uint128"},{"internalType":"uint128","name":"_reserved","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trackingIndexScale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAssetFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBasic","outputs":[{"internalType":"int104","name":"principal","type":"int104"},{"internalType":"uint64","name":"baseTrackingIndex","type":"uint64"},{"internalType":"uint64","name":"baseTrackingAccrued","type":"uint64"},{"internalType":"uint16","name":"assetsIn","type":"uint16"},{"internalType":"uint8","name":"_reserved","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userCollateral","outputs":[{"internalType":"uint128","name":"balance","type":"uint128"},{"internalType":"uint128","name":"_reserved","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawReserves","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTo","outputs":[],"stateMutability":"nonpayable","type":"function"}]

      const cTokenContract = new ethers.Contract(cTokenContractAddress, cTokenAbiJson, wallet);

      // Sepolia USDC Contract for the underlying token https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f
      const underlyingContractAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
      const erc20AbiJson = [{ "inputs": [{ "internalType": "uint256", "name": "chainId_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": true, "inputs": [{ "indexed": true, "internalType": "bytes4", "name": "sig", "type": "bytes4" }, { "indexed": true, "internalType": "address", "name": "usr", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "arg1", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "arg2", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "LogNote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "deny", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "move", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "allowed", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "pull", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "usr", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "push", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }], "name": "rely", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "wards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
      const underlyingContract = new ethers.Contract(underlyingContractAddress, erc20AbiJson, wallet);

      const assetName = 'USDC'; // for the log output lines
      const underlyingDecimals = 6; // Number of decimals defined in this ERC20 token's contract

      console.log('aqui voy 3')
      //const main = async function () {
      // See how many underlying ERC-20 tokens are in my wallet before we supply
      const tokenBalance = Number(await underlyingContract.balanceOf(myWalletAddress)) / 1e6;
      //.callStatic.balanceOf(myWalletAddress) / 1e6;
      console.log(`My wallet's ${assetName} Token Balance:`, tokenBalance);

      // 10 tokens
      const underlyingTokensToSupply = 10 * Math.pow(10, underlyingDecimals);

      // Tell the contract to allow 10 tokens to be taken by the cToken contract
      let tx = await underlyingContract.approve(
        cTokenContractAddress, underlyingTokensToSupply.toString()
      );
      await tx.wait(1); // wait until the transaction has 1 confirmation on the blockchain

      console.log(`${assetName} contract "Approve" operation successful.`);
      console.log(`Supplying ${assetName} to the Compound Protocol...`, '\n');

      // Mint cTokens by supplying underlying tokens to the Compound Protocol
      /*
      tx = await cTokenContract.mint(underlyingTokensToSupply.toString(), {
        gasLimit: 5000000,
      });*/
      tx = await cTokenContract.supply(underlyingContractAddress, 1000000, {
        gasLimit: 5000000,
      });
      await tx.wait(1);
      console.log('tx',tx)

      console.log(`c${assetName} "Mint" operation successful.`, '\n');

      /*
      const bal = await cTokenContract.balanceOf(myWalletAddress)
      //.callStatic.balanceOfUnderlying(myWalletAddress);
      const balanceOfUnderlying = +bal / Math.pow(10, underlyingDecimals);

      console.log(`${assetName} supplied to the Compound Protocol:`, balanceOfUnderlying, '\n');

      let cTokenBalance = +(await cTokenContract.balanceOf(myWalletAddress)) / 1e8;
      //.callStatic.balanceOf(myWalletAddress)) / 1e8;
      console.log(`My wallet's c${assetName} Token Balance:`, cTokenBalance);

      let underlyingBalance = await underlyingContract.balanceOf(myWalletAddress)//.callStatic.balanceOf(myWalletAddress);
      underlyingBalance = +underlyingBalance / Math.pow(10, underlyingDecimals);
      console.log(`My wallet's ${assetName} Token Balance:`, underlyingBalance, '\n');

      let erCurrent = await cTokenContract.getFunction('exchangeRateCurrent')
      //.callStatic.exchangeRateCurrent();
      let exchangeRate = +erCurrent / Math.pow(10, 18 + underlyingDecimals - 8);
      console.log(`Current exchange rate from c${assetName} to ${assetName}:`, exchangeRate, '\n');

      console.log(`Redeeming the c${assetName} for ${assetName}...`);

      // redeem (based on cTokens)
      console.log(`Exchanging all c${assetName} based on cToken amount...`, '\n');
      tx = await cTokenContract.redeem(cTokenBalance * 1e8);
      await tx.wait(1); // wait until the transaction has 1 confirmation on the blockchain

      // redeem (based on underlying)
      // console.log(`Exchanging all c${assetName} based on underlying ${assetName} amount...`);
      // let underlyingAmount = balanceOfUnderlying * Math.pow(10, underlyingDecimals);
      // tx = await cTokenContract.redeemUnderlying(underlyingAmount);
      // await tx.wait(1); // wait until the transaction has 1 confirmation on the blockchain

      cTokenBalance = await cTokenContract.getFunction('balanceOf')(myWalletAddress)
      //.callStatic.balanceOf(myWalletAddress);
      cTokenBalance = +cTokenBalance / 1e8;
      console.log(`My wallet's c${assetName} Token Balance:`, cTokenBalance);

      underlyingBalance = await underlyingContract.getFunction('balanceOf')(myWalletAddress)//.callStatic.balanceOf(myWalletAddress);
      underlyingBalance = +underlyingBalance / Math.pow(10, underlyingDecimals);
      console.log(`My wallet's ${assetName} Token Balance:`, underlyingBalance, '\n');

      //////////////////////////////////////////////////
      /*
      const tokenInfo = await getToken(chainId, tokenName);
      const tokenAddress = tokenInfo.address;
      const tokenDecimals = tokenInfo.decimals;
 
      const amountWithDecimals = (Number(amount) * 10 ** tokenDecimals).toString();
 
      const tx = await walletClient.sendERC20({
        to: tokenAddress,
        amount: amountWithDecimals,
      });*/
      //const tx222 = '';
      
      return tx;
    },
  }),

  /*
  resolveChainId: tool({
    description: 'Resolve the chain name to chain ID and check if the token is native or ERC20',
    parameters: z.object({
      chainName: z.string().describe('The chain name to resolve'),
      tokenName: z.string().describe('The token name to check if its native or ERC20'),
    }),
    execute: async ({ chainName, tokenName }: { chainName: string, tokenName: string }) => {
      const chainId = getChainIdByName(chainName);
      if (!chainId) {
        throw new Error(`Chain with name ${chainName} not found`);
      }

      const isNative = await isTokenNative(chainName, tokenName);
      console.log(`Chain ID: ${chainId}, Token Name: ${tokenName}, Is Native: ${isNative}`);
      return { chainId, isNative };
    },
  }),
  */

  /*
  getTokenAddress: tool({
    description: 'Get the token address on the provided chain name',
    parameters: z.object({
      chainName: z.string().describe('The chain name to get the token address from'),
      tokenName: z.string().describe('The token name to get the info for'),
    }),
    execute: async ({ chainName, tokenName }: { chainName: string, tokenName: string }) => {
      const chainId = getChainIdByName(chainName);
      if (chainId === undefined) {
        throw new Error(`Chain with name ${chainName} not found`);
      }
      const quote = await getToken(chainId, tokenName);
      console.log(`Token info: ${JSON.stringify(quote)}`);
      console.log(`Token address: ${quote.address}`);
      return quote.address;
    },
  }),
  */

  /*
  getTokenInformation: tool({
    description: 'Get the token info on the provided chain name',
    parameters: z.object({
      chainName: z.string().describe('The chain name to get the token info from'),
      z.union([z.string(), z.number()]).refine((val): val is ChainKey | ChainId => {
        return typeof val === 'string' || typeof val === 'number';
      }),
      tokenAddress: z.string().describe('The token name to get the info for'),
    }),
    execute: async ({ chainName, tokenAddress }: { chainName: string, tokenAddress: string }) => {
      const chainId = getChainIdByName(chainName);
      if (chainId === undefined) {
        throw new Error(`Chain with name ${chainName} not found`);
      }
      const quote = await getToken(chainId, tokenAddress);
      console.log(`Token info: ${JSON.stringify(quote)}`);
      console.log(`Decimals: ${quote.decimals}`);
      return quote;
    },
  }),
  */

  /*
  getAmountWithDecimals: tool({
    description: 'Get the amount with token decimals',
    parameters: z.object({
      fromAmount: z.string().describe('The amount to get the route for'),
      chainId: z.union([z.string(), z.number()]).refine((val): val is ChainKey | ChainId => {
        return typeof val === 'string' || typeof val === 'number';
      }),
      tokenAddress: z.string().describe('The token name to get the info for'),
    }),
    execute: async ({ chainId, tokenAddress, fromAmount }:
      { chainId: ChainKey | ChainId, tokenAddress: string, fromAmount: string }) => {
      const quote = await getToken(chainId, tokenAddress);
      console.log(quote);
      return (Number(fromAmount) * 10 ** quote.decimals).toString();
    },
  }),
  */

  /*
  getTokenDecimals: tool({
    description: 'Get the token decimals',
    parameters: z.object({
      chainId: z.union([z.string(), z.number()]).refine((val): val is ChainKey | ChainId => {
        return typeof val === 'string' || typeof val === 'number';
      }),
      tokenAddress: z.string().describe('The token name to get the info for'),
    }),
    execute: async ({ chainId, tokenAddress }: { chainId: ChainKey | ChainId, tokenAddress: string }) => {
      const quote = await getToken(chainId, tokenAddress);
      console.log(quote);
      return quote;
    },
  }),
  */

  /*
  quote: tool({
    description: 'Get the quote',
    parameters: z.object({
      fromChain: z.union([z.string(), z.number()]).describe('The chain ID to get the quote from'),
      toChain: z.union([z.string(), z.number()]).describe('The chain ID to get the quote to'),
    }),
    execute: async ({ fromChain, toChain }: { fromChain: string | number, toChain: string | number }) => {
      const quote = await getQuote({
        fromAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        fromChain,
        toChain,
        fromToken: '0x0000000000000000000000000000000000000000',
        toToken: '0x0000000000000000000000000000000000000000',
        fromAmount: '1000000000000000000',
      });
      console.log(quote);
      return quote;
    },
  }),
  */

  /*
  route: tool({
    description: 'Get the route from chainId to chainid fromtokenaddress to totokenaddress from amount and wallet address while calculating the correct decimals for each token',
    parameters: z.object({
      fromChainId: z.number().describe('The chain ID to get the quote from'),
      toChainId: z.number().describe('The chain ID to get the quote to'),
      fromTokenAddress: z.string().describe('The token name to get the route from'),
      toTokenAddress: z.string().describe('The token name to get the route to'),
      fromAmount: z.string().describe('The amount to get the route for'),
      fromAddress: z.string().describe('The address to get the funds from'),
    }),
    execute: async ({ fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount }:
      { fromChainId: number, toChainId: number, fromTokenAddress: string, toTokenAddress: string, fromAmount: string }) => {

      // Fetch the token information to get the decimals
      const fromTokenInfo = await getToken(fromChainId, fromTokenAddress);
      const fromTokenDecimals = fromTokenInfo.decimals;

      // Adjust the fromAmount using the correct decimals
      const adjustedFromAmount = (Number(fromAmount) * 10 ** fromTokenDecimals).toString();

      const quote = await getRoutes({
        fromChainId,
        toChainId,
        fromTokenAddress,
        toTokenAddress,
        fromAmount: adjustedFromAmount,
        fromAddress: myAddress,
        toAddress: myAddress,
      });

      //console.log(quote[0]);

      
      //console.log('type: ',typeof quote);
      if (quote && typeof quote === 'object' && 'routes' in quote && Array.isArray(quote.routes) && quote.routes.length > 0) {
        //console.log(quote[0]);
        console.log('Executing route', quote.routes[0]);
        const route = quote.routes[0];
        
        const executedRoute = await executeRoute(route, {
          // Gets called once the route object gets new updates
          updateRouteHook(route) {
            console.log(route)
          },
        })
        return route
        //return executedRoute;
      } else {
        console.log('Returning the quote', quote);
        return quote;
      }
        
      //return quote;
    },
  }),*/

};


function getChainIdByName(chainName: string): any | undefined {
  const chain = ChainIdMap.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
  return chain ? chain : undefined;
}

function isTokenNative(chainName: string, tokenName: string): boolean {
  const chain = ChainIdMap.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
  if (chain?.symbol.toLowerCase() === tokenName.toLowerCase()) {
    return true;
  }
  return false;
}

// Streaming Chat 
export async function continueTextConversation(messages: CoreMessage[]) {
  //console.log("continueTextConversation", messages);

  const result = await generateText({
    model: openai("gpt-4o-mini") as any,
    tools: tools,
    maxSteps: 10, // Maximum number of tool invocations per request
    messages,
    onStepFinish: (event) => {
      console.log(event.toolResults);
    },
  });

  const stream = createStreamableValue(String(result.text));
  return stream.value;
}

// Gen UIs 
export async function continueConversation(history: Message[]) {
  const stream = createStreamableUI();

  const result = await generateText({
    model: openai("gpt-4o-mini") as any,
    tools: tools,
    maxSteps: 10, // Maximum number of tool invocations per request
    messages: history,
    onStepFinish: (event) => {
      console.log(event.toolResults);
    },
  });

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content:
          result.text,
        display: stream.value,
      },
    ],
  };
}

// Utils
export async function checkAIAvailability() {
  const envVarExists = !!process.env.OPENAI_API_KEY;
  return envVarExists;
}