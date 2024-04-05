<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-avatar>
					<img :src="Icon" />
				</q-avatar>

				<q-toolbar-title>업 & 다운 드개재~</q-toolbar-title>

				<q-btn-dropdown color="secondary" label="메뉴">
					<q-list>
						<q-item clickable v-close-popup @click="onClickBack">
							<q-item-section>
								<q-item-label>코인 고르기</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Icon from 'src/assets/icon.png';

defineOptions({
	name: 'CoinLayout',
});

const router = useRouter();

const onClickBack = () => {
	router.push('/coin');
};
</script>
