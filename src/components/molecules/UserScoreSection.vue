<template>
	<q-card-section :class="additionalClass">
		<div class="text-h6">{{ id }}</div>
		<div class>Combo: {{ combo }}</div>
		<div class>맞춤: {{ currentHistory.success }}</div>
		<div class>틀림: {{ currentHistory.fail }}</div>
	</q-card-section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user-store';

export interface IUserScoreSection {
	additionalClass?: string;
}

defineOptions({
	name: 'UserScoreSection',
});

defineProps<IUserScoreSection>();

const route = useRoute();
const id = computed(() => route.params.id as string);

const userStore = useUserStore();
const { currentHistory } = storeToRefs(userStore);
const combo = computed(() => currentHistory.value.comboList?.length ?? 0);
</script>
