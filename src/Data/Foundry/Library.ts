import { Library } from "../Library";

const library: Library = {
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
		hydraulic_piston: {
			key: "hydraulic_piston",
			iconName: "hydraulic_piston",
			name: "Hydraulic Piston",
			description: "",
			category: "",
		},
		geological_scanner: {
			key: "geological_scanner",
			iconName: "geological_scanner",
			name: "Geological Scanner",
			description: "",
			category: "",
		},
		mapscan_xenoferrite: {
			key: "mapscan_xenoferrite",
			iconName: "mapscan_xenoferrite",
			name: "Map Scan: Xenoferrite",
			description: "Allows scanning for Xenoferrite on the map. Highlights ore on the surface and within the ground.",
			category: "technology",
			dependencies: ["research_lab_2"],
		},
		ignium_ore_rubble: {
			key: "ignium_ore_rubble",
			iconName: "ignium_ore_rubble",
			name: "Ignium Ore Rubble",
			description: "",
			category: "ore",
		},
		conveyor_distributor_3: {
			key: "conveyor_distributor_3",
			iconName: "conveyor_distributor_3",
			name: "Conveyor Distributor III",
			description: "",
			category: "",
		},
		logistic_container_1: {
			key: "logistic_container_1",
			iconName: "logistic_container_1",
			name: "Logistic Container I",
			description: "",
			category: "",
		},
		character_crafting_speed_1: {
			key: "character_crafting_speed_1",
			iconName: "character_crafting_speed_1",
			name: "Character Crafting Speed I",
			description: "Decreases character crafting time by 25%.",
			category: "technology",
			dependencies: ["research_lab_2"],
		},
		conveyor_1: {
			key: "conveyor_1",
			iconName: "conveyor_1",
			name: "Conveyor I",
			description: "",
			category: "",
			transports: 160
		}
	}
};

export default library;