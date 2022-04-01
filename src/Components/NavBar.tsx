import { useCallback, useMemo } from "react";
import { INavLink, INavLinkGroup, Nav } from "@fluentui/react";
import { navigate } from "raviger";

export function NavBar() {

	const followLink = useCallback((ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
		if(ev)
			ev.preventDefault();
		if (item)
			navigate(item.url);
	}, []);

	const groups = useMemo<INavLinkGroup[]>(() => ([
		{
			links: [
				{ key: "home", name: "Home", url: "/", iconProps: { iconName: "Home" }, onLinkClick: followLink },
				{ key: "calculator", name: "Calculator", url: "/calculator", iconProps: { iconName: "Calculator" }, onLinkClick: followLink },
				{ key: "map", name: "Map", url: "/map", iconProps: { iconName: "World" }, onLinkClick: followLink },
			]
		}
	]), [followLink]);


	return <Nav groups={groups} />;
}

if (import.meta.env.DEV)
	NavBar.whydidyourender = true;
