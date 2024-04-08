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

const loadAlertCSS = (isDark: boolean) => {
	isDark
		? import('@sweetalert2/theme-dark/dark.scss')
		: import('sweetalert2/src/sweetalert2.scss');
};

watch(() => userStore.isDarkMode, loadAlertCSS);

onBeforeMount(() => {
	loadAlertCSS(userStore.isDarkMode);
});
</script>
