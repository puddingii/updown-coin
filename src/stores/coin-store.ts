import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import dayjs from 'dayjs';

import { api } from 'src/boot/axios';
import {
	ICoinCandleInfo,
	IUpbitCoinCandleInfo,
	IUpbitCoinDetailInfo,
	TUnit,
} from '@interfaces/coin';

const KEY = 'coin';

export const useCoinStore = defineStore(KEY, {
	state: () => ({
		infoList: useStorage(
			`${KEY}-info-list`,
			[] as IUpbitCoinDetailInfo[],
			localStorage,
			{
				mergeDefaults: true,
			}
		),
		candleList: useStorage(
			`${KEY}-candle-list`,
			[] as IUpbitCoinCandleInfo[],
			localStorage,
			{
				mergeDefaults: true,
			}
		),
	}),
	getters: {
		coinList: (state) =>
			state.infoList.map((coin) => ({
				id: coin.market,
				name: coin.korean_name,
			})),
		detailCoinList: (state) =>
			state.infoList.map((coin) => ({
				id: coin.market,
				name: coin.korean_name,
				event: coin.market_event,
			})),
		priceHistoryList: (state) =>
			state.candleList.map(
				(candle) =>
					({
						date: dayjs(candle.candle_date_time_kst).format(
							'YYYY-MM-DD HH:mm:ss'
						),
						id: candle.market,
						price: candle.trade_price,
						unit: candle.unit,
					} as ICoinCandleInfo)
			),
	},
	actions: {
		async updateCoinList() {
			try {
				const response = await api.get<IUpbitCoinDetailInfo[]>(
					'/v1/market/all?isDetails=true'
				);

				this.infoList = response.data;
			} catch (error) {
				console.error(error);
			}
		},
		async updateCoinCandleList(
			id: string,
			options?: { unit?: TUnit; count?: number }
		) {
			try {
				const count = options?.count ?? 10;
				const unit = options?.unit ?? 1;
				const response = await api.get<IUpbitCoinCandleInfo[]>(
					`/v1/candles/minutes/${unit}?market=${id}&count=${count}`
				);

				this.candleList = response.data;
			} catch (error) {
				console.error(error);
			}
		},
		async addCoinCandle(id: string, unit?: TUnit) {
			try {
				const response = await api.get<IUpbitCoinCandleInfo[]>(
					`/v1/candles/minutes/${unit ?? 1}?market=${id}&count=1`
				);

				const updatedList = [...this.candleList];
				updatedList.pop();
				updatedList.unshift(...response.data);
				this.candleList = updatedList;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
