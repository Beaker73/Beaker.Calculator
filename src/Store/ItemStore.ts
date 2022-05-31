import { action, Action, computed, Computed } from "easy-peasy";
import type { Store } from ".";
import { Item } from "../Data/Library";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStore {
	data: Record<string, Item>,
	all: Computed<ItemStore, Item[], Store>,
	getItemByKey: Computed<ItemStore, (key: string) => Item | undefined, Store>,

	setItems: Action<ItemStore, { items: Record<string, Item> }>,
}

export const itemModel: ItemStore = {
	data: {},
	all: computed(state => Object.values(state.data)),
	getItemByKey: computed(state => key => state.data[key]),

	setItems: action((state, { items }) => {
		state.data = items;
	}),
};