import { makeStyles } from "../Hooks/Theming";

import { AppBar } from "./AppBar";
import { NavBar } from ".";

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "fixed",
		top: 0,
		width: "100vh",
		height: 44,
	},
	navBar: {
		position: "fixed",
		top: 44,
		height: "calc(100vh - 44px)",
		width: 200,
	},
	page: {
		position: "fixed",
		top: 44,
		left: 200,
		width: "calc(100vw - 200px)",
		height: "calc(100vh - 44px)",
	}
}));

export function Shell() {

	const styles = useStyles();

	return <>
		<div className={styles.appBar}>
			<AppBar />
		</div>
		<div className={styles.navBar}>
			<NavBar />
		</div>
		<div className={styles.page}></div>
	</>;
}