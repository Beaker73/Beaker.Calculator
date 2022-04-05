import { DetailsList, IColumn, IPanelProps, Panel } from "@fluentui/react";
import { useCallback, useMemo } from "react";
import { useStoreState } from "../Store";
import { Item } from "../Model";
import { ItemIcon } from "./ItemIcon";

export interface ItemListPanelProps {
	panelProps?: IPanelProps,
}

export function ItemListPanel(props: ItemListPanelProps) {

	const items = useStoreState(state => state.items.all);

	const renderIcon = useCallback((item: Item) => {
		return <ItemIcon path={item.iconName} name={item.name} size={20} />;
	}, []);

	const columns = useMemo<IColumn[]>(() => ([
		{ key: "icon", name: "Icon", isIconOnly: true, minWidth: 20, onRender: renderIcon },
		{ key: "name", name: "Name", fieldName: "name", minWidth: 175, isRowHeader: true }
	]), [renderIcon]);

	return <Panel {...props.panelProps} headerText="Items">
		<DetailsList columns={columns} items={items} />
	</Panel>;
}

if (import.meta.env.DEV)
	ItemListPanel.whydidyourender = true;
