import { useCallback, useMemo } from "react";
import { ContextualMenuItemType, IContextualMenuItem, mergeStyleSets, useTheme } from "@fluentui/react";

import { Item } from "../Model";
import { useContextMenu } from "../Hooks";
import { navigate } from "raviger";

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

	const [setElement] = useItemContextMenu(item);
	return <img ref={setElement} alt={name} title={name} src={path} className={imageStyle.icon} />;
}

function useItemContextMenu(item: Item) {

	const { key, stackSize, sinkValue, wikiUri } = item;

	const theme = useTheme();
	const noHoverItemProps = useMemo(() => ({
		itemProps: {
			styles: {
				root: {
					cursor: "default",
					background: "transparent !important",
				},
				icon: {
					color: theme.semanticColors.inputIconDisabled,
				}
			}
		}
	}), [theme]);

	const gotoEncyclopedia = useCallback(() => {
		navigate(`/encyclopedia/${key}`);
	}, [key]);
	const openWiki = useCallback(() => {
		window.open(wikiUri, "_blank")?.focus();
	}, [wikiUri]);

	const items = useMemo<IContextualMenuItem[]>(() => {

		const infoItems: IContextualMenuItem[] = [];
		if (stackSize)
			infoItems.push({ key: "stackSize", name: "Stack size", iconProps: { iconName: "Stack" }, secondaryText: stackSize.toString(), ...noHoverItemProps });
		if (sinkValue)
			infoItems.push({ key: "sinkValue", name: "Sink value", iconProps: { iconName: "RecycleBin" }, secondaryText: sinkValue.toString(), ...noHoverItemProps });

		return [{
			key: "navSection", itemType: ContextualMenuItemType.Section, sectionProps: {
				bottomDivider: true,
				title: "Navigation",
				items: [
					{ key: "encyclopedia", name: "Goto Encyclopedia", iconProps: { iconName: "ReadingMode" }, onClick: gotoEncyclopedia },
					{ key: "wiki", name: "Open Wiki", iconProps: { iconName: "Globe" }, onClick: openWiki },
				]
			}
		},
		{
			key: "infoSection", itemType: ContextualMenuItemType.Section, sectionProps: {
				title: "Basic Information",
				items: infoItems,
			}
		}];
	}, [stackSize, noHoverItemProps, sinkValue, gotoEncyclopedia, openWiki]);

	return useContextMenu(items);

}
