import { ICoinInfo } from './coin';

export interface IUser {
	nickname: string;
	isDark?: boolean;
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
	maxCombo: number;
}

export type TUserHistory = Record<ICoinInfo['id'], IUserScore>;
