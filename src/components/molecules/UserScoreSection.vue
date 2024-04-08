<template>
	<q-card-section :class="additionalClass">
		<div class="text-h6">{{ id }}</div>
		<div class>최대 콤보: {{ currentHistory.maxCombo }}</div>
		<div class>맞춤: {{ currentHistory.success }}</div>
		<div class>틀림: {{ currentHistory.fail }}</div>
	</q-card-section>
</template>

<script setup lang="ts">
export interface IUserScoreSection {
	additionalClass?: string;
	id: string;
	currentHistory: {
		success: number;
		fail: number;
		maxCombo: number;
	};
}

defineOptions({
	name: 'UserScoreSection',
});

defineProps<IUserScoreSection>();
</script>
