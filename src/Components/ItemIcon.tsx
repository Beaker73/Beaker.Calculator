import { mergeStyleSets } from "@fluentui/react";
import { useMemo } from "react";

export interface ItemIconProps {
	path: string,
	name: string,
	size: number,
}

const knownSizes = [20, 256];

export function ItemIcon(props: ItemIconProps) {

	const { path, size, name } = props;
	const bestSize = knownSizes.find(s => s >= size);

	const styles = useMemo(() => {
		return mergeStyleSets({
			icon: {
				width: size,
				height: size,
			}
		});
	},[size]);

	return <img alt={name} title={name} src={`/icons/${bestSize}/${path}.png`} className={styles.icon} />;
}