import { DetailsList, IColumn, IPanelProps, Panel, Stack, TextField } from "@fluentui/react";
import { useCallback, useMemo, useState } from "react";
import { useStoreState } from "../Store";
import { Item } from "../Model";
import { ItemIcon } from "./ItemIcon";

export interface ItemListPanelProps {
	panelProps?: IPanelProps,
}

export function ItemListPanel(props: ItemListPanelProps) {

	const items = useStoreState(state => state.items.all);

	const renderIcon = useCallback((item: Item) => {
		return <ItemIcon path={item.iconName} name={item.name} size={32} />;
	}, []);

	const renderName = useCallback((item: Item) => {
		return <Stack verticalFill verticalAlign="center">{item.name}</Stack>;
	}, []);

	const columns = useMemo<IColumn[]>(() => ([
		{ key: "icon", name: "Icon", isIconOnly: true, minWidth: 32, onRender: renderIcon },
		{ key: "name", name: "Name", fieldName: "name", minWidth: 170, isRowHeader: true, onRender: renderName }
	]), [renderIcon, renderName]);

	const [searchTerm, setSearchTerm] = useState("");
	const updateSearchTerm = useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
		setSearchTerm(newValue ?? "");
	}, [setSearchTerm]);

	const filteredItems = useMemo(() => {
		return searchTerm == "" ? items : items.filter(i => i.name.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1, []);
	}, [items, searchTerm]);

	return <Panel {...props.panelProps} headerText="Items">
		<Stack verticalFill>
			<Stack.Item shrink>
				<TextField label="Search" value={searchTerm} onChange={updateSearchTerm} iconProps={{ iconName: "Search" }} />
			</Stack.Item>
			<Stack.Item grow>
				<DetailsList columns={columns} items={filteredItems} />
			</Stack.Item>
		</Stack>
	</Panel>;
}

if (import.meta.env.DEV)
	ItemListPanel.whydidyourender = true;
