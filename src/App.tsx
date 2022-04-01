import { ThemeProvider } from "@fluentui/react"

import { Shell } from "./Components";

export function App() {
	return <ThemeProvider className="root">
		<Shell />
	</ThemeProvider>;
}

if(import.meta.env.DEV)
	App.whydidyourender = true;
