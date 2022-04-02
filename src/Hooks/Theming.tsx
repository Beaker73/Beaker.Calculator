import { useMemo } from "react";
import { IStyleSet, ITheme, mergeStyleSets, useTheme } from "@fluentui/react";

export function makeStyles<T extends IStyleSet>(build: (theme: ITheme) => T) {
	return () => {
		const theme = useTheme();
		const style = useMemo(() => {
			return mergeStyleSets(build(theme));
		}, [theme]);

		return style;
	};
}


