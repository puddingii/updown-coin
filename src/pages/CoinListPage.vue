<template>
	<q-page class="row items-center justify-evenly">
		<coin-select :coin-list="coinList"></coin-select>
	</q-page>
</template>

<script setup lang="ts">
import CoinSelect from 'components/templates/CoinSelect.vue';
import { useUpdateCoinListQuery } from '../queries/upbit/query';
import { computed } from 'vue';

defineOptions({
	name: 'CoinListPage',
});

const { data } = useUpdateCoinListQuery({
	isDetails: true,
});
const coinList = computed(() =>
	(data.value ?? []).map((coin) => ({
		id: coin.market,
		name: coin.korean_name,
	}))
);
</script>
