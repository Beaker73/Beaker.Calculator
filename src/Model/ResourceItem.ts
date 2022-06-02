import type { Item } from "./Item";
import type { ItemBase } from "./ItemBase";
import { ItemType } from "./ItemType";

export interface ResourceItem extends ItemBase {
	type: ItemType.Resource;
}

export function isResourceItem(item: Item): item is ResourceItem {
	return item.type === ItemType.Resource;
}