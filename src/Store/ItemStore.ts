import { computed, Computed } from "easy-peasy";
import type { Store } from ".";
import { Item } from "../Model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStore {
	data: Record<string, Item>,
	all: Computed<ItemStore, Item[], Store>,
}

export const itemModel: ItemStore = {
	data: {
		ironIngot: {
			key: "ironIngot",
			iconName: "iron-ingot",
			name: "Iron Ingot",
			category: "Ingots",
			stackSize: 100,
			resourceSinkPoints: 2,
		}
	},
	all: computed(state => Object.values(state.data)),
};