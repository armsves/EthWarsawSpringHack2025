'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
//import { Weather } from '@/components/weather';
import { generateText } from 'ai';
import { createStreamableUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';

import readline from "node:readline";
import { http, createWalletClient, parseEther, GetBalanceParameters, erc20Abi, createPublicClient, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantleSepoliaTestnet } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
//import { Token, erc20 } from "@goat-sdk/plugin-erc20";
//import { erc4626, Vault } from "@goat-sdk/plugin-erc4626";
//import { erc4626, Vault } from "../erc4626";
//import { sendETH } from "@goat-sdk/wallet-evm";
//import { viem } from "@goat-sdk/wallet-viem";
//import { ChainKey, createConfig, EVM } from '@lifi/sdk'
//import { ChainId, getQuote } from '@lifi/sdk'
//import { executeRoute, getRoutes, getToken } from '@lifi/sdk'

import { arbitrum, mainnet, mantle, optimism, polygon, Chain, bsc } from 'viem/chains'

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const myAddress = account.address;
const chains: Chain[] = [arbitrum, mainnet, optimism, polygon, mantle, bsc];

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: mantle,
  transport: http()
})

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

  /*
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
      
      const chains: Chain[] = [arbitrum, mainnet, optimism, polygon, mantle, bsc, avalanche];
  
      
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
  */

  /*
  getBalanceofToken: tool({
    description: 'Get the balance of the token if it is not native and is an ERC20 token on the provided chain',
    parameters: z.object({
      chainName: z.string().describe('The chain name to get the balance from'),
      tokenName: z.string().describe('The token name to get the info for but first needs to get the token address of the chain with the right number of decimals'),
      walletAddress: z.string().describe('The wallet address to get the balance for'),
    }),
    execute: async ({ chainName, tokenName, walletAddress }: { chainName: string, tokenName: string, walletAddress: string }) => {
      const chainId = getChainIdByName(chainName);

      if (chainId === undefined) {
        throw new Error(`Chain with name ${chainName} not found`);
      }

      const chain = chains.find((chain) => chain.id === Number(chainId));
      if (!chain) {
        throw new Error(`Chain with ID ${chainId} not found`);
      }

      const publicClient = createPublicClient({
        chain,
        transport: http()
      });

      // Retrieve the token address and decimals
      const tokenInfo = await getToken(chainId, tokenName);
      const tokenAddress = tokenInfo.address;
      const tokenDecimals = tokenInfo.decimals;

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
  */

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


function getChainIdByName(chainName: string): number | undefined {
  const chain = ChainIdMap.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
  return chain ? chain.id : undefined;
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