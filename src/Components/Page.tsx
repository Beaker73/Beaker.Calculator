import { IContextualMenuItem, Text } from "@fluentui/react";
import { PropsWithChildren, useMemo } from "react";
import { useContextMenu } from "../Hooks/ContextMenu";
import { makeStyles } from "../Hooks/Theming";
import { Heading } from "./Heading";

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
}));

export function Page(props: PropsWithChildren<PageProps>) {

	const styles = useStyles();

	return <div className={props.verticalFill ? styles.verticalFill : styles.page}>
		{props.title && <Heading text={props.title} subText={props.subTitle} />}
		{props.children}
	</div>;
}


if (import.meta.env.DEV)
	Page.whydidyourender = true;
