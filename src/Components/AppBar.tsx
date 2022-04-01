import { CommandBar } from "@fluentui/react";
import { useMemo } from "react";

export function AppBar() {

	const items = useMemo(() => ({
	}), []);

	return <CommandBar items={[]} />
}

if(import.meta.env.DEV)
	AppBar.whydidyourender = true;
