import { ItemType } from "../../Model";
import type { LibraryData, ResearchItemData, ResourceItemData, BuildingItemData } from "../Library";

const library: LibraryData = {
	theme: {
		palette: {
			themePrimary: "#0099ff",
			themeLighterAlt: "#00060a",
			themeLighter: "#001829",
			themeLight: "#002e4d",
			themeTertiary: "#005c99",
			themeSecondary: "#0087e0",
			themeDarkAlt: "#19a3ff",
			themeDark: "#3db1ff",
			themeDarker: "#70c6ff",
			neutralLighterAlt: "#2b2b2b",
			neutralLighter: "#333333",
			neutralLight: "#414141",
			neutralQuaternaryAlt: "#4a4a4a",
			neutralQuaternary: "#515151",
			neutralTertiaryAlt: "#6f6f6f",
			neutralTertiary: "#c8c8c8",
			neutralSecondary: "#d0d0d0",
			neutralPrimaryAlt: "#dadada",
			neutralPrimary: "#ffffff",
			neutralDark: "#f4f4f4",
			black: "#f8f8f8",
			white: "#222222",
		}
	},
	items: {

		science_pack_1: {
			type: ItemType.Resource,
			name: "Science Pack I",
			description: "",
		} as ResourceItemData,

		tech_science_pack_1: {
			type: ItemType.Research,
			name: "Science Pack I",
			iconName: "science_pack_1",
			description: "A new type of science pack",
			unlocks: [
				"science_pack_1",
			],
		} as ResearchItemData,

		high_voltage_energy: {
			type: ItemType.Research,
			name: "High Voltage Energy",
			description: "Establishes a high voltage energy grid with power poles, transformers and generators",
			unlocks: [
				"power_line",
				"power_pole_small",
				"transformer_small",
				"solar_panel_small",
			]
		} as ResearchItemData,

		assembler_3_research: {
			type: ItemType.Research,
			name: "Assembler III",
			iconName: "assembler_3",
			description: "Unlocks an even faster assembler.",
			requirements: {
				"science_pack_1": 150,
				"science_pack_2": 150,
				"science_pack_3": 150,
				"science_pack_4": 75,
			},
			dependencies: [
				"research_lab_4",
				"assembler_2",
			],
			unlocks: [
				"assembler_3",
			]
		} as ResearchItemData,

		hangar_gate_research: {
			type: ItemType.Research,
			name: "Hangar Gate",
			description: "Unlocks a hangar gate",
			requirements: {
				"science_pack_1": 40,
				"science_pack_2": 40,
				"science_pack_3": 40,
				"science_pack_4": 20,
			},
			dependencies: [
				"research_lab_4",
				"door_double",
			],
			unlocks: [
				"hangar_gate",
			],
		} as ResearchItemData,

		hydraulic_piston: {
			type: ItemType.Resource,
			name: "Hydraulic Piston",
			description: "",
		} as ResourceItemData,

		geological_scanner: {
			type: ItemType.Resource,
			name: "Geological Scanner",
			description: "",
		} as ResourceItemData,

		mapscan_xenoferrite: {
			type: ItemType.Resource,
			name: "Map Scan: Xenoferrite",
			description: "Allows scanning for Xenoferrite on the map. Highlights ore on the surface and within the ground.",
			dependencies: ["research_lab_2"],
		} as ResourceItemData,

		ignium_ore_rubble: {
			type: ItemType.Resource,
			name: "Ignium Ore Rubble",
			description: "",
		} as ResourceItemData,

		conveyor_distributor_3: {
			type: ItemType.Resource,
			name: "Conveyor Distributor III",
			description: "",
		} as ResourceItemData,

		logistic_container_1: {
			type: ItemType.Resource,
			name: "Logistic Container I",
			description: "",
		} as ResourceItemData,

		character_crafting_speed_1: {
			type: ItemType.Research,
			name: "Character Crafting Speed I",
			description: "Decreases character crafting time by 25%.",
			dependencies: ["research_lab_2"],
		} as ResearchItemData,

		conveyor_1: {
			type: ItemType.Building,
			name: "Conveyor I",
			description: "",
		} as BuildingItemData,
	}
};

export default library;