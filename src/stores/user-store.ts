import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useAlert } from 'src/hooks/useAlert';

import { IUser, IUserScore, TUserHistory, TComboInfo } from '@interfaces/user';

const KEY = 'user';

export const useUserStore = defineStore(KEY, {
	state: () => ({
		userInfo: useStorage(
			`${KEY}-user-info`,
			{ nickname: '', isDark: false } as IUser,
			localStorage,
			{
				mergeDefaults: true,
			}
		),
		defaultCoinScore: {
			fail: 0,
			success: 0,
			comboList: [],
		} as IUserScore,
		coinScore: useStorage(
			`${KEY}-coin-score`,
			{} as TUserHistory,
			localStorage,
			{
				mergeDefaults: true,
			}
		),
	}),
	getters: {
		currentHistory(state): IUserScore {
			const currentId = this.router.currentRoute.value.params.id;
			const id = typeof currentId === 'string' ? currentId : currentId[0];

			return state.coinScore[id] || state.defaultCoinScore;
		},
		isDarkMode: (state) => !!state.userInfo.isDark,
	},
	actions: {
		toggleDark() {
			this.userInfo.isDark = !this.userInfo.isDark;
		},
		updateCoinScore(id: string, cnt: number, comboInfo?: TComboInfo) {
			const alerter = useAlert();
			const score = this.coinScore[id] || this.defaultCoinScore;
			if (cnt > 0 && comboInfo) {
				score.success += 1;
				score.comboList.unshift(comboInfo);
			} else {
				score.fail += 1;
				score.comboList = [];
				alerter.fireFail();
			}

			this.coinScore[id] = { ...score };
		},
	},
	debounce: {},
});
