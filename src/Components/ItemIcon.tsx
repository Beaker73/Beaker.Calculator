import { mergeStyleSets } from "@fluentui/react";
import { useMemo } from "react";

export interface ItemIconProps {
	path: string,
	size: number,
}

export function ItemIcon(props: ItemIconProps) {

	const { path, size } = props;

	const styles = useMemo(() => {
		return mergeStyleSets({
			icon: {
				width: size,
				height: size,
			}
		});
	},[size]);

	return <img src={path} className={styles.icon} />;
}