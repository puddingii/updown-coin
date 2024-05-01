import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
	// something to do
	const queryPluginOptions: VueQueryPluginOptions = {
		queryClientConfig: {
			defaultOptions: {
				queries: {
					retry: false,
					refetchOnWindowFocus: false,
					refetchOnReconnect: true,
					staleTime: Infinity,
				},
				mutations: {
					retry: false,
				},
			},
		},
	};
	app.use(VueQueryPlugin, queryPluginOptions);
});
