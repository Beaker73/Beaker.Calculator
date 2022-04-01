import { makeStyles } from "../Hooks/Theming";
import * as pages from "../Pages";

import { AppBar } from "./AppBar";
import { NavBar } from ".";
import { Routes, useRoutes } from "raviger";


const useStyles = makeStyles(() => ({
	appBar: {
		position: "fixed",
		top: 0,
		width: "100vh",
		height: 44,
	},
	navBar: {
		position: "fixed",
		top: 44,
		height: "calc(100vh - 44px)",
		width: 200,
	},
	page: {
		position: "fixed",
		top: 44,
		left: 200,
		width: "calc(100vw - 200px)",
		height: "calc(100vh - 44px)",
	}
}));

const routes: Routes<"/" | "/calculator" | "/map"> = {
	"/": () => <pages.HomePage />,
	"/calculator": () => <pages.CalculatorPage />,
	"/map": () => <pages.MapPage />,
};

export function Shell() {

	const page = useRoutes(routes);

	const styles = useStyles();

	return <>
		<div className={styles.appBar}>
			<AppBar />
		</div>
		<div className={styles.navBar}>
			<NavBar />
		</div>
		<div className={styles.page}>
			{page}
		</div>
	</>;
}

if(import.meta.env.DEV)
	Shell.whydidyourender = true;
