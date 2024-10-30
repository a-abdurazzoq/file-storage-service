import { injectable } from "inversify";
import { PairTokenStruct } from "./types";

export interface PairTokenPresenter {
	present(accessToken: string, refreshToken: string): PairTokenStruct;
}

@injectable()
export class PairTokenPresenterImpl implements PairTokenPresenter {
    public present(accessToken: string, refreshToken: string): PairTokenStruct {
		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
		}
    }
}
