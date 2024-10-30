import { Logger, LoggerDto } from "../logger";
import { injectable } from "inversify";
import * as util from "node:util";

interface LoggerData extends Omit<LoggerDto, "date"> {
	date: string
}

interface LoggerResultData extends Omit<LoggerData, "error"> {}

interface LoggerErrorData extends Omit<LoggerData, "result"> {}

@injectable()
export class ConsoleLoggerImpl implements Logger {
	public async print(loggerDto: LoggerDto): Promise<void> {
		let loggerData: LoggerData = {
			title: loggerDto.title,
			result: loggerDto.result,
			alert: loggerDto.alert,
			info: loggerDto.info,
			error: loggerDto.error,
			date: this.printTime(loggerDto.date)
		}

		if(loggerData.info)
			this.printInfo(loggerData)

		if(loggerData.alert)
			this.printAlert(loggerData)

		if(loggerData.error)
			this.printError(loggerData)

		if(loggerData.result)
			this.printResult(loggerData)
	}

	private printResult(loggerData: LoggerResultData) {
		this.printToLog({
			title: loggerData.title,
			type: "RESULT",
			data: loggerData.result,
			date: loggerData.date,
		})
	}

	private printAlert(loggerData: LoggerResultData) {
		this.printToLog({
			title: loggerData.title,
			type: "ALERT",
			data: loggerData.alert,
			date: loggerData.date,
		})
	}

	private printInfo(loggerData: LoggerResultData) {
		this.printToLog({
			title: loggerData.title,
			type: "INFO",
			data: loggerData.info,
			date: loggerData.date,
		})
	}

	private printError(loggerData: LoggerErrorData) {
		this.printToLog({
			title: loggerData.title,
			type: "ERROR",
			data: loggerData.error,
			date: loggerData.date,
		})
	}

	private inspect(data: object) {
		return util.inspect(data, {showHidden: false, depth: null, colors: true})
	}

	private printToLog(params: {type: string, data: any, title?: string, date: string}) {
		let title = params.title ? ` [${params.title}]` : ""

		console.log(`${params.date} - ${params.type} -${title} ${this.inspect(params.data)}`)
	}

	private printTime(date: Date = new Date()): string {
		let timeString = Intl.DateTimeFormat("mn-MN", {dateStyle: "short", timeStyle: "medium"}).format(date)

		return `${timeString}.${date.getMilliseconds()}`
	}
}
