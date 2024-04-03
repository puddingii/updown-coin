<template>
	<q-card-section class="bg-teal text-white" :class="additionalClass">
		<div class="text-h6">{{ id }}</div>
		<div class>Combo: {{ combo }}</div>
		<div class>맞춤: {{ success }}</div>
		<div class>틀림: {{ fail }}</div>
	</q-card-section>
</template>

<script setup lang="ts">
import { ICoinInfo } from '@interfaces/coin';
import { IUserScore } from '@interfaces/user';

export interface IUserScoreSection extends Pick<ICoinInfo, 'id'>, IUserScore {
	additionalClass?: string;
}

defineOptions({
	name: 'UserScoreSection',
});

const { id, additionalClass, combo, fail, success } = withDefaults(
	defineProps<IUserScoreSection>(),
	{
		id: 'Loading...',
		combo: 0,
		fail: 0,
		success: 0,
	}
);
</script>
