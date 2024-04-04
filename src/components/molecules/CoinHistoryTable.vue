<template>
	<div class="q-pa-md">
		<no-footer-table
			title="거래 현황"
			:columns="columnList"
			:rows="rowList"
			:row-key="rowKey"
		></no-footer-table>
	</div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import NoFooterTable from 'components/atoms/NoFooterTable.vue';
import { useCoinStore } from 'src/stores/coin-store';
import { formatKRNumber } from 'src/util/formatNumber';
import { ICoinCandleInfo } from '@interfaces/coin';

defineOptions({
	name: 'CoinHistoryTable',
});

const coinStore = useCoinStore();
const { priceHistoryList } = storeToRefs(coinStore);

const rowKey = 'date';
const columnList = [
	{ name: 'date', align: 'center', label: '날짜', field: (row) => row.date },
	{
		name: 'price',
		label: '거래 가격',
		align: 'left',
		field: (row) => row.price,
		format: (price: number) => formatKRNumber(price),
	},
] as QTableColumn<ICoinCandleInfo>[];
const rowList = computed(() =>
	priceHistoryList.value.map((history) => ({
		price: history.price,
		date: history.date,
	}))
);
</script>
