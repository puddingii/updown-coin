import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { api } from 'src/boot/axios';
import { IUpbitCoinDetailInfo } from '@interfaces/coin';

const KEY = 'coin';

export const useCoinStore = defineStore(KEY, {
	state: () => ({
		list: useStorage(KEY, [] as IUpbitCoinDetailInfo[], localStorage, {
			mergeDefaults: true,
		}),
	}),
	getters: {
		coinList: (state) =>
			state.list.map((coin) => ({
				id: coin.market,
				name: coin.korean_name,
			})),
		detailCoinList: (state) =>
			state.list.map((coin) => ({
				id: coin.market,
				name: coin.korean_name,
				event: coin.market_event,
			})),
	},
	actions: {
		async updateCoinList() {
			try {
				const response = await api.get<IUpbitCoinDetailInfo[]>(
					'/v1/market/all?isDetails=true'
				);

				this.list = response.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
	debounce: {
		updateCoinList: 300,
	},
});
