<template>
	<CoinUpDown
		:key="JSON.stringify(priceHistoryList)"
		:id="currentId"
		:history="priceHistoryList"
		:userScore="userScore"
	/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import CoinUpDown from 'components/templates/CoinUpDown.vue';
import { useCoinStore } from '../stores/coin-store';
import { useUserStore } from '../stores/user-store';

defineOptions({
	name: 'CoinPage',
});

const route = useRoute();
const currentId = ref<string>(route.params.id as string);

const coinStore = useCoinStore();
const userStore = useUserStore();

const userScore = computed(() => userStore.getCurrentHistory(currentId.value));
const priceHistoryList = computed(() => coinStore.priceHistoryList);

coinStore.updateCoinCandleList(currentId.value);

onBeforeRouteUpdate(async (route) => {
	const newId = route.params.id as string;
	await coinStore.updateCoinCandleList(newId);
	currentId.value = newId;
});
</script>
