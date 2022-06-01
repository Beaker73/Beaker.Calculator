import { createTheme, IPartialTheme, ITheme } from "@fluentui/react";
import { action, Action } from "easy-peasy";

export enum Application {
	Factorio = "Factorio",
	Foundry = "Foundry",
	Satisfactory = "Satisfactory",
}

export interface ContextStore {
	application: Application,
	theme: ITheme | null,

	setApp: Action<ContextStore, { app: Application }>,
	setTheme: Action<ContextStore, { theme?: ITheme }>,
}

export const contextStore: ContextStore = {
	application: Application.Foundry,
	theme: null,

	setApp: action((state, { app }) => {
		state.application = app;
	}),
	setTheme: action((state, { theme }) => {
		state.theme = theme ?? null;
	}),
};