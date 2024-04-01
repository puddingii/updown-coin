import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
	},
	{
		path: '/coin',
		component: () => import('layouts/CoinLayout.vue'),
		children: [{ path: '', component: () => import('pages/CoinListPage.vue') }],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
