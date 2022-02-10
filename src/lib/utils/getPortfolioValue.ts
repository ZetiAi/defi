import { ethers } from "ethers";
import { getMasterChefAddress } from "./addressHelpers";

interface TokenBalancesResponse{
    address:string,
    updated_at: string,
    next_update_at: string,
    quote_currency:string,
    chain_id: number,
    items: Array<ERC20MetaData>
}

interface ERC20MetaData {
    contract_decimals: number,
    contract_name:string,
    contract_address:string,
    supports_erc20:Array<string>,
    logo_url:string,
    last_transferred_at:string,
    type:string,
    balance:string,
    balance_24h:string,
    quote_rate:number,
    quote_rate_24h:number,
    quote:number,
    quote_24h: number,
    nft_data: string
}

export const getPortfolioValue = async(address: string):Promise<number> => {
const APIURL = `https://api.covalenthq.com/v1/137/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_eb736567482640818e2a7b34eb5`
try{
    const response = await fetch(APIURL);
    const {data} = await response.json();
    const dataReponse:TokenBalancesResponse = data;
    const {items} = dataReponse;
    return items.map(tokenData => 
        tokenData.quote_rate == 0 ? 0 :  parseFloat(ethers.utils.formatUnits(tokenData.balance,tokenData.contract_decimals)) * tokenData.quote_rate).reduce((prev,current)=>prev+current);
}catch{
    return 0
}
}


export const getPoolsTVL = async():Promise<number> =>{
return getPortfolioValue(getMasterChefAddress())
}