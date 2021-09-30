import { ethers, BigNumber } from 'ethers';

export const parseBigNumberToString = (n: BigNumber): string => {
	const stringNumber = ethers.utils.formatUnits(n, 18);
	return stringNumber;
};

export const parseBigNumberToDecimal = (balance: BigNumber | string) => {
	if (typeof balance == 'string') {
		return balance;
	}
	const stringNumber = ethers.utils.formatUnits(balance, 18);
	const point = stringNumber.indexOf('.');
	const ints = stringNumber.substring(0, point);
	const decimals = stringNumber.substring(point + 1);
	const fivedec = decimals.substring(0, 5);
	return ints + '.' + fivedec;
};
