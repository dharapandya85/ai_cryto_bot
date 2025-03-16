import { createViemWalletClient} from '../viem/createViemWalletClient.js';
import {createViemPublicClient} from '../viem/createViemPublicClient.js';
import {ToolConfig} from './allTools.js';

interface DeployErc20Args{
    name:string;
    symbol:string;
    initialSupply?:string;
}
const ERC20_ABI=[] as const;
const ERC20_BYTECODE="0x";

export const deployErc20Tool:ToolConfig<DeployErc20Args>={
    definition:{
        type:'function',
        function:{
            name:'deploy_erc20_token',
            description:'Deploy a new ERC20 token contract',
            parameters:{
                type:'object',
                properties:{
                    name:{
                        type:'string',
                        description:'The name of the token',
                    },
                    symbol:{
                        type:'string',
                        description:'The symbol of the token',
                    },
                    initialSupply:{
                        type:'string',
                        description:'The initial supply of token',
                        optional:true,
                    }
                },
                required:['name','symbol']
            }
        }
    },
    handler:async({name,symbol,initialSupply}:DeployErc20Args)=>{
        try{
            const walletClient=createViemWalletClient();
            const publicClient=createViemPublicClient();

            const supply=BigInt(initialSupply||'10000000000');

            //Deploy the contract
            const hash=await walletClient.deployContract({
                account:walletClient.account,
                abi:ERC20_ABI,
                bytecode:ERC20_BYTECODE,
                args:[name,symbol,supply],
            });
            console.log('Contract deployed with hash:',hash);
            //wait for the transaction to be mined
            const receipt=await publicClient.waitForTransactionReceipt({hash});
            if(!receipt.contractAddress){
                console.error('Contract address not found in transaction receipt')
                throw new Error('Contract address not found in transaction receipt');
            }
            return receipt.contractAddress;
        }catch(error){
            console.error(error);
            throw new Error(
                `Failed to deploy ERC20 contract:$(error )`
            );

        }

        }
    };

