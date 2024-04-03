<template>
	<div class="q-pa-md">
		<no-footer-table
			:columns="columnList"
			:rows="rowList"
			:row-key="rowKey"
		></no-footer-table>
	</div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { computed } from 'vue';
import NoFooterTable from 'components/atoms/NoFooterTable.vue';
import { ICoinCandleInfo } from '@interfaces/coin';

export interface ICoinHistoryTableProps {
	historyList: ICoinCandleInfo[];
}

defineOptions({
	name: 'CoinHistoryTable',
});

const rowKey = 'date';
const columnList = [
	{ name: 'date', align: 'center', label: '날짜', field: (row) => row.date },
	{
		name: 'price',
		label: '거래 가격',
		align: 'left',
		field: (row) => row.price,
		format: (price: number) => new Intl.NumberFormat('ko-KR').format(price),
	},
] as QTableColumn<ICoinCandleInfo>[];
const { historyList } = withDefaults(defineProps<ICoinHistoryTableProps>(), {
	historyList: () => [],
});
const rowList = computed(() =>
	historyList.map((history) => ({ price: history.price, date: history.date }))
);
</script>
