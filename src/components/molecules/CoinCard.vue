<template>
	<q-card
		v-ripple
		@click="() => onClickCard && onClickCard(id)"
		class="my-card cursor-pointer"
		:class="cardAdditionalClass"
	>
		<q-card-section>
			<div class="text-h6">{{ id }}</div>
			<div class="text-subtitle2">{{ name }}</div>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
import { ICoinInfo } from '@interfaces/coin';

export interface ICoinCardProps extends ICoinInfo {
	cardAdditionalClass?: string;
	onClickCard?: (id: string) => void | Promise<void>;
}

defineOptions({
	name: 'CoinCard',
});

withDefaults(defineProps<ICoinCardProps>(), {
	id: 'Loading...',
	name: 'Loading...',
});
</script>

<style lang="sass" scoped>
.my-card
	min-width: 100px
	max-width: 250px
	min-height: 100px
</style>
