import { useCallback, useMemo } from "react";
import { DetailsList, ICommandBarItemProps } from "@fluentui/react";

import { useCommandBar, usePanel } from "../Hooks";

import { ItemListPanel } from ".";

export function TargetItemList() {

	const panel = usePanel("target-items", ItemListPanel);

	const openAddPanel = useCallback(() => {
		panel.show();
	}, [panel]);

	const commands = useMemo<ICommandBarItemProps[]>(() => ([
		{ key: "add", name: "Add Item", iconProps: { iconName: "Add" }, onClick: openAddPanel }
	]), [openAddPanel]);
	useCommandBar(commands);

	return <DetailsList items={[]} />;
}

if (import.meta.env.DEV)
	TargetItemList.whydidyourender = true;
