<template>
	<div class="q-pa-md q-gutter-md">
		<q-chip
			v-for="(info, idx) in list"
			:key="idx"
			:color="info.color"
			:text-color="info.textColor"
			:icon="info.icon"
			:icon-right="info.iconRight"
		>
			{{ info.text }}
		</q-chip>
	</div>
</template>

<script setup lang="ts">
export interface IChipList {
	cardAdditionalClass?: string;
	list: {
		color: string;
		textColor: string;
		text: string;
		icon?: string;
		iconRight?: string;
	}[];
}

defineOptions({
	name: 'ChipList',
});

defineProps<IChipList>();
</script>
