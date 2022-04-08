import type { PoolInfo } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/types/types';

export const pools: PoolInfo[] = [
	{
		pid: 1,
		tokenName: 'USDC',
		tokenAddr: getContractAddress(Token.USDC),
		tokenImagePath: '/icons/usdc.svg'
	},
	{
		pid: 2,
		tokenName: 'DAI',
		tokenAddr: getContractAddress(Token.DAI),
		tokenImagePath: '/icons/dai.svg'
	},
	{
		pid: 3,
		tokenName: 'WBTC',
		tokenAddr: getContractAddress(Token.WBTC),
		tokenImagePath: '/icons/wbtc.svg'
	},
	{
		pid: 4,
		tokenName: 'WETH',
		tokenAddr: getContractAddress(Token.WETH),
		tokenImagePath: '/icons/weth.svg'
	},
	{
		pid: 5,
		tokenName: 'WMATIC',
		tokenAddr: getContractAddress(Token.WMATIC),
		tokenImagePath: '/icons/wmatic.svg'
	},
	{
		pid: 6,
		tokenName: 'LINK',
		tokenAddr: getContractAddress(Token.LINK),
		tokenImagePath: '/icons/link.svg'
	},
	{
		pid: 7,
		tokenName: 'CRYSTL',
		tokenAddr: getContractAddress(Token.CRYSTL),
		tokenImagePath: '/icons/crystl.webp'
	},
	{
		pid: 8,
		tokenName: 'POLYDOGE',
		tokenAddr: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
		tokenImagePath: '/icons/polydoge.webp'
	}
];
