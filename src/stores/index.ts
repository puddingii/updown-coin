import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { Router } from 'vue-router';
import { PiniaDebounce } from '@pinia/plugin-debounce';
import { debounce } from 'lodash';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
	export interface PiniaCustomProperties {
		readonly router: Router;
	}
	// // eslint-disable-next-line @typescript-eslint/no-unused-vars
	// export interface DefineStoreOptionsBase<S, Store> {
	// 	// 모든 액션의 ms 값을 정의할 수 있음.
	// 	debounce?: Partial<Record<keyof StoreActions<Store>, number>>;
	// }
}

declare module '@pinia/plugin-debounce' {
	export interface Config {
		Debounce: typeof debounce;
	}
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
	const pinia = createPinia();

	// You can add Pinia plugins here
	// pinia.use(SomePiniaPlugin)

	pinia.use(PiniaDebounce(debounce));

	return pinia;
});
