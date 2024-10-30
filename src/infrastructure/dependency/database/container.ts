import { ContainerModule } from "inversify";
import { Database } from "../../database/database";
import { SqlDatabase } from "../../database/sql/database";
import { DatabaseSymbols } from "./symbol";

export const DatabaseContainerModule = new ContainerModule(bind => {
	bind<Database>(DatabaseSymbols.MySql).to(SqlDatabase).inSingletonScope();
})
