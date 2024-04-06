<template>
	<div class="q-pa-md">
		<q-card
			bordered
			class="my-card column justify-center items-center"
			:class="cardAdditionalClass"
		>
			<div class="score">
				<user-score-section
					:id="id"
					:current-history="{
						combo: comboCount,
						fail: userScore.fail,
						success: userScore.success,
					}"
				></user-score-section>
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
					<user-combo-table
						:combo-list="userScore.comboList"
					></user-combo-table>
				</div>
			</div>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive } from 'vue';
import UserScoreSection from 'components/molecules/UserScoreSection.vue';
import UserComboTable from 'components/molecules/UserComboTable.vue';
import ChipList, { IChipList } from 'components/molecules/ChipList.vue';
import UpDownButton, {
	IUpDownButtonProps,
} from 'components/molecules/UpDownButton.vue';
import PercentCircularProgress from 'components/atoms/PercentCircularProgress.vue';
import { useTimer } from 'src/hooks/useTimer';
import { formatKRNumber } from 'src/util/formatNumber';
import { useUserStore } from 'src/stores/user-store';
import { ICoinCandleInfo } from '@interfaces/coin';
import { IUserScore } from '@interfaces/user';

export interface ICoinUpDownCard {
	cardAdditionalClass?: string;
	id: string;
	latestCoinInfo?: ICoinCandleInfo;
	userScore: IUserScore;
}

defineOptions({
	name: 'CoinUpDownCard',
});

const props = defineProps<ICoinUpDownCard>();
const comboCount = computed(() => props.userScore.comboList.length);

const userSelectInfo = reactive({
	select: 'none',
	decide: false,
	price: 0,
} as IUpDownButtonProps['userSelectInfo'] & { price: number });
const isUserSelectUp = computed(() => userSelectInfo.select === 'up');
const isUserSelectDown = computed(() => userSelectInfo.select === 'down');
const comparator = (a: number, b: number) => {
	if (isUserSelectUp.value) {
		return a > b;
	}
	if (isUserSelectDown.value) {
		return a < b;
	}

	return false;
};

const counter = 20;
const updownTimer = useTimer({
	counter,
	key: 'UPDOWN_TIMER',
	onStop: (timeInfo) => {
		if (
			userSelectInfo.decide &&
			timeInfo.counter === 0 &&
			props.latestCoinInfo
		) {
			const userStore = useUserStore();
			userStore.updateCoinScore(
				props.id,
				comparator(props.latestCoinInfo.price, userSelectInfo.price) ? 1 : -1,
				{
					beforePrice: userSelectInfo.price,
					currentPrice: props.latestCoinInfo.price,
					isUp: isUserSelectUp.value,
				}
			);
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
	if (isUserSelectUp.value) {
		list.push({ color: 'secondary', textColor: 'white', text: 'UP!!!!' });
	}
	if (isUserSelectDown.value) {
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
	if (userSelectInfo.select !== 'none' && props.latestCoinInfo) {
		userSelectInfo.decide = true;
		userSelectInfo.price = props.latestCoinInfo.price;
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
