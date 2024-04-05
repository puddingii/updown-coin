<template>
	<coin-card-list :coin-list="coinList" :count-per-row="5"> </coin-card-list>
</template>

<script setup lang="ts">
import CoinCardList from 'components/organisms/CoinCardList.vue';
import { ICoinInfo } from '@interfaces/coin';

defineOptions({
	name: 'CoinCardList',
});

withDefaults(defineProps<{ coinList: ICoinInfo[] }>(), {
	coinList: () => [] as ICoinInfo[],
});
</script>
