<template>
	<q-table
		flat
		bordered
		hide-bottom
		class="no-footer-table"
		:style="style"
		:title="title"
		:rows="rows"
		:columns="columns"
		:row-key="rowKey"
		:pagination="{ rowsPerPage: 0 }"
	/>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';

export interface INoFooterTableProps {
	style?: Record<string, string | boolean>;
	title: string;
	columns: Exclude<QTableProps['columns'], undefined>;
	rows: QTableProps['rows'];
	rowKey: QTableProps['rowKey'];
}

defineOptions({
	name: 'NoFooterTable',
});

defineProps<INoFooterTableProps>();
</script>
