<template>
	<router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { useUserStore } from './stores/user-store';

defineOptions({
	name: 'App',
});

const userStore = useUserStore();

const loadAlertCSS = async (isDark: boolean) => {
	await (isDark
		? import('@sweetalert2/theme-dark/dark.scss')
		: import('sweetalert2/src/sweetalert2.scss'));
};

watch(() => userStore.isDarkMode, loadAlertCSS);

onBeforeMount(async () => {
	await loadAlertCSS(userStore.isDarkMode);
});
</script>
