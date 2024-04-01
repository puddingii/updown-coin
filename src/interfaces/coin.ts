export interface IUpbitCoinDefaultInfo {
	market: string;
	korean_name: string;
	english_name: string;
}

export interface IUpbitCoinDetailInfo extends IUpbitCoinDefaultInfo {
	/** Soon deprecated */
	market_warning?: 'NONE' | 'CAUTION';
	market_event: {
		warning: boolean;
		caution: {
			PRICE_FLUCTUATIONS: boolean;
			TRADING_VOLUME_SOARING: boolean;
			DEPOSIT_AMOUNT_SOARING: boolean;
			GLOBAL_PRICE_DIFFERENCES: boolean;
			CONCENTRATION_OF_SMALL_ACCOUNTS: boolean;
		};
	};
}

export interface ICoinInfo {
	id: string;
	name: string;
}
