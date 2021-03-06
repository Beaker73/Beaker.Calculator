import { createStore, createTypedHooks, thunk, Thunk } from "easy-peasy";
import { loadLibrary } from "../Data/Library";
import { Application, contextStore, ContextStore } from "./ContextStore";
//import { StoreEnhancer } from "redux";

import { itemModel, ItemStore } from "./ItemStore";

export interface Store {
	context: ContextStore,
	items: ItemStore

	activateApp: Thunk<Store, { app: Application }, void, Store, Promise<void>>,
	loadLibrary: Thunk<Store, void, void, Store, Promise<void>>,
}

export const model: Store = {
	context: contextStore,
	items: itemModel,

	activateApp: thunk(async ({ loadLibrary, context: { setApp } }, { app }) => {
		setApp({ app });
		await loadLibrary();
	}),
	loadLibrary: thunk(async ({ context: { setTheme }, items: { setItems } }, _, { getState }) => {
		const application = getState().context.application;
		const library = await loadLibrary(application);

		setTheme({ theme: library.theme });
		setItems({ items: library.items });
	}),
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

if (import.meta.env.DEV) {
	if (import.meta.hot) {
		import.meta.hot.accept(() => {
			store.reconfigure(model);
		});
	}
}

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;