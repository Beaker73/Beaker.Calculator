import { IFontStyles, Text } from "@fluentui/react";
import { makeStyles } from "../Hooks";

export interface HeadingProps {
	text?: string,
	subText?: string,
	level?: number,
}

const hMap: React.ElementType<React.HTMLAttributes<HTMLElement>>[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
const variantMap: (keyof IFontStyles)[] = ["xxLarge", "xLarge", "large", "mediumPlus", "medium"];

const useStyles = makeStyles(theme => ({
	title: {
		display: "block",
	},
	subTitle: {
		display: "block",
		margin: 0,
		marginTop: `-${theme.spacing.m}`
	}
}));


export function Heading(props: HeadingProps) {

	const { text, subText } = props;
	const level = props.level ?? 1;
	const styles = useStyles();

	if (!text)
		return <></>;

	if (!subText)
		return <Text as={hMap[level]} className={styles.title} variant={variantMap[level]} > {text}</Text >;

	return <hgroup>
		{<Text as={hMap[level]} className={styles.title} variant={variantMap[level]}>{text}</Text>}
		{subText && <Text as={hMap[level + 1]} className={styles.subTitle} variant="small">{subText}</Text>}
	</hgroup>;
}