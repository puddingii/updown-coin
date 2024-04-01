<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white">
			<q-toolbar>
				<q-toolbar-title>
					<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
					</q-avatar>
					업 & 다운 드개재~
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer bordered class="bg-grey-8 text-white">
			<q-toolbar>
				<q-toolbar-title>
					<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
					</q-avatar>
					<div>업 & 다운 드개재~</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CoinLayout',
});
</script>
