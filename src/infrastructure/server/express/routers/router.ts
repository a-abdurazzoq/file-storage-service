import { Router } from "express";

export interface RouterBase {
	init(router: Router): void;
}
