<template>
	<coin-up-down
		:id="currentId"
		:user-score="userScore.currentHistory"
		:price-history-list="coinStore.priceHistoryList"
	></coin-up-down>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import CoinUpDown from 'components/templates/CoinUpDown.vue';
import { useCoinStore } from 'src/stores/coin-store';
import { useUserStore } from 'src/stores/user-store';
import { useTimer } from 'src/hooks/useTimer';

defineOptions({
	name: 'CoinPage',
});

const route = useRoute();
const currentId = computed(() => route.params.id as string);

const userScore = useUserStore();

const coinStore = useCoinStore();
coinStore.updateCoinCandleList(currentId.value);
const timer = useTimer({
	tick: 10,
	key: 'COIN_UPDATE_TIMER',
	onTick: () => {
		coinStore.addCoinCandle(currentId.value);
	},
});

onMounted(() => {
	timer.infinityStart();
});

onBeforeRouteUpdate(async (route) => {
	timer.infinityStart();
	const newId = route.params.id as string;
	await coinStore.updateCoinCandleList(newId);
});

onBeforeUnmount(() => {
	timer.stop();
});
</script>
