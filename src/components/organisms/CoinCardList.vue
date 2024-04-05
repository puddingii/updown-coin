<template>
	<div class="q-pa-md card-manager">
		<div
			v-for="(coinList, row) in multipleRowList"
			class="row justify-center"
			:key="`${row}row`"
		>
			<div class="col-2" v-for="(coinInfo, idx) in coinList" :key="idx">
				<coin-card v-bind="{ ...coinInfo, onClickCard }"></coin-card>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import CoinCard from 'components/molecules/CoinCard.vue';
import { ICoinInfo } from '@interfaces/coin';

defineOptions({
	name: 'CoinCardList',
});
const router = useRouter();

const props = withDefaults(
	defineProps<{ coinList: ICoinInfo[]; countPerRow: number }>(),
	{
		coinList: () => [] as ICoinInfo[],
		countPerRow: 3,
	}
);

const multipleRowList = computed(() => {
	return props.coinList.reduce(
		(acc, cur) => {
			const rowList = acc.at(-1) as ICoinInfo[];
			if (rowList.length < props.countPerRow) {
				rowList.push(cur);
			} else {
				acc.push([cur]);
			}

			return acc;
		},
		[[]] as ICoinInfo[][]
	);
});

const onClickCard = function (id: string) {
	router.push(`coin/${id}`);
};
</script>

<style lang="sass" scoped>
.card-manager
  width: 100%
  .row > div
    padding: 10px 15px
  .row + .row
    margin-top: 1rem
</style>
