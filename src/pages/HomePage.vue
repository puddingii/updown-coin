<template>
	<div class="main-div">
		<q-img
			class="main-img"
			:src="MainBackground"
			width="100%"
			height="100%"
			fit="fill"
		/>
	</div>
	<div class="main-title">코인 Up & Down!!!!!!!</div>
	<q-btn class="go-btn" @click="onClickGo">Za 드가자</q-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MainBackground from 'src/assets/main-background.png';

defineOptions({
	name: 'HomePage',
});

const router = useRouter();
const onClickGo = () => {
	router.replace('coin');
};
</script>

<style scoped lang="sass">
.main-title
  position: absolute
  top: 35%
  left: 50%
  transform: translate(-50%, -50%)
  padding: 10px 30px
  width: 690px
  text-align: center
  z-index: 10
  font-size: 70px
  background-image: linear-gradient(90deg, red, orange, yellow, green, blue, navy, purple)
  -webkit-background-clip: text
  color: transparent
.main-div
  width: 100%
  height: 100%
.main-img
  opacity: 0.5
.go-btn
  width: 110px
  height: 43px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 10
  background-image: linear-gradient(90deg, red, orange, yellow, green, blue, navy, purple)
  font-size: 15px
  font-weight: 900
</style>
