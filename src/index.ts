import "reflect-metadata"
import 'source-map-support/register'

import * as path from "node:path";
import * as dotenv from "dotenv"

import { ServerAppRunner } from "./infrastructure/app-runner";
import {
	ContainerImpl,
	ConfigContainerModule,
	FactoryContainerModule,
	PresenterContainerModule,
	RepositoryContainerModule,
	ServerContainerModule,
	ServiceContainerModule,
	UsecaseContainerModule,
	FileStorageContainerModule,
	ControllerContainerModule,
	DatabaseContainerModule, LoggerContainerModule
} from "./infrastructure/dependency";

dotenv.config({path: path.join(__dirname, "../.env")})

const appRunner = new ServerAppRunner(
	new ContainerImpl([
		FactoryContainerModule,
		ServiceContainerModule,
		RepositoryContainerModule,
		UsecaseContainerModule,
		PresenterContainerModule,
		ControllerContainerModule,
		DatabaseContainerModule,
		ServerContainerModule,
		LoggerContainerModule,
		ConfigContainerModule,
		FileStorageContainerModule,
	])

)

appRunner.run().then()
