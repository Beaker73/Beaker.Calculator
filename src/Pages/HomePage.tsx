import { Stack, Stylesheet, useTheme } from "@fluentui/react";
import { Card, Page } from "../Components";
import { makeStyles } from "../Hooks";
import { useStoreActions, useStoreState } from "../Store";
import { Application } from "../Store/ContextStore";

const useStyles = makeStyles(theme => ({
	card: {
		":hover": {
			background: theme.semanticColors.bodyBackgroundHovered,
		}
	},
	activeCard: {
		border: `solid 1px ${theme.palette.accent}`,
		borderBottom: `solid ${theme.spacing.s2} ${theme.palette.accent}`,
	},
}));

export function HomePage() {

	const activeApp = useStoreState(state => state.context.application);
	const activateApp = useStoreActions(store => store.activateApp);

	const theme = useTheme();
	const styles = useStyles();

	return <Page>
		<Stack horizontal wrap tokens={{ childrenGap: theme.spacing.l1 }}>
			{Object.values(Application).map(app =>
				<Card key={app} title={app}
					onClick={() => selectApp(app)}
					className={[styles.card, app === activeApp && styles.activeCard].join(" ")}>
					<Stack verticalFill verticalAlign="center">
						<img src={`/images/${app}.png`} alt={`${app} Logo`} />
					</Stack>
				</Card>
			)}
		</Stack>
	</Page>;

	function selectApp(app: Application) {
		activateApp({ app });
	}
}

if (import.meta.env.DEV)
	HomePage.whydidyourender = true;

export default HomePage;