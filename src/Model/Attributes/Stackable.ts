import { ItemBase } from "../ItemBase";
import { ItemAttributes } from "./ItemAttributes";

export type Stackable = { stackSize: number };

export function isStackable<T extends ItemBase>(item: T): item is (T & Stackable) {
	return (item.attributes & ItemAttributes.Stackable) === ItemAttributes.Stackable;
}
