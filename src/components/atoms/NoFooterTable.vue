<template>
	<q-table
		flat
		bordered
		:title="title"
		:rows="rows"
		:columns="columns"
		:row-key="rowKey"
		hide-bottom
		:pagination="{ rowsPerPage: 0 }"
	/>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';

export interface INoFooterTableProps {
	title: string;
	columns: Exclude<QTableProps['columns'], undefined>;
	rows: QTableProps['rows'];
	rowKey: QTableProps['rowKey'];
}

defineOptions({
	name: 'NoFooterTable',
});

withDefaults(defineProps<INoFooterTableProps>(), {
	columns: () => [] as INoFooterTableProps['columns'],
	rowKey: '',
	rows: () => [] as INoFooterTableProps['rows'],
});
</script>
