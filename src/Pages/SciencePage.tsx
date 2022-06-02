import { DirectionalHint, Stack, Text, TooltipHost } from "@fluentui/react";
import { ItemIcon, Page } from "../Components";
import { makeStyles } from "../Hooks";
import { useStoreState } from "../Store";

export function SciencePage(): JSX.Element {

	const scienceItems = useStoreState(state => state.items.researchItems);

	return <Page title="Encyclopedia" subTitle="Science">
		<Stack horizontal wrap tokens={{ childrenGap: 16 }}>
			{scienceItems.map(item => <ScienceItem key={item.key} itemKey={item.key} />)}
		</Stack>
	</Page>;
}

interface ScienceItemProps {
	itemKey: string,
}

function ScienceItem(props: ScienceItemProps): JSX.Element {
	const { itemKey } = props;
	const item = useStoreState(state => state.items.getItemByKey(itemKey));

	const styles = useScienceItemStyles();

	return <TooltipHost content={<Stack tokens={{childrenGap: 8}}>
		<Text className={styles.tipTitle}>{item.name}</Text>
		<Text variant="small">{item.description}</Text>
	</Stack>} directionalHint={DirectionalHint.bottomCenter}>
		<Stack className={styles.container} verticalAlign="center" verticalFill>
			<Stack.Item className={styles.title}>{item.name}</Stack.Item>
			<Stack.Item className={styles.icon}><ItemIcon item={item} size={128} /></Stack.Item>
		</Stack>
	</TooltipHost>;
}

const useScienceItemStyles = makeStyles(theme => ({
	tipTitle: {
		borderBottom: `solid 1px ${theme.semanticColors.variantBorder}`,
	},
	container: {
		//position: "absolute",
		display: "block",
		width: `calc(${theme.spacing.s1} * 2 + 128px + 4px)`,
		height: `calc(${theme.spacing.s1} * 2 + 128px + 4px + 1.7em)`,
		borderRadius: theme.effects.roundedCorner4,
		boxShadow: theme.effects.elevation4,
		background: theme.semanticColors.cardStandoutBackground,
		padding: theme.spacing.s1,
		border: `solid 1px ${theme.semanticColors.variantBorder}`,
	},
	title: {
		height: "1.7em",
	},
	icon: {
		display: "inline-block",
		width: 128,
		height: 128,
		border: `solid 1px ${theme.semanticColors.variantBorder}`,
		marginBottom: theme.spacing.m,
		borderRadius: theme.effects.roundedCorner2,
		overflow: "hidden",
	},
	description: {
		overflow: "hidden",
		...theme.fonts.xSmall,
	}
}));