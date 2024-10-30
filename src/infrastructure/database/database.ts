import { PrismaClient } from "@prisma/client";
export * from "./sql/database"


export interface Database {
	file: PrismaClient["file"];
	user: PrismaClient["user"];
	userSession: PrismaClient["userSession"];

	connect(): Promise<void>;
	disconnect(): Promise<void>;
}
