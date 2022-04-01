import { CommandBar } from "@fluentui/react";
import { useMemo } from "react";

export function AppBar() {

	const items = useMemo(() => ({

	}), []);

	return <CommandBar items={[]} />
}