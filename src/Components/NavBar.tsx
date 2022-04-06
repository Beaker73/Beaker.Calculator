import { useCallback, useMemo, useState } from "react";
import { INavLink, INavLinkGroup, Nav } from "@fluentui/react";
import { navigate } from "raviger";
import { makeStyles } from "../Hooks";

const useNavStyle = makeStyles(() => ({
	chevronButton: {
		display: "none"
	}
}));

export function NavBar() {

	const style = useNavStyle();

	const followLink = useCallback((ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
		if (ev)
			ev.preventDefault();
		if (item) {
			navigate(item.url);
			if (item.key)
				setSelected(item.key);
		}
	}, []);

	const [selected, setSelected] = useState("home");
	const data = useMemo<INavLinkGroup[]>(() => ([
		{
			links: [
				{ key: "home", name: "Home", url: "/", iconProps: { iconName: "Home" } },
				{ key: "calculator", name: "Calculator", url: "/calculator", iconProps: { iconName: "Calculator" } },
				{
					key: "encyclopedia", name: "Encyclopedia", url: "/encyclopedia", iconProps: { iconName: "ReadingMode" },
					links: [
						{ key: "factories", name: "Factories", url: "/encyclopedia/factories", iconProps: { iconName: "Manufacturing" } },
						{ key: "structures", name: "Structures", url: "/encyclopedia/structures", iconProps: { iconName: "DOM" } },
						{ key: "resources", name: "Resources", url: "/encyclopedia/resources", iconProps: { iconName: "StreetsideSplitMinimize" } },
					]
				},
				{ key: "map", name: "Map", url: "/map", iconProps: { iconName: "World" } },
			],
		},
	]), []);

	const groups = useMemo<INavLinkGroup[]>(() => {
		return data.map<INavLinkGroup>(g => ({
			...g,
			links: g.links.map<INavLink>(l => ({
				...l,
				isExpanded: l.key === selected || (l.links?.some(sl => sl.key === selected) ?? false),
				onClick: followLink,
				forceAnchor: true,
				links: l.links?.map<INavLink>(sl => ({
					...sl,
					onClick: followLink,
					forceAnchor: true,
				}))
			}))
		}));
	}, [data, followLink, selected]);

	return <Nav groups={groups} styles={style} />;
}

if (import.meta.env.DEV)
	NavBar.whydidyourender = true;
