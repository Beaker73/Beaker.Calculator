import type { BuildingItem } from "./BuildingItem";
import type { ResearchItem } from "./ResearchItem";
import type { ResourceItem } from "./ResourceItem";

export type Item =
	| ResourceItem
	| ResearchItem
	| BuildingItem
	;