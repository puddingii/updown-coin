import { ICoinInfo } from './coin';

export interface IUser {
	nickname: string;
}

export type TComboInfo = {
	beforePrice: number;
	currentPrice: number;
	isUp: boolean;
};
export interface IUserScore {
	success: number;
	fail: number;
	comboList: TComboInfo[];
}

export type TUserHistory = Record<ICoinInfo['id'], IUserScore>;
