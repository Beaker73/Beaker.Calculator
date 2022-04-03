import { Text } from "@fluentui/react";
import { PropsWithChildren } from "react";
import { makeStyles } from "../Hooks/Theming";

export interface PageProps {
	title?: string;
	verticalFill?: boolean;
}

const useStyles = makeStyles(theme => ({
	page: {
		padding: theme.spacing.l1,
	},
	verticalFill: {
		padding: theme.spacing.l1,
		height: "calc(100vh - 45px)",
	}
}));

export function Page(props: PropsWithChildren<PageProps>) {

	const styles = useStyles();

	return <div className={props.verticalFill ? styles.verticalFill : styles.page}>
		{props.title && <Text as="h1" variant="xLarge">{props.title}</Text>}
		{props.children}
	</div>;
}


if (import.meta.env.DEV)
	Page.whydidyourender = true;
