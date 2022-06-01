//jshint node:true

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const sourcePath = "./Extracts/Foundry/sactx_0_4096x4096_DXT5_SpriteAtlas_Icons256_5bc5edb3-resources.assets-711.png";
const destPath = "./public/icons/Foundry";

const mapping = [
	[0, 0, "hydraulic_piston"],
	[0, 1, "geological_scanner"],
	[1, 1, "mapscan_xenoferrite"],
	[2, 1, "ignium_ore_rubble"],
	[3, 1, "conveyor_distributor_3"],
	[4, 1, "logistic_container_1"],
	[5, 1, "character_crafting_speed_1"],
	[6, 1, "container"],
	[7, 1, "stairs"],
	[8, 4, "science_pack_4"],
	[11, 6, "ignium_fuel_rod"],
	[14, 6, "conveyor_1"],
	[4, 7, "high_voltage_energy"],
	[10, 7, "conveyor_2"],
	[11, 7, "science_packs"],
	[12, 10, "technum_rods"],
	[6, 11, "fuel_rod_casing"],
	[11, 12, "conveyor_3"],
	[2, 13, "science_pack_1"],
	[8, 13, "science_pack_2"],
	[6, 14, "science_pack_3"],
];

main();

async function main() {
	try {
		await process();
	}
	catch (err) {
		console.error(err.message);
	}
}

const sizes = [256, 128, 64, 32];

async function process() {
	const image = await sharp(sourcePath)
		.ensureAlpha()
		.gamma(1, 2.2)
		;

	for (const [x, y, name] of mapping) {

		console.log(`processing ${name}`);

		const tile = image
			.clone()
			.extract({ left: x * 260, top: 200 + y * 260, width: 256, height: 256 });

		for (const size of sizes) {
			const toPathSized = path.join(`${destPath}/${size}`, `${name}.png`);
			await tile
				.resize({ height: size })
				.png()
				.toFile(toPathSized);
		}
	}
}