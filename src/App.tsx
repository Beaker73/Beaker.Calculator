import { ThemeProvider } from "@fluentui/react";
import { useEffect } from "react";
import { Shell } from "./Components";

export function App() {

	useEffect(() => {
		window.addEventListener("contextmenu", suppress);
		return () => window.removeEventListener("contextmenu", suppress);

		function suppress(event: MouseEvent) {
			event.preventDefault();
			return false;
		}
	}, []);

	return <ThemeProvider className="root">
		<Shell />
	</ThemeProvider>;
}

if (import.meta.env.DEV)
	App.whydidyourender = true;
