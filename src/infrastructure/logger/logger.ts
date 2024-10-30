export interface LoggerDto {
	title?: string;
	result?: any;
	error?: any;
	alert?: any;
	info?: any;
	date?: Date;
}

export interface Logger {
	print(logData: LoggerDto): Promise<void>
}
