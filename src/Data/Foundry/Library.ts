import { Library } from "../Library";

const library: Library = {
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