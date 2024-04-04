import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';

import { IUser, IUserScore, TUserHistory } from '@interfaces/user';

const KEY = 'user';

export const useUserStore = defineStore(KEY, {
	state: () => ({
		userInfo: useStorage(
			`${KEY}-user-info`,
			{ nickname: '' } as IUser,
			localStorage,
			{
				mergeDefaults: true,
			}
		),
		defaultCoinScore: {
			combo: 0,
			fail: 0,
			success: 0,
		} as IUserScore,
		coinScore: useStorage(
			`${KEY}-coin-score`,
			{ 'KRW-ETH': { combo: 0, fail: 2, success: 5 } } as TUserHistory,
			localStorage,
			{
				mergeDefaults: true,
			}
		),
	}),
	getters: {
		currentHistory: (state) => {
			const route = useRoute();
			const id =
				typeof route.params.id === 'string'
					? route.params.id
					: route.params.id[0];

			return state.coinScore[id] || state.defaultCoinScore;
		},
	},
	actions: {
		updateCoinScore(id: string, cnt: number) {
			const score = this.coinScore[id] || this.defaultCoinScore;
			if (cnt > 0) {
				score.success += 1;
				score.combo += 1;
			} else {
				score.fail += 1;
				score.combo = 0;
			}

			this.coinScore[id] = { ...score };
		},
	},
	debounce: {},
});
