import { IPartialTheme } from "@fluentui/react";
import { Application } from "../Store/ContextStore";

export interface Item {
	key: string,
	iconName: string,
	name: string,
	description: string,
	category: string,

	/** The number of items p/m this item transports */
	transports?: number,
	/** Sink value for this item (Satisfactory) */
	sinkValue?: number,
	/** Stack size for this item */
	stackSize?: number,
	/** Energy value in MJ */
	energy?: number,

	/** Any dependencies this item has */
	dependencies?: string[],
}

export interface Library {
	theme?: IPartialTheme,
	items: Record<string, Item>;
}

export async function loadLibrary(app: Application): Promise<Library> {
	const module = await import(`./${app}/Library.ts`) as { default: Library };
	return module.default;
}