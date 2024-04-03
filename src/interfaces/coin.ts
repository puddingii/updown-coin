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

export type TUnit = 1 | 3 | 5 | 15 | 10 | 30 | 60 | 240;

export interface IUpbitCoinCandleInfo {
	market: string;
	candle_date_time_utc: string;
	candle_date_time_kst: string;
	opening_price: number;
	high_price: number;
	low_price: number;
	trade_price: number;
	timestamp: number;
	candle_acc_trade_price: number;
	candle_acc_trade_volume: number;
	unit: TUnit;
}

export interface ICoinCandleInfo {
	id: IUpbitCoinCandleInfo['market'];
	price: IUpbitCoinCandleInfo['trade_price'];
	date: IUpbitCoinCandleInfo['candle_date_time_kst'];
	unit: IUpbitCoinCandleInfo['unit'];
}

export interface ICoinInfo {
	id: IUpbitCoinDefaultInfo['market'];
	name: IUpbitCoinDefaultInfo['korean_name'];
}
