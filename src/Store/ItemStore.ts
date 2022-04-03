import { computed, Computed } from "easy-peasy";
import type { Store } from ".";

export interface Item {
	iconPath: string,
	name: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStore {
	data: Record<string, Item>,
	all: Computed<ItemStore, Item[], Store>,
}

export const itemModel: ItemStore = {
	data: {
		ironIngot: {
			iconPath: "/icons/iron-ingot.png",
			name: "Iron Ingot",
		}
	},
	all: computed(state => Object.values(state.data)),
};