import { ethers, BigNumber } from 'ethers';
import UNIV2ABI from '$lib/config/abi/IUniswapV2Pair.json';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import { Provider } from './web3Helpers';
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/ts/types';
import { tokenPrice } from '$lib/stores/NativeTokenPrice';
import { MUSHSYMBOL } from '$lib/config';
import { getTokenPriceUSD } from './coinGecko';

let mushTokenPriceUSD = 0;

tokenPrice.subscribe((tokenPrice) => {
	mushTokenPriceUSD = tokenPrice;
});

const getTokenContract = (address: string) => {
	return new ethers.Contract(address, ERC20ABI, Provider.getProviderSingleton());
};

export const getUniPairTokenContract = (address: string) => {
	return new ethers.Contract(address, UNIV2ABI, Provider.getProviderSingleton());
};

export const getPriceOfMushPair = async (address: string) => {
	const mushAddress = getContractAddress(Token.MUSHTOKEN);
	const pairContract = getUniPairTokenContract(address);
	const totalSupply = await pairContract.totalSupply();
	const tokenAddresses = await getTokensFromPair(address);
	const reserves = await pairContract.getReserves();

	const token0 = {
		address: tokenAddresses[0],
		reserve: reserves[0],
		...(await getTokenInformation(tokenAddresses[0]))
	};
	const token1 = {
		address: tokenAddresses[1],
		reserve: reserves[1],
		...(await getTokenInformation(tokenAddresses[1]))
	};

	const mushToken = token0.address == mushAddress ? token0 : token1;

	const mushReserveNumber = parseFloat(ethers.utils.formatEther(mushToken.reserve));
	const totalValueOfLiquidityPool = mushReserveNumber * mushTokenPriceUSD * 2;
	const totalSupplyNumber = totalSupply / 1e18;
	const oneLpTokenPrice = totalValueOfLiquidityPool / totalSupplyNumber;
	return oneLpTokenPrice;
};

export const getTokenInformation = async (tokenAdress: string) => {
	const tokenContract = getTokenContract(tokenAdress);
	const decimals = tokenContract.decimals();
	const symbol = tokenContract.name();
	const tokenInfo = await Promise.all([decimals, symbol]);
	return { tokenDecimals: tokenInfo[0], tokenSymbol: tokenInfo[1] };
};

export const getTokensFromPair = async (pairAddress) => {
	const pairContract = getUniPairTokenContract(pairAddress);
	const tkn0 = pairContract.token0();
	const tkn1 = pairContract.token1();
	return Promise.all([tkn0, tkn1]);
};
