import { createTheme, IPartialTheme, ITheme } from "@fluentui/react";
import { action, Action } from "easy-peasy";
import { App } from "../App";

export enum Application {
	Factorio = "Factorio",
	Foundry = "Foundry",
	Satisfactory = "Satisfactory",
}

export interface ContextStore {
	application: Application,
	theme: ITheme | null,

	setTheme: Action<ContextStore, { theme?: IPartialTheme }>,
}

export const contextStore: ContextStore = {
	application: Application.Foundry,
	theme: null,

	setTheme: action((state, { theme }) => {
		state.theme = theme ? createTheme(theme) : null;
	}),
};