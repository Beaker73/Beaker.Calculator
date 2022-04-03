import { createStore, createTypedHooks } from "easy-peasy";
//import { StoreEnhancer } from "redux";

import { itemModel, ItemStore } from "./ItemStore";

export interface Store {
	items: ItemStore
}

export const model: Store = {
	items: itemModel,
};


//let composer: StoreEnhancer | undefined = undefined;
// if (import.meta.env.DEV) {
// 	const { composeWithDevTools } = await import("remote-redux-devtools");

// 	if (composeWithDevTools) {
// 		composer = composeWithDevTools({
// 			hostname: "localhost",
// 			port: 3005,
// 			name: "Yet Another Satisfactory Calculator",
// 		})();
// 	}
// }

export const store = createStore(model, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
//	compose: composer as any,
//	devTools: true,
});

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;