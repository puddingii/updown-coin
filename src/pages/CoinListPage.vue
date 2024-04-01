<template>
	<q-page class="row items-center justify-evenly">
		<coin-select :coin-list="coinList"></coin-select>
	</q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import CoinSelect from 'components/templates/CoinSelect.vue';
import { useCoinStore } from '../stores/coin-store';

defineOptions({
	name: 'CoinListPage',
});

const coinStore = useCoinStore();
const { coinList } = storeToRefs(coinStore);

onMounted(async () => {
	await coinStore.updateCoinList();
});
</script>
