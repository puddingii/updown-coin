<template>
	<q-card-actions align="center" class="row" :class="cardAdditionalClass">
		<q-btn
			@click="onClickUp"
			class="click-btn bg-secondary col-4"
			text-color="white"
			flat
			:disable="userSelectInfo.decide || isActive('up')"
			>Up</q-btn
		>
		<q-btn
			@click="onClickDown"
			class="click-btn bg-negative col-4"
			text-color="white"
			:disable="userSelectInfo.decide || isActive('down')"
			flat
			>Down</q-btn
		>
		<q-btn
			@click="onClickDecide"
			class="click-btn bg-primary col-4"
			text-color="white"
			:disable="userSelectInfo.decide"
			flat
			>결정!</q-btn
		>
	</q-card-actions>
</template>

<script setup lang="ts">
export interface IUpDownButtonProps {
	cardAdditionalClass?: string;
	onClickUp: () => void;
	onClickDown: () => void;
	onClickDecide: () => void;
	userSelectInfo: {
		select: 'up' | 'down' | 'none';
		decide: boolean;
	};
}

defineOptions({
	name: 'UpDownButton',
});

const props = defineProps<IUpDownButtonProps>();

const isActive = (select: IUpDownButtonProps['userSelectInfo']['select']) => {
	return props.userSelectInfo.select === select;
};
</script>
<style lang="sass" scoped>
.click-btn
	width:100px
</style>
