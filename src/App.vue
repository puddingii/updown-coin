<template>
	<router-view />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useUserStore } from './stores/user-store';

const userStore = useUserStore();

watch(
	() => userStore.isDarkMode,
	(isDark) => {
		isDark
			? import('@sweetalert2/theme-dark/dark.scss')
			: import('sweetalert2/src/sweetalert2.scss');
	}
);

defineOptions({
	name: 'App',
});
</script>
