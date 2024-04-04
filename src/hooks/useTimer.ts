import { computed, reactive, ref } from 'vue';

type TFunctionParams = { counter: number; tick: number };
type TOptions = Partial<{
	/** N초 */
	counter: number;
	/** 1000 * N초 */
	tick: number;
	onBeforeStart: (params: TFunctionParams) => void;
	onStart: (params: TFunctionParams) => void;
	onBeforeStop: (params: TFunctionParams) => void;
	onStop: (params: TFunctionParams) => void;
	onTick: (params: TFunctionParams) => void;
}> & { key: string };
export const useTimer = (options: TOptions = {} as TOptions) => {
	const {
		key,
		onBeforeStart,
		onBeforeStop,
		onStart,
		onStop,
		onTick,
		...timeOptions
	} = options;
	const defaultTimeInfo = { counter: 180, tick: 1, ...timeOptions };
	const timer = ref<NodeJS.Timeout | null>(null);
	const timeInfo = reactive({ ...defaultTimeInfo });

	const prettyTime = computed(() => {
		const minute = Math.floor(timeInfo.counter / 60)
			.toString()
			.padStart(2, '0');
		const second = (timeInfo.counter % 60).toString().padStart(2, '0');
		return `${minute}:${second}`;
	});

	const stop = () => {
		if (timer.value) {
			onBeforeStop && onBeforeStop(timeInfo);
			clearInterval(timer.value);
			onStop && onStop(timeInfo);
		}
		timeInfo.counter = defaultTimeInfo.counter;
	};

	const startBuilder = (
		tick: number,
		options: {
			intervalCallback?: (tickTotal: number) => void;
			beforeInterval?: () => void;
			afterInterval?: () => void;
		}
	) => {
		if (timer.value) {
			clearInterval(timer.value);
		}
		const { afterInterval, beforeInterval, intervalCallback } = options;

		beforeInterval && beforeInterval();
		onBeforeStart && onBeforeStart(timeInfo);

		let tickTotal = 0;
		timer.value = setInterval(() => {
			onTick && onTick(timeInfo);
			tickTotal += tick;
			intervalCallback && intervalCallback(tickTotal);
		}, tick * 1000);

		afterInterval && afterInterval();
		onStart && onStart(timeInfo);
	};

	const start = () =>
		startBuilder(timeInfo.tick, {
			intervalCallback: () => {
				if (timeInfo.counter <= 0) {
					stop();
					return;
				}
				timeInfo.counter -= 1;
			},
		});
	const infinityStart = () =>
		startBuilder(timeInfo.tick, {
			beforeInterval: () => {
				timeInfo.counter = 0;
			},
			intervalCallback: (tickTotal: number) => {
				timeInfo.counter = tickTotal;
			},
		});

	return {
		key,
		getCounter: () => computed(() => timeInfo.counter),
		prettyTime,
		stop,
		start,
		infinityStart,
	};
};
