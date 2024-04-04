<template>
	<div
		class="full-width row wrap justify-center items-center content-center coin-up-down-main"
	>
		<div class="col-4 self-start history-section">
			<coin-history-table></coin-history-table>
		</div>
		<div class="col-8 self-start user-section">
			<coin-up-down-card></coin-up-down-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import CoinHistoryTable from 'components/molecules/CoinHistoryTable.vue';
import CoinUpDownCard from 'components/organisms/CoinUpDownCard.vue';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
}

defineOptions({
	name: 'CoinUpDown',
});

defineProps<ICoinUpDownCard>();
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
