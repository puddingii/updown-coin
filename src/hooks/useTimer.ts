import { computed, reactive } from 'vue';

type TOptions = Partial<{
	/** N초 */
	counter: number;
	/** 1000 * N초 */
	tick: number;
	onBeforeStart: () => void;
	onStart: () => void;
	onBeforeStop: () => void;
	onStop: () => void;
	onTick: () => void;
}>;
export const useTimer = (options: TOptions = {} as TOptions) => {
	let timer: NodeJS.Timeout | null = null;

	const {
		onBeforeStart,
		onBeforeStop,
		onStart,
		onStop,
		onTick,
		...timeOptions
	} = options;
	const defaultTimeInfo = { counter: 180, tick: 1, ...timeOptions };
	const timeInfo = reactive({ ...defaultTimeInfo });

	const prettyTime = computed(() => {
		const minute = Math.floor(timeInfo.counter / 60)
			.toString()
			.padStart(2, '0');
		const second = (timeInfo.counter % 60).toString().padStart(2, '0');
		return `${minute}:${second}`;
	});

	const stop = () => {
		if (timer) {
			onBeforeStop && onBeforeStop();
			clearInterval(timer);
			onStop && onStop();
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
		stop();
		const { afterInterval, beforeInterval, intervalCallback } = options;

		beforeInterval && beforeInterval();
		onBeforeStart && onBeforeStart();

		let tickTotal = 0;
		timer = setInterval(() => {
			onTick && onTick();
			tickTotal += timeInfo.tick;
			intervalCallback && intervalCallback(tickTotal);
		}, tick);

		afterInterval && afterInterval();
		onStart && onStart();
	};

	const start = () =>
		startBuilder(timeInfo.tick * 1000, {
			intervalCallback: () => {
				if (timeInfo.counter <= 0) {
					stop();
					return;
				}
				timeInfo.counter -= 1;
			},
		});
	const infinityStart = () =>
		startBuilder(timeInfo.tick * 1000, {
			beforeInterval: () => {
				timeInfo.counter = 0;
			},
			intervalCallback: (tickTotal: number) => {
				timeInfo.counter = tickTotal;
			},
		});

	return {
		prettyTime,
		stop,
		start,
		infinityStart,
	};
};
