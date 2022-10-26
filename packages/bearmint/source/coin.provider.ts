import { IoC } from "@ardenthq/sdk";

export class ServiceProvider extends IoC.AbstractServiceProvider {
	public override async make(container: IoC.Container): Promise<void> {
		await this.compose(container);
	}
}
