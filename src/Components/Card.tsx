import { CommandBar, ContextualMenuItemType, ICommandBarItemProps, ICommandBarStyles, Stack, Text } from "@fluentui/react";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { CommandBarProvider, useCommandBarItems } from "../Hooks";
import { makeStyles } from "../Hooks/Theming";

export interface CardProps {
	title?: string,
	className?: string,
	onClick?: () => void,
}

const useCardStyles = makeStyles(theme => ({
	card: {
		borderRadius: theme.effects.roundedCorner4,
		boxShadow: theme.effects.elevation4,
		background: theme.semanticColors.cardStandoutBackground,
		padding: theme.spacing.m,
	},
}));

export function Card(props: PropsWithChildren<CardProps>) {

	const styles = useCardStyles();

	return <div className={[styles.card, props.className].join(" ")} onClick={props.onClick}>
		<CommandBarProvider>
			{props.title && <CardHeader title={props.title} />}
			{props.children}
		</CommandBarProvider>
	</div>;
}

if (import.meta.env.DEV)
	Card.whydidyourender = true;





export interface CardHeaderProps {
	title: string,
}

const useCardHeaderStyles = makeStyles(theme => ({
	header: {
		borderBottom: `solid 1px ${theme.semanticColors.bodyFrameDivider}`,
		paddingRight: 0,
		paddingLeft: theme.spacing.s1,
		marginTop: `-${theme.spacing.s1}`,
	},
	title: {
		fontWeight: 600,
	}
}));

export function CardHeader(props: CardHeaderProps) {

	const { title } = props;

	const styles = useCardHeaderStyles();
	const farItems = useCommandBarItems();

	const renderTitle = useCallback(() => {
		return <Stack verticalAlign="center">
			<Stack.Item shrink>
				<Text as="h2" variant="large" className={styles.title}>{title}</Text>
			</Stack.Item>
		</Stack>;
	}, [styles.title, title]);

	const items = useMemo<ICommandBarItemProps[]>(() => ([
		{ key: "title", itemType: ContextualMenuItemType.Header, onRender: renderTitle }
	]), [renderTitle]);

	const commandBarStyles = useMemo<ICommandBarStyles>(() => ({
		root: styles.header,
	}), [styles.header]);

	return <CommandBar items={items} farItems={farItems} styles={commandBarStyles} />;
}

if (import.meta.env.DEV)
	CardHeader.whydidyourender = true;
