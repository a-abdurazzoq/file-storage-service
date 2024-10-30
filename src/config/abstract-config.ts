import { injectable } from "inversify";

@injectable()
export class AbstractConfig {
	protected throwEnvError(variableName: string): void {
		throw new Error(`Ошибка: Переменная окружения ${variableName} отсутствует или неверна.`);
	}
}
