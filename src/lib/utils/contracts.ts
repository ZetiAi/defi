import MasterChefABI from '$lib/config/abi/MasterChef.json';
import MushTokenABI from '$lib/config/abi/MushToken.json';
import TESTLPABI from '$lib/config/abi/TEST-LP.json';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import pairABI from '$lib/config/abi/IUniswapV2Pair.json';
import routerABI from '$lib/config/abi/IUniswapV2Router02.json';
import factoryABI from '$lib/config/abi/IUniswapV2Factory.json';
import VaultChefABI from '$lib/config/abi/VaultChef.json';
import DividendsABI from '$lib/config/abi/Dividends.json';
import { farms } from '$lib/config/constants/farms';
import addresses from '$lib/config/constants/addresses.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './helpers';

export const getMasterChefContract = () => {
	const masterChefContract = new ethers.Contract(
		getContractAddress(Token.MASTERCHEF),
		MasterChefABI,
		getSigner()
	);
	return masterChefContract;
};

export const getMushTokenContract = () => {
	const mushTokenContract = new ethers.Contract(
		getContractAddress(Token.MUSHTOKEN),
		MushTokenABI,
		getSigner()
	);
	return mushTokenContract;
};

export const getZyberTokenContract = () => {
	const zyberTokenContract = new ethers.Contract(
		getContractAddress(Token.ZYBERTOKEN),
		MushTokenABI,
		getSigner()
	);
	return zyberTokenContract;
};

export const getContractObject = (address: string, abi: any) => {
	const contract = new ethers.Contract(address, abi, getSigner());
	return contract;
};

export const getERC20Contract = (address: string) => {
	const ercToken = new ethers.Contract(address, ERC20ABI, getSigner());
	return ercToken;
};

export const getUniRouterContract = () => {
	const router = new ethers.Contract(getContractAddress(Token.UNIROUTER), routerABI, getSigner());
	return router;
};

export const getUniFactoryContract = () => {
	const factory = new ethers.Contract(
		getContractAddress(Token.UNIFACTORY),
		factoryABI,
		getSigner()
	);
	return factory;
};

export const getUniPair = (address: string) => {
	const unipair = new ethers.Contract(address, pairABI, getSigner());
	return unipair;
};

export const getMushAllowance = async (userAddr: string) => {
	const mushContract = new ethers.Contract(
		getContractAddress(Token.MUSHTOKEN),
		ERC20ABI,
		getSigner()
	);
	return await mushContract.allowance(userAddr, '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506');
};

export const getTokenAllowance = async (tknAddr: string, spenderAddr: string, userAddr: string) => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.allowance(userAddr, spenderAddr);
};

export const approveToken = async (tknAddr: string, spenderAddr: string, userAddr: string) => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.approve(spenderAddr, userAddr);
};

export const isApproved = (allowance: BigNumber): Boolean => {
	return allowance._hex !== ethers.constants.Zero._hex;
};

export const addLiquidityPool = async (
	tokenA: string,
	tokenB: string,
	amountA: BigNumber,
	amountB: BigNumber,
	amountAmin: BigNumber,
	amountBmin: BigNumber,
	to: string,
	deadline: string
) => {
	const router = getUniRouterContract();
	await router.addLiquidity(tokenA, tokenB, amountA, amountB, amountAmin, amountBmin, to, deadline);
};

export const getPoolReserves = async (pairAddr: string): Promise<BigNumber[]> => {
	const pair = getUniPair(pairAddr);
	const { reserve0, reserve1 } = await pair.getReserves();
	return [reserve0, reserve1];
};

export const getTokenPairAddress = async (tkn0Addr: string, tkn1Addr: string) => {
	const factory = getUniFactoryContract();
	return await factory.getPair(tkn0Addr, tkn1Addr);
};

export const getVaultChefContract = () => {
	const vaultChefContract = new ethers.Contract(
		getContractAddress(Token.VAULTCHEF),
		VaultChefABI,
		getSigner()
	);
	return vaultChefContract;
};

export const getMushStrategyContract = () => {
	const dividendsContract = new ethers.Contract(
		getContractAddress(Token.DIVIDENDS),
		DividendsABI,
		getSigner()
	);

	return dividendsContract;
};
