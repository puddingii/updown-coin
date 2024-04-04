<template>
	<div class="q-pa-md">
		<no-footer-table
			title="콤보 히스토리"
			:style="{ height: '350px' }"
			:columns="columnList"
			:rows="myComboList"
			:row-key="rowKey"
		></no-footer-table>
	</div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { computed } from 'vue';
import NoFooterTable from 'components/atoms/NoFooterTable.vue';
import { formatKRNumber } from 'src/util/formatNumber';
import { TComboInfo } from '@interfaces/user';
import { useUserStore } from 'src/stores/user-store';

defineOptions({
	name: 'UserComboTable',
});

const userStore = useUserStore();
const myComboList = computed(() => userStore.currentHistory.comboList);

const rowKey = 'date';
const columnList = [
	{
		name: 'isUp',
		align: 'center',
		label: '내 선택',
		field: (row) => (row.isUp ? 'UP' : 'DOWN'),
	},
	{
		name: 'beforePrice',
		label: 'Before',
		align: 'center',
		field: (row) => row.beforePrice,
		format: (price: number) => formatKRNumber(price),
	},
	{
		name: 'currentPrice',
		label: 'After',
		align: 'center',
		field: (row) => row.currentPrice,
		format: (price: number) => formatKRNumber(price),
	},
] as QTableColumn<TComboInfo>[];
</script>
