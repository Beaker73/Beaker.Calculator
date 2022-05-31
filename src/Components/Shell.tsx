import { Routes, useRoutes } from "raviger";

import { makeStyles } from "../Hooks/Theming";
import { AsyncPage, LoadingPage } from "../Pages";

import { AppBar } from "./AppBar";
import { NavBar } from ".";
import { CommandBarProvider, ContextMenuProvider, PanelProvider } from "../Hooks";
import { useStoreActions, useStoreState } from "../Store";
import { useEffect, useState } from "react";

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

const routes: Routes<string> = {
	"/": () => <AsyncPage page="HomePage" />,
	"/calculator": () => <AsyncPage page="CalculatorPage" />,
	"/encyclopedia": () => <AsyncPage page="EncyclopediaPage" />,
	"/encyclopedia/factories": () => <AsyncPage page="EncyclopediaPage" pageProps={{ subSection: "factories" }} />,
	"/encyclopedia/structures": () => <AsyncPage page="EncyclopediaPage" pageProps={{ subSection: "structures" }} />,
	"/encyclopedia/resources": () => <AsyncPage page="EncyclopediaPage" pageProps={{ subSection: "resources" }} />,
	"/encyclopedia/:itemKey": (args) => <AsyncPage page="EncyclopediaItemPage" pageProps={args} />,
	"/map": () => <AsyncPage page="MapPage" />,
};

export function Shell() {

	const page = useRoutes(routes);
	const styles = useStyles();

	const [isLoaded, setIsLoaded] = useState(false);
	const application = useStoreState(state => state.context.application);
	const loadLibrary = useStoreActions(store => store.loadLibrary);
	useEffect(() => {
		setIsLoaded(false);
		loadLibrary().then(() => setIsLoaded(true));
	}, [application, loadLibrary]);

	if (!isLoaded)
		return <LoadingPage />;

	return <ContextMenuProvider>
		<CommandBarProvider>
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
		</CommandBarProvider>
	</ContextMenuProvider>;
}

if (import.meta.env.DEV)
	Shell.whydidyourender = true;
