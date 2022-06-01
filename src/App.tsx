import { ThemeProvider } from "@fluentui/react";
import { StoreProvider } from "easy-peasy";
import { Shell } from "./Components";
import { store, useStoreState } from "./Store";

export function App() {
	return <StoreProvider store={store}>
		<ThemedApp />
	</StoreProvider>;
}

function ThemedApp() {
	const theme = useStoreState(state => state.context.theme);

	return <ThemeProvider className="root" theme={theme ?? undefined} >
		<Shell />
	</ThemeProvider>;
}

if (import.meta.env.DEV)
	App.whydidyourender = true;
