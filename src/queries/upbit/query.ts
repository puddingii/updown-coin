import { useQuery } from '@tanstack/vue-query';

import { KEY } from '.';
import { formatURLParams } from 'src/util/formatURLParams';
import { api } from 'src/boot/axios';
import { IUpbitCoinDetailInfo } from '@interfaces/coin';

const updateCoinListFetcher = async (queryString: string) => {
	const result = await api.get<IUpbitCoinDetailInfo[]>(
		`/v1/market/all?${queryString}`
	);

	return result.data;
};

type TFetchOptions = {
	isDetails: boolean;
};
type TCBOptions<T, E> = Partial<{
	onSuccess: (data: T) => void;
	onError: (error: E) => void;
}>;
export const useUpdateCoinListQuery = (
	fetchOptions: TFetchOptions,
	cbOptions: TCBOptions<IUpbitCoinDetailInfo[], unknown> = {}
) => {
	const queryString = formatURLParams(fetchOptions);

	return useQuery({
		staleTime: 1000 * 60,
		queryKey: [KEY.getAllCoin, queryString],
		queryFn: async ({ queryKey }) => {
			try {
				const response = await updateCoinListFetcher(queryKey[1]);

				cbOptions.onSuccess && cbOptions.onSuccess(response);

				return response;
			} catch (error) {
				cbOptions.onError && cbOptions.onError(error);
			}
		},
	});
};
