<template>
	<q-card-actions align="around" :class="cardAdditionalClass">
		<q-btn @click="onClickUp" flat>Up</q-btn>
		<q-btn @click="onClickDown" flat>Down</q-btn>
	</q-card-actions>
</template>

<script setup lang="ts">
export interface IUpDownButtonProps {
	cardAdditionalClass?: string;
	onClickUp: () => void;
	onClickDown: () => void;
}

defineOptions({
	name: 'UpDownButton',
});

const { onClickDown, onClickUp, cardAdditionalClass } =
	defineProps<IUpDownButtonProps>();
</script>
<style lang="sass" scoped>
.my-card
	min-width: 100px
	max-width: 250px
	min-height: 100px
</style>
