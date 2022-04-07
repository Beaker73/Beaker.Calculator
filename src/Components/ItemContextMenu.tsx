import { MutableRefObject, SyntheticEvent, useState, useCallback, useRef, useMemo } from "react";
import { useTheme, IContextualMenuItem, ContextualMenuItemType, ContextualMenu, Target } from "@fluentui/react";
import { navigate } from "raviger";

import { Item } from "../Model";
import { useStoreState } from "../Store";

export function useItemContextMenu<TElement extends HTMLElement>(item: string | Item): [MutableRefObject<TElement | null>, JSX.Element, (event: SyntheticEvent<TElement, MouseEvent>) => void] {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openContext = useCallback((event: SyntheticEvent<TElement, MouseEvent>) => {
		event.preventDefault();
		setIsOpen(true);
		return false;
	}, [setIsOpen]);

	const closeContext = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const elementRef = useRef<TElement | null>(null);
	const component = <ItemContextMenu item={item} target={elementRef} isOpen={isOpen} onDismiss={closeContext} />;

	return [elementRef, component, openContext];
}

export interface ItemContextMenuProps {
	item: string | Item,
	target: Target,
	isOpen?: boolean,
	onDismiss?(): void,
}

export function ItemContextMenu(props: ItemContextMenuProps) {

	const { item, target, isOpen, onDismiss } = props;

	const retrievedItem = useStoreState(state => typeof item === "string" ? state.items.getItemByKey(item) : undefined);
	const finalItem = typeof item === "string" ? retrievedItem : item;

	return <>
		{finalItem && <ItemContextMenuCore item={finalItem} target={target} isOpen={isOpen} onDismiss={onDismiss} />}
	</>;
}

interface ItemContextMenuCoreProps {
	item: Item,
	target: Target,
	isOpen?: boolean,
	onDismiss?(): void,
}

function ItemContextMenuCore(props: ItemContextMenuCoreProps) {

	const { item, target, isOpen, onDismiss } = props;
	const { key, stackSize, sinkValue, wikiUri } = item ?? {};

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

	return <ContextualMenu items={items} target={target} hidden={!isOpen} onDismiss={onDismiss} />;

}