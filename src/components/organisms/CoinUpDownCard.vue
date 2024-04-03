<template>
	<q-card class="my-card" :class="cardAdditionalClass">
		<user-score-section v-bind="userCoinInfo"></user-score-section>
		<up-down-button
			:on-click-up="onClickUp"
			:on-click-down="onClickDown"
		></up-down-button>
	</q-card>
</template>

<script setup lang="ts">
import UserScoreSection from 'components/molecules/UserScoreSection.vue';
import UpDownButton from 'components/molecules/UpDownButton.vue';
import { IUserScore } from '@interfaces/user';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
	userCoinInfo: IUserScore & { id: string };
}

defineOptions({
	name: 'CoinUpDownCard',
});

const { userCoinInfo, cardAdditionalClass } = defineProps<ICoinUpDownCard>();

function onClickUp() {
	console.log('Up');
}
function onClickDown() {
	console.log('Down');
}
</script>

<style lang="sass" scoped>
.my-card
	height: 500px
</style>
