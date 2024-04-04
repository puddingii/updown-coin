<template>
	<div class="q-pa-md">
		<q-card
			bordered
			class="my-card column justify-center items-center"
			:class="cardAdditionalClass"
		>
			<div class="score">
				<user-score-section></user-score-section>
			</div>
			<div class="button-list">
				<up-down-button
					card-additional-class="bg-none text-white"
					:on-click-up="onClickUp"
					:on-click-down="onClickDown"
					:on-click-decide="onClickDecide"
					:user-select-info="userSelectInfo"
				></up-down-button>
			</div>

			<q-separator class="full-width" />

			<percent-circular-progress
				:value="currentCount"
				:text="updownTimer.prettyTime.value"
				:max="counter"
				size="280px"
				font-size="35px"
			></percent-circular-progress>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import UserScoreSection from 'components/molecules/UserScoreSection.vue';
import UpDownButton, {
	IUpDownButtonProps,
} from 'components/molecules/UpDownButton.vue';
import PercentCircularProgress from 'components/atoms/PercentCircularProgress.vue';
import { useTimer } from 'src/hooks/useTimer';
import { useUserStore } from 'src/stores/user-store';
import { useCoinStore } from 'src/stores/coin-store';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
}

defineOptions({
	name: 'CoinUpDownCard',
});

defineProps<ICoinUpDownCard>();

const route = useRoute();
const id = computed(() => route.params.id as string);

const userStore = useUserStore();
const coinStore = useCoinStore();
const { priceHistoryList } = storeToRefs(coinStore);

const userSelectInfo = reactive({
	select: 'none',
	decide: false,
	price: 0,
} as IUpDownButtonProps['userSelectInfo'] & { price: number });

const counter = 60;
const updownTimer = useTimer({
	counter,
	key: 'UPDOWN_TIMER',
	onStop: () => {
		userStore.updateCoinScore(id.value, isUp.value ? 1 : -1);
		userSelectInfo.decide = false;
		userSelectInfo.select = 'none';
	},
});
const currentCount = updownTimer.getCounter();

const isUp = computed(() => {
	const recent = priceHistoryList.value.at(0);

	if (recent) {
		return recent.price > userSelectInfo.price;
	}
	return false;
});

function onClickUp() {
	userSelectInfo.select = 'up';
}
function onClickDown() {
	userSelectInfo.select = 'down';
}
function onClickDecide() {
	const recentHistory = priceHistoryList.value.at(0);
	if (userSelectInfo.select !== 'none' && recentHistory) {
		userSelectInfo.decide = true;
		userSelectInfo.price = recentHistory.price;
		updownTimer.start();
	}
}

onBeforeUnmount(() => {
	updownTimer.stop();
});
</script>

<style scoped lang="sass">
.my-card
  width: 100%

  .score
    overflow: auto
    min-width: 100%
    max-width: 100%
  .button-list
    margin-bottom: 20px
</style>
