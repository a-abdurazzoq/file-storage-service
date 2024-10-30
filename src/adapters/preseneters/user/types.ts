import { UserStruct as UserFactoryStruct } from "../../../domain/user";

export type UserStruct = Omit<UserFactoryStruct, "password">;
