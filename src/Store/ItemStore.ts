import { computed, Computed } from "easy-peasy";
import type { Store } from ".";
import { Item } from "../Model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStore {
	data: Record<string, Item>,
	all: Computed<ItemStore, Item[], Store>,
	getItemByKey: Computed<ItemStore, (key: string) => Item | undefined, Store>,
}

export const itemModel: ItemStore = {
	data: {
		ironIngot: {
			key: "ironIngot",
			iconName: "iron-ingot",
			name: "Iron Ingot",
			category: "Ingots",
			stackSize: 100,
			sinkValue: 2,
			wikiUri: "https://satisfactory.fandom.com/wiki/Iron_Ingot"
		},
		coal: {
			key: "coal",
			iconName: "coal",
			name: "Coal",
			category: "Ore",
			stackSize: 100,
			sinkValue: 3,
			wikiUri: "https://satisfactory.fandom.com/wiki/Coal"
		},
		aluminaSolution: {
			key: "aluminaSolution",
			iconName: "alumina-solution-packaged",
			name: "Packaged Alumina Solution",
			category: "Container",
			stackSize: 100,
			sinkValue: 160,
			wikiUri: "https://satisfactory.fandom.com/wiki/Packaged_Alumina_Solution"
		}
	},
	all: computed(state => Object.values(state.data)),
	getItemByKey: computed(state => key => state.data[key]),
};