import type { HasEnergy, ItemAttributes, Sinkable, Stackable } from "./Attributes";
import { HasWiki } from "./Attributes/HasWiki";
import type { ItemType } from "./ItemType";

export type ItemBase = {
	/** Key of the item */
	key: string,

	/** The type of the item */
	type: ItemType,

	/** Name of the icon */
	iconName: string,

	/** Display Name of the item */
	name: string,

	/** Description of the item */
	description: string,

	/** The attributes this item supportes */
	attributes: ItemAttributes,
}
	& Partial<Sinkable>
	& Partial<Stackable>
	& Partial<HasEnergy>
	& Partial<HasWiki>