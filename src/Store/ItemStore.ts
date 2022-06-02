import { action, Action, computed, Computed } from "easy-peasy";
import type { Store } from ".";
import { BuildingItem, Item, ItemType, ResearchItem, ResourceItem } from "../Model";
import { buildIndex, Index } from "./Indexing";

export interface ItemStore {
	// actual data
	items: Record<string, Item>,
	itemsPerType: Index<ItemType>,

	// getters
	all: Computed<ItemStore, Item[], Store>,
	getItemByKey: Computed<ItemStore, (key: string) => Item, Store>,
	resourceItems: Computed<ItemStore, ResourceItem[], Store>,
	researchItems: Computed<ItemStore, ResearchItem[], Store>,
	buildingItems: Computed<ItemStore, BuildingItem[], Store>,

	// actions (setters)
	setItems: Action<ItemStore, { items: Record<string, Item> }>,
}

export const itemModel: ItemStore = {
	items: {},
	itemsPerType: {},

	all: computed(state => Object.values(state.items)),
	getItemByKey: computed(state => key => state.items[key]),
	resourceItems: computed(state => Object.keys(state.itemsPerType.resource ?? {}).map(key => state.items[key] as ResourceItem)),
	researchItems: computed(state => Object.keys(state.itemsPerType.research ?? {}).map(key => state.items[key] as ResearchItem)),
	buildingItems: computed(state => Object.keys(state.itemsPerType.building ?? {}).map(key => state.items[key] as BuildingItem)),

	setItems: action((state, { items }) => {
		state.items = items;
		state.itemsPerType = buildIndex(Object.values(items), item => item.type);
	}),
};
