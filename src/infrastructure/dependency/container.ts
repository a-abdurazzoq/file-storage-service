import { Container as InversifyContainer, ContainerModule } from "inversify";

export interface Container {
	get<T>(symbol: symbol): T
}

export class ContainerImpl implements Container {
	private readonly container: InversifyContainer

	constructor(modules: ContainerModule[]) {
		this.container = new InversifyContainer()
		this.loadAll(modules)
	}

	private loadAll(modules: ContainerModule[]): void {
		this.container.load(...modules)
	}

	public get<T>(symbol: symbol): T {
		return this.container.get<T>(symbol)
	}
}
