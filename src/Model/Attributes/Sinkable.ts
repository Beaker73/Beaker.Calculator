import type { ItemBase } from "../ItemBase";
import { ItemAttributes } from "./ItemAttributes";

export type Sinkable = { sinkValue: number };

export function isSinkable<T extends ItemBase>(item: T): item is (T & Sinkable) {
	return (item.attributes & ItemAttributes.Sinkable) === ItemAttributes.Sinkable;
}

