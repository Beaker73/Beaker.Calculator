import { IPanelProps, Panel } from "@fluentui/react";

export interface ItemListPanelProps {
	panelProps?: IPanelProps,
}

export function ItemListPanel(props: ItemListPanelProps) {
	console.debug("rendering item list panel", props);
	return <Panel {...props.panelProps} />;
}

if (import.meta.env.DEV)
	ItemListPanel.whydidyourender = true;
