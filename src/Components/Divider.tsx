import { makeStyles } from "../Hooks";

const useStyles = makeStyles(theme =>({
	divider: {
		borderBottom: `solid 1px ${theme.semanticColors.bodyFrameDivider}`,
	}
}));

export function Divider() {
	const styles = useStyles();
	return <div className={styles.divider} />;
}