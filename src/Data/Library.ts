import { createTheme, IPartialTheme, ITheme } from "@fluentui/react";
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
	/** any items or technologies this unlocks */
	unlocks?: string[],
}

export type LibraryItem = Omit<Item, "key" | "iconName"> & { iconName?: string };

export interface Library {
	theme?: IPartialTheme,
	items: Record<string, LibraryItem>;
}

export interface LibraryData {
	theme?: ITheme,
	items: Record<string, Item>;
}

export async function loadLibrary(app: Application): Promise<LibraryData> {
	const module = await import(`./${app}/Library.ts`) as { default: Library };
	const data = module.default;

	return {
		theme: createTheme(data.theme),
		items: enrichData(data.items, (key, item) => ({
			...item,
			key,
			iconName: item.iconName ?? key,
		})),
	};
}

function enrichData<S, T extends S>(items: Record<string, S>, mapItem: (key: string, item: S) => T): Record<string, T> {
	return Object.fromEntries(
		Object.entries(items)
			.map(([key, item]) => [key, mapItem(key, item)]),
	);
}