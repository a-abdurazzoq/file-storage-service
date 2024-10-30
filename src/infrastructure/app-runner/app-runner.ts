export interface AppRunner {
	run(): Promise<void>;
	stop(): Promise<void>;
}
