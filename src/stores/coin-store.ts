import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import dayjs from 'dayjs';

import { api } from 'src/boot/axios';
import { formatURLParams } from 'src/util/formatURLParams';
import { ICoinCandleInfo, IUpbitCoinCandleInfo, TUnit } from '@interfaces/coin';

const KEY = 'coin';

export const useCoinStore = defineStore(KEY, {
	state: () => ({
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
		priceHistoryList: (state) =>
			state.candleList.map(
				(candle) =>
					({
						date: dayjs(candle.timestamp).format('YYYY-MM-DD HH:mm:ss'),
						id: candle.market,
						price: candle.trade_price,
						unit: candle.unit,
					} as ICoinCandleInfo)
			),
	},
	actions: {
		async updateCoinCandleList(
			id: string,
			options?: { unit?: TUnit; count?: number }
		) {
			try {
				const unit = options?.unit ?? 1;
				const queryInfo = {
					count: options?.count ?? 10,
					market: id,
					to: new Date().toISOString(),
				};
				const response = await api.get<IUpbitCoinCandleInfo[]>(
					`/v1/candles/minutes/${unit}?${formatURLParams(queryInfo)}`
				);

				this.candleList = response.data;
			} catch (error) {
				console.error(error);
			}
		},
		async addCoinCandle(id: string, unit?: TUnit) {
			try {
				const queryInfo = {
					count: 1,
					market: id,
					to: new Date().toISOString(),
				};
				const response = await api.get<IUpbitCoinCandleInfo[]>(
					`/v1/candles/minutes/${unit ?? 1}?${formatURLParams(queryInfo)}`
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
