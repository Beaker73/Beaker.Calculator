import { Routes, useRoutes } from "raviger";

import { makeStyles } from "../Hooks/Theming";
import * as pages from "../Pages";

import { AppBar } from "./AppBar";
import { NavBar } from ".";
import { CommandBarProvider, PanelProvider } from "../Hooks";

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "fixed",
		top: 0,
		width: "100vw",
		height: 44,
		background: theme.semanticColors.bodyBackground,
		borderBottom: `solid 1px ${theme.semanticColors.bodyDivider}`,
		boxShadow: theme.effects.elevation8,
		zIndex: 100,
	},
	navBar: {
		position: "fixed",
		top: 45,
		height: "calc(100vh - 45px)",
		width: 200,
		background: theme.semanticColors.bodyBackground,
		borderRight: `solid 1px ${theme.semanticColors.bodyDivider}`,
		boxShadow: theme.effects.elevation8,
		zIndex: 200,
	},
	pageFrame: {
		position: "fixed",
		top: 44,
		left: 200,
		width: "calc(100vw - 200px)",
		height: "calc(100vh - 44px)",
		zIndex: 0,
		overflow: "auto",
		background: theme.semanticColors.bodyStandoutBackground,
		margin: 0,
		padding: 0,
	},
	page: {
		minHeight: "calc(100vh - 44px)",
		margin: 0,
		padding: 0,
		overflow: "hidden",
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

	return <CommandBarProvider>
		<PanelProvider>
			<div className={styles.navBar}>
				<NavBar />
			</div>
			<div className={styles.appBar}>
				<AppBar />
			</div>
			<div className={styles.pageFrame}>
				<div className={styles.page}>
					{page}
				</div>
			</div>
		</PanelProvider>
	</CommandBarProvider>;
}

if (import.meta.env.DEV)
	Shell.whydidyourender = true;
