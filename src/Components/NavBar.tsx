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

	const data = useMemo<INavLinkGroup[]>(() => ([
		{
			links: [
				{ key: "home", name: "Home", url: "/", iconProps: { iconName: "Home" } },
				{ key: "calculator", name: "Calculator", url: "/calculator", iconProps: { iconName: "Calculator" } },
				{ key: "map", name: "Map", url: "/map", iconProps: { iconName: "World" } },
			]
		}
	]), []);

	const groups = useMemo<INavLinkGroup[]>(() => {
		return data.map<INavLinkGroup>(g => ({
			...g,
			links: g.links.map<INavLink>(l => ({
				...l,
				onClick: followLink,
				forceAnchor: true,
			}))
		}));
	}, [data, followLink]);

	return <Nav groups={groups} />;
}

if (import.meta.env.DEV)
	NavBar.whydidyourender = true;
