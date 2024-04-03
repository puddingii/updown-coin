<template>
	<q-table
		flat
		bordered
		:rows="rows"
		:columns="columns"
		:row-key="rowKey"
		hide-bottom
	/>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';

export interface INoFooterTableProps {
	columns: Exclude<QTableProps['columns'], undefined>;
	rows: QTableProps['rows'];
	rowKey: QTableProps['rowKey'];
}

defineOptions({
	name: 'NoFooterTable',
});

const { rows, columns, rowKey } = withDefaults(
	defineProps<INoFooterTableProps>(),
	{
		columns: () => [] as INoFooterTableProps['columns'],
		rowKey: '',
		rows: () => [] as INoFooterTableProps['rows'],
	}
);
</script>
