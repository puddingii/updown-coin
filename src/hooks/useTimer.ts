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
			clearInterval(timer);
			onStop && onStop();
		}
		timeInfo.counter = defaultTimeInfo.counter;
	};
	const start = () => {
		onBeforeStart && onBeforeStart();
		timer = setInterval(() => {
			onTick && onTick();
			if (timeInfo.counter <= 0) {
				onBeforeStop && onBeforeStop();
				stop();
				return;
			}
			timeInfo.counter -= 1;
		}, timeInfo.tick * 1000);
		onStart && onStart();
	};

	return {
		prettyTime,
		stop,
		start,
	};
};
