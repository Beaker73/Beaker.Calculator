import type { ItemBase } from "../ItemBase";
import { ItemAttributes } from "./ItemAttributes";

export type HasEnergy = { energy: number };

export function hasEnergy<T extends ItemBase>(item: T): item is (T & HasEnergy) {
	return (item.attributes & ItemAttributes.HasEnergy) === ItemAttributes.HasEnergy;
}