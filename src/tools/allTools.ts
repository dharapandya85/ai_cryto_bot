import { sendTransaction } from "viem/zksync";
import {getBalanceTool} from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";
import { sendTransactionTool } from "./sendTransactions";
import { deployErc20Tool } from "./deployErc20";

export interface ToolConfig<T=any>{
    definition:{
        type:'function';
        function:{
            name:string;
            description:string;
            parameters:{
                type:'object';
                properties:Record<string,unknown>;
                required:string[];
            };
        };
    };
    handler:(args:T)=>Promise<any>;
}
    export const tools:Record<string,ToolConfig>={
        get_balance: getBalanceTool,
        get_wallet_address:getWalletAddressTool,
        send_transaction:sendTransactionTool,
        deploy_erc20_token:deployErc20Tool
    };
