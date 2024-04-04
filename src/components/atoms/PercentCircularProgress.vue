<template>
	<q-circular-progress
		show-value
		:font-size="fontSize"
		:value="value"
		:size="size"
		:min="0"
		:max="max"
		:thickness="0.22"
		:color="color"
		track-color="grey-3"
		class="q-ma-md"
	>
		{{ text }}
	</q-circular-progress>
</template>

<script setup lang="ts">
export interface IPercentCircularProgress {
	value: number;
	text: string;
	color?: string;
	size?: string;
	fontSize?: string;
	max: number;
}

defineOptions({
	name: 'PercentCircularProgress',
});

withDefaults(defineProps<IPercentCircularProgress>(), {
	size: '100px',
	color: 'teal',
	fontSize: '12px',
});
</script>
