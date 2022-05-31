import { App } from "../App";

export enum Application {
	Factorio = "Factorio",
	Foundry = "Foundry",
	Satisfactory = "Satisfactory",
}

export interface ContextStore {
	application: Application,
}

export const contextStore: ContextStore = {
	application: Application.Foundry,
};