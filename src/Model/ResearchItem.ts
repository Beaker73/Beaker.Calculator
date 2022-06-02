import type { Item } from "./Item";
import type { ItemBase } from "./ItemBase";

import { ItemType } from "./ItemType";

export interface ResearchItem extends ItemBase {
	type: ItemType.Research;
	requirements: Record<string, number>;
	dependencies: string[];
	unlocks: string[];
}

export function isResearchItem(item: Item): item is ResearchItem {
	return item.type === ItemType.Research;
}