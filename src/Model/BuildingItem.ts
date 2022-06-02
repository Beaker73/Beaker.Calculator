import type { Item } from "./Item";
import type { ItemBase } from "./ItemBase";
import { ItemType } from "./ItemType";

export interface BuildingItem extends ItemBase {
	type: ItemType.Building;
}

export function isBuildingItem(item: Item): item is BuildingItem {
	return item.type === ItemType.Building;
}