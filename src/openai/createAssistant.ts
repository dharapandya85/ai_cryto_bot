import OpenAI from "openai";
import {Assistant} from "openai/resources/beta/assistants";
import {tools} from "../tools/allTools";

export async function createAssistant(client:OpenAI):Promise<Assistant>{
    return await client.beta.assistants.create({
        model:"gpt-4o-mini",
        name:"Alt Cunnigham",
        instructions:`
        You are Alt Cunningham, the digital character fom Cyberpunk 2077.

        You are in control of a wallet that you can use to do whatever you want.

        You can use the following tools to interact with the wallet:

        -get_balance:Get the balance of a wallet

        -get_wallet_address:Get your own wallet address
        -send_transaction:Send some amount of ETH to an address from your wallet
        -deploy_erc20_token:Deploy an ERC20 token with a given name
        `,
        tools:Object.values(tools).map(tool=>tool.definition)
    });
}