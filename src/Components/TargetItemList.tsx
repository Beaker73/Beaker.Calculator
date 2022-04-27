import { useCallback, useMemo } from "react";
import { DetailsList, IColumn, ICommandBarItemProps } from "@fluentui/react";

import { useCommandBar, usePanel } from "../Hooks";

import { ItemIcon, ItemListPanel } from ".";
import { Item } from "../Model";

export function TargetItemList() {

	const panel = usePanel(ItemListPanel);

	const openAddPanel = useCallback(() => {
		panel.show();
	}, [panel]);

	const commands = useMemo<ICommandBarItemProps[]>(() => ([
		{ key: "add", name: "Add Item", iconProps: { iconName: "Add" }, onClick: openAddPanel }
	]), [openAddPanel]);
	useCommandBar(commands);

	const renderIcon = useCallback((item: Item) => {
		return item ? <ItemIcon item={item} size={32} /> : undefined;
	}, []);

	const columns = useMemo<IColumn[]>(() => [
		{ key: "icon", name: "Icon", fieldName: "icon", minWidth: 32, maxWidth: 32, isIconOnly: true, renderIcon },
		{ key: "name", name: "Name", fieldName: "name", minWidth: 200, isRowHeader: true },
		{ key: "factories", name: "Factories", fieldName: "factoryCount", minWidth: 80 },
		{ key: "items", name: "Items p/m", fieldName: "itemsPerMinute", minWidth: 80 },
	], [renderIcon]);

	return <DetailsList columns={columns} items={[]} />;
}

if (import.meta.env.DEV)
	TargetItemList.whydidyourender = true;
