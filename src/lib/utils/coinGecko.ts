type ContractAddress = string;

interface TokenPrice {
	contractAddress: number;
}

export const getTokenPriceUSD = async (
	addr: ContractAddress
): Promise<TokenPrice> => {
	try {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${addr}&vs_currencies=usd`
		);
		const data = response.json();
		return data;
	} catch (error) {
		console.log('Unable to fetch the token price');
	}
};

export const getPoolTokenPriceUSD = async (
	addr: ContractAddress
): Promise<number> => {
	try {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${addr}&vs_currencies=usd`
		);
		const data = await response.json();
		return data[addr.toLocaleLowerCase()].usd;
	} catch {
		console.log('Unable to get token price ');
	}
};
