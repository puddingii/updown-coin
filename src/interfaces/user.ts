import { ICoinInfo } from './coin';

export interface IUser {
	nickname: string;
}

export interface IUserScore {
	success: number;
	fail: number;
	combo: number;
}

export type TUserHistory = Record<ICoinInfo['id'], IUserScore>;
