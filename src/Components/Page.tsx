import { Text } from "@fluentui/react";
import { PropsWithChildren } from "react";
import { makeStyles } from "../Hooks/Theming";

export interface PageProps {
	title?: string;
	subTitle?: string;
	verticalFill?: boolean;
}

const useStyles = makeStyles(theme => ({
	page: {
		padding: theme.spacing.l1,
	},
	verticalFill: {
		padding: theme.spacing.l1,
		height: "calc(100vh - 45px)",
	},
	title: {
		display: "block",
	},
	subTitle: {
		display: "block",
		margin: 0,
		marginTop: `-${theme.spacing.m}`
	}
}));

export function Page(props: PropsWithChildren<PageProps>) {

	const styles = useStyles();

	return <div className={props.verticalFill ? styles.verticalFill : styles.page}>
		<hgroup>
			{props.title && <Text as="h1" className={styles.title} variant="xLarge">{props.title}</Text>}
			{props.subTitle && <Text as="h2" className={styles.subTitle} variant="small">{props.subTitle}</Text>}
		</hgroup>
		{props.children}
	</div>;
}


if (import.meta.env.DEV)
	Page.whydidyourender = true;
