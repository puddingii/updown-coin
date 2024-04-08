<template>
	<div class="q-pa-md">
		<no-footer-table
			:title="`콤보 히스토리 x${comboCount}`"
			:style="{ height: '350px' }"
			:columns="columnList"
			:rows="comboList"
			:row-key="rowKey"
		></no-footer-table>
	</div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import NoFooterTable from 'components/atoms/NoFooterTable.vue';
import { formatKRNumber } from 'src/util/formatNumber';
import { TComboInfo } from '@interfaces/user';
import { computed } from 'vue';

export interface IUserComboTable {
	comboList: TComboInfo[];
}

defineOptions({
	name: 'UserComboTable',
});

const props = defineProps<IUserComboTable>();

const comboCount = computed(() => props.comboList.length);
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
