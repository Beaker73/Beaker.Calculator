import { createTheme, IPartialTheme, ITheme } from "@fluentui/react";
import type { BuildingItem, Item, ResearchItem, ResourceItem } from "../Model";
import { ItemAttributes } from "../Model/Attributes";
import type { Application } from "../Store/ContextStore";

export type ResearchItemData = Omit<ResearchItem, "key" | "iconName" | "attributes"> & { iconName?: string };
export type ResourceItemData = Omit<ResourceItem, "key" | "iconName" | "attributes"> & { iconName?: string };
export type BuildingItemData = Omit<BuildingItem, "key" | "iconName" | "attributes"> & { iconName?: string };
export type ItemData = ResourceItemData | ResearchItemData | BuildingItemData;

export interface LibraryData {
	theme?: IPartialTheme,
	items: Record<string, ItemData>;
}

export interface Library {
	theme?: ITheme,
	items: Record<string, Item>;
}

export async function loadLibrary(app: Application): Promise<Library> {
	const module = await import(`./${app}/Library.ts`) as { default: LibraryData };
	const data = module.default;

	return {
		theme: createTheme(data.theme),
		items: enrichData<ItemData, Item>(data.items, (key, item) => ({
			...item,
			key,
			iconName: item.iconName ?? key,
			attributes: composeAttributes(item),
		} as Item)),
	};
}

function enrichData<S, T extends S>(items: Record<string, S>, mapItem: (key: string, item: S) => T): Record<string, T> {
	return Object.fromEntries(
		Object.entries(items)
			.map(([key, item]) => [key, mapItem(key, item)]),
	);
}

function composeAttributes(item: ItemData): ItemAttributes {

	let attributes: ItemAttributes = ItemAttributes.None;

	if ("stackSize" in item)
		attributes |= ItemAttributes.Stackable;
	if ("sinkValue" in item)
		attributes |= ItemAttributes.Sinkable;
	if ("energy" in item)
		attributes |= ItemAttributes.HasEnergy;
	if ("wikiUri" in item)
		attributes |= ItemAttributes.HasWiki;

	return attributes;
}