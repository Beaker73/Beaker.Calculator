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

		science_pack_1: {
			name: "Science Pack I",
			description: "",
			category: "item",
		},
		tech_science_pack_1: {
			name: "Science Pack I",
			iconName: "science_pack_1",
			description: "A new type of science pack",
			category: "technology",
			unlocks: [
				"science_pack_1",
			],
		},
		high_voltage_energy: {
			name: "High Voltage Energy",
			description: "Establishes a high voltage energy grid with power poles, transformers and generators",
			category: "technology",
			unlocks: [
				"power_line",
				"power_pole_small",
				"transformer_small",
				"solar_panel_small",
			]
		},
		hydraulic_piston: {
			name: "Hydraulic Piston",
			description: "",
			category: "",
		},
		geological_scanner: {
			name: "Geological Scanner",
			description: "",
			category: "",
		},
		mapscan_xenoferrite: {
			name: "Map Scan: Xenoferrite",
			description: "Allows scanning for Xenoferrite on the map. Highlights ore on the surface and within the ground.",
			category: "technology",
			dependencies: ["research_lab_2"],
		},
		ignium_ore_rubble: {
			name: "Ignium Ore Rubble",
			description: "",
			category: "ore",
		},
		conveyor_distributor_3: {
			name: "Conveyor Distributor III",
			description: "",
			category: "",
		},
		logistic_container_1: {
			name: "Logistic Container I",
			description: "",
			category: "",
		},
		character_crafting_speed_1: {
			name: "Character Crafting Speed I",
			description: "Decreases character crafting time by 25%.",
			category: "technology",
			dependencies: ["research_lab_2"],
		},
		conveyor_1: {
			name: "Conveyor I",
			description: "",
			category: "",
			transports: 160
		}
	}
};

export default library;