import { ThemeProvider } from "@fluentui/react";
import { StoreProvider } from "easy-peasy";
import { Shell } from "./Components";
import { store } from "./Store";

export function App() {
	return <ThemeProvider className="root">
		<StoreProvider store={store}>
			<Shell />
		</StoreProvider>
	</ThemeProvider>;
}

if (import.meta.env.DEV)
	App.whydidyourender = true;
