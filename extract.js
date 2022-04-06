//jshint node:true

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

var sourcePath = "D:/Users/beake/Downloads/umodel_win32/UmodelExport/Game/FactoryGame";
var destPath = "D:/Projects/Beaker/Beaker.Calculator/public/icons";

const mapping = [
	["PortableMiner_256", "portable-miner"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkCross_256", "catwalk-cross"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkRamp_256", "catwalk-ramp"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkStairs_256", "catwalk-stairs"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkStraight_256", "catwalk-straight"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkT_256", "catwalk-t"],
	["Buildable/Building/Catwalk/UI/IconDesc_CatwalkTurn_256", "catwalk-turn"],
	["Buildable/Building/Doors/UI/IconDesc_AutomatedGate_256", "gate-automated"],
	["Buildable/Building/Doors/UI/IconDesc_AutomatedGate_256", "gate-automated"],
	["Buildable/Building/Fence/UI/IconDesc_ConcreteBarrier_256", "barrier-concrete"],
	["Buildable/Building/Fence/UI/IconDesc_Fences_256", "fence-classic"],
	["Buildable/Building/Fence/UI/IconDesc_Railing_256", "fence-modern"],
	["Buildable/Building/Foundation/UI/Foundation_Glass_256", "foundation-glass"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_ConcFoundation1m_256", "foundation-1m-concrete"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_ConcFoundation2m_256", "foundation-2m-concrete"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_ConcFoundation4m_256", "foundation-4m-concrete"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_FicsitFoundation1m_256", "foundation-1m-ficsit"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_FicsitFoundation2m_256", "foundation-2m-ficsit"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_FicsitFoundation4m_256", "foundation-4m-ficsit"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_FlatFrame_256", "foundation-frame-flat"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_FoundationFrame_256", "foundation-frame-full"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_PolishFoundation1m_256", "foundation-1m-polished"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_PolishFoundation2m_512", "foundation-2m-polished", true],
	["Buildable/Building/Foundation/UI/U5/IconDesc_PolishFoundation4m_256", "foundation-4m-polished"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_RampFrame_256", "foundation-frame-ramp"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_RampFrameInverted_256", "foundation-frame-ramp-inverted"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_SteelFoundation1m_256", "foundation-1m-steel"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_SteelFoundation2m_256", "foundation-2m-steel"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_SteelFoundation4m_256", "foundation-4m-steel"],
	["Buildable/Building/Foundation/UI/U5/IconDesc_WallFrame_256", "foundation-frame-wall"],
	["Buildable/Building/Ladder/UI/IconDesc_Ladder_256", "ladder"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarBaseSmall_256", "pillar-base-small-metal"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarConcBig_256", "pillar-big-concrete"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarConcSmall_256", "pillar-small-concrete"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarFrameBig_256", "pillar-big-frame"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarFrameSmall_256", "pillar-small-frame"],
	["Buildable/Building/Pillars/UI/IconDesc_PillarMetalSmall_256", "pillar-small-metal"],
	["Buildable/Building/Pillars/UI/Pillar_Bottom_256", "pillar-base-big-metal"],
	["Buildable/Building/Pillars/UI/Pillar_Middle_256", "pillar-big-metal"],
	//
	["Resource/Parts/AIlimiter/UI/IconDesc_AILimiter_256", "ai-limiter"],
	["Resource/Parts/Alumina/UI/IconDesc_PackagedAluminaSolution_256", "alumina-solution-packaged"],
	//
	["Resource/RawResources/Coal/UI/IconDesc_CoalOre_256", "coal"],
	["Resource/RawResources/CrudeOil/UI/LiquidOil_Pipe_256", "oil-pipe"],
	["Resource/RawResources/CrudeOil/UI/Oil_256", "oil-barel"],
	["Resource/RawResources/CrudeOil/UI/OilResidue_256", "oil-residue-barel"],
	["Resource/Nodes/UI/IconDesc_Bauxite_256", "bauxite"],
	["Resource/Nodes/UI/IconDesc_CateriumOre_256", "caterium"],
	["Resource/Nodes/UI/IconDesc_copper_new_256", "copper"],
	["Resource/Nodes/UI/IconDesc_iron_new_256", "iron"],
	["Resource/OreUranium/UI/IconDesc_UraniumOre_256", "iron"],
	["Resource/SAM/UI/SAMOre_256", "sam"],
	["Resource/Stone/UI/Stone_256", "limestone"],
	["Resource/Sulfur/UI/Sulfur_256", "sulfur"],
	["Resource/Water/UI/LiquidWater_Pipe_256", "water-pipe"],
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

async function process() {
	console.log("process");
	for (const [source, dest, scale] of mapping) {

		console.log(`${source} => ${dest}`);
		const fromPath = path.join(sourcePath, source + ".png");

		const toPath256 = path.join(destPath + "/256", dest + ".png");
		if (scale === true) {
			new Promise((resolve, reject) => {
				sharp(fromPath)
					.resize({ height: 256 })
					.toFile(toPath256)
					.then(resolve)
					.catch(error => reject(error));
			});
		}
		else {
			await fs.promises.copyFile(fromPath, toPath256);
		}

		const toPath32 = path.join(destPath + "/32", dest + ".png");
		new Promise((resolve, reject) => {
			sharp(fromPath)
				.resize({ height: 32 })
				.toFile(toPath32)
				.then(resolve)
				.catch(error => reject(error));
		});

		const toPath64 = path.join(destPath + "/64", dest + ".png");
		new Promise((resolve, reject) => {
			sharp(fromPath)
				.resize({ height: 64 })
				.toFile(toPath64)
				.then(resolve)
				.catch(error => reject(error));
		});
	}
}