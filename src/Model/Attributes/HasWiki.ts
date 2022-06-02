import type { ItemBase } from "../ItemBase";
import { ItemAttributes } from "./ItemAttributes";

export type HasWiki = { wikiUri: string };

export function hasWiki<T extends ItemBase>(item: T): item is (T & HasWiki) {
	return (item.attributes & ItemAttributes.HasWiki) === ItemAttributes.HasWiki;
}