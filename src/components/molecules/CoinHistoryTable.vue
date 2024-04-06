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
import NoFooterTable from 'components/atoms/NoFooterTable.vue';
import { formatKRNumber } from 'src/util/formatNumber';
import { ICoinCandleInfo } from '@interfaces/coin';

type TRowInfo = { price: number; date: string; id: number };
export interface ICoinHistoryTable {
	rowList: TRowInfo[];
	rowKey: keyof TRowInfo;
}

defineOptions({
	name: 'CoinHistoryTable',
});

defineProps<ICoinHistoryTable>();

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
</script>
