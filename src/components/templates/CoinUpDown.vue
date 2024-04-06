<template>
	<div
		class="full-width row wrap justify-center items-center content-center coin-up-down-main"
	>
		<div class="col-4 self-start history-section">
			<coin-history-table
				:row-list="coinHistoryRowList"
				row-key="id"
			></coin-history-table>
		</div>
		<div class="col-8 self-start user-section">
			<coin-up-down-card
				:user-score="userScore"
				:id="id"
				:latest-coin-info="latestCoinInfo"
			></coin-up-down-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoinHistoryTable from 'components/molecules/CoinHistoryTable.vue';
import CoinUpDownCard from 'components/organisms/CoinUpDownCard.vue';
import { ICoinCandleInfo } from '@interfaces/coin';
import { IUserScore } from '@interfaces/user';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
	priceHistoryList: ICoinCandleInfo[];
	userScore: IUserScore;
	id: string;
}

defineOptions({
	name: 'CoinUpDown',
});

const props = defineProps<ICoinUpDownCard>();

const coinHistoryRowList = computed(() =>
	props.priceHistoryList.map((history, idx) => ({
		id: idx,
		price: history.price,
		date: history.date,
	}))
);

const latestCoinInfo = computed(() => {
	return props.priceHistoryList.at(0);
});
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
	min-height: 100%
	max-height: 100%
</style>
