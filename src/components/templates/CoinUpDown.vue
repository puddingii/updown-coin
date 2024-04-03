<template>
	<div
		class="full-width row wrap justify-center items-center content-center coin-up-down-main"
	>
		<div class="col-4 self-center history-section">
			<coin-history-table :history-list="history"></coin-history-table>
		</div>
		<div class="col-8 self-center user-section">
			<coin-up-down-card :user-coin-info="userCoinInfo"></coin-up-down-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoinHistoryTable from 'components/organisms/CoinHistoryTable.vue';
import CoinUpDownCard from 'components/organisms/CoinUpDownCard.vue';
import { ICoinCandleInfo } from '@interfaces/coin';
import { IUserScore } from '@interfaces/user';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
	userScore: IUserScore;
	history: ICoinCandleInfo[];
	id: string;
}

defineOptions({
	name: 'CoinUpDown',
});

const { id, userScore, history } = defineProps<ICoinUpDownCard>();
const userCoinInfo = computed(() => ({ ...userScore, id }));
</script>

<style lang="sass" scoped>
.coin-up-down-main
	height: 100%
.history-section
	overflow: auto
	min-height: 100%
	max-height: 100%
.user-section
	overflow: auto
</style>
