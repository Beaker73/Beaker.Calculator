import { useMemo } from "react";
import { mergeStyleSets } from "@fluentui/react";

import { Item } from "../Model";
import { useItemContextMenu } from "./ItemContextMenu";

export interface ItemIconProps {
	item: Item
	size: number,
}

const knownSizes = [32, 64, 256];

export function ItemIcon(props: ItemIconProps) {

	const { item, size } = props;
	const { name, iconName } = item ?? {};

	const bestSize = knownSizes.find(s => s >= size);
	const path = bestSize && iconName ? `/icons/${bestSize}/${iconName}.png` : undefined;

	const imageStyle = useMemo(() => {
		return mergeStyleSets({
			icon: {
				width: size,
				height: size,
			}
		});
	}, [size]);

	const [ref, menu, openContext] = useItemContextMenu<HTMLImageElement>(item);

	return <>
		<img ref={ref} alt={name} title={name} src={path} className={imageStyle.icon} onContextMenu={openContext} />
		{ menu }
	</>;
}
