import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { useMemo } from "react";

export function AppBar() {

	const items = useMemo<ICommandBarItemProps[]>(() => ([
	]), []);

	return <CommandBar items={items} />;
}

if(import.meta.env.DEV)
	AppBar.whydidyourender = true;
