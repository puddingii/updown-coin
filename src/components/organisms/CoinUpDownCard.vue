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

			<chip-list :list="chipInfoList"></chip-list>

			<div class="row full-width">
				<div class="col-5 flex flex-center">
					<percent-circular-progress
						:value="currentCount"
						:text="updownTimer.prettyTime.value"
						:max="counter"
						size="280px"
						font-size="35px"
					></percent-circular-progress>
				</div>
				<div class="col-7 flex flex-center user-combo-table">
					<user-combo-table></user-combo-table>
				</div>
			</div>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import UserScoreSection from 'components/molecules/UserScoreSection.vue';
import UserComboTable from 'components/molecules/UserComboTable.vue';
import ChipList, { IChipList } from 'components/molecules/ChipList.vue';
import UpDownButton, {
	IUpDownButtonProps,
} from 'components/molecules/UpDownButton.vue';
import PercentCircularProgress from 'components/atoms/PercentCircularProgress.vue';
import { useTimer } from 'src/hooks/useTimer';
import { useUserStore } from 'src/stores/user-store';
import { useCoinStore } from 'src/stores/coin-store';
import { formatKRNumber } from 'src/util/formatNumber';

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
const comparator = (a: number, b: number) => {
	if (userSelectInfo.select === 'up') {
		return a > b;
	}
	if (userSelectInfo.select === 'down') {
		return a < b;
	}

	return false;
};

const counter = 20;
const updownTimer = useTimer({
	counter,
	key: 'UPDOWN_TIMER',
	onStop: (timeInfo) => {
		const recent = priceHistoryList.value.at(0);
		if (userSelectInfo.decide && timeInfo.counter === 0 && recent) {
			const isUp = comparator(recent.price, userSelectInfo.price);
			console.log(recent.price, userSelectInfo.price);
			userStore.updateCoinScore(id.value, isUp ? 1 : -1, {
				beforePrice: userSelectInfo.price,
				currentPrice: priceHistoryList.value[0].price,
				isUp: userSelectInfo.select === 'up',
			});
		}
		userSelectInfo.decide = false;
		userSelectInfo.select = 'none';
	},
});

const currentCount = updownTimer.getCounter();
const chipInfoList = computed(() => {
	const list = [] as IChipList['list'];
	if (userSelectInfo.decide) {
		list.push({
			color: 'primary',
			textColor: 'white',
			text: `${formatKRNumber(userSelectInfo.price)} 원`,
		});
	}
	if (userSelectInfo.select === 'up') {
		list.push({ color: 'secondary', textColor: 'white', text: 'UP!!!!' });
	}
	if (userSelectInfo.select === 'down') {
		list.push({ color: 'negative', textColor: 'white', text: 'DOWN!!!!' });
	}

	return list;
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
  .user-combo-table
    height: 100%
</style>
