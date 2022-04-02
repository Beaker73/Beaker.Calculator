import { useContext, createContext, useEffect, useReducer, useMemo, Dispatch } from "react";
import { ICommandBarItemProps } from "@fluentui/react";

export interface CommandBarContextState {
	order: string[];
	commands: ICommandBarItemProps[];
}

export interface ICommandBarContext {
	state: CommandBarContextState;
	dispatch: Dispatch<CommandBarAction> | null;
}

export interface CommandBarAction {
	type: string;
	payload: {
		commands: ICommandBarItemProps[];
	};
}

const initialState: CommandBarContextState = { order: [], commands: [] };
const CommandBarContext = createContext<ICommandBarContext>({ state: initialState, dispatch: null });

function reducer(state: CommandBarContextState, action: CommandBarAction): CommandBarContextState {

	switch (action.type) {
		case "add": {
			// determine order, based on first time add (so mutations do not move item to back of list)
			const order = [...state.order];
			for (const command of action.payload.commands) {
				if (order.indexOf(command.key) === -1)
					order.push(command.key);
			}
			// build a new commands list in correct order
			const commands: ICommandBarItemProps[] = [];
			for (const key of order) {
				const command = action.payload.commands.find(cmd => cmd.key === key) ?? state.commands.find(cmd => cmd.key === key);
				if (command)
					commands.push(command);
			}
			return { order, commands };
		}
		case "remove":
			if (state.commands.length === 0) {
				break;
			}
			{
				const newState: ICommandBarItemProps[] = [...state.commands];
				for (const command of action.payload.commands) {
					const ix: number = newState.findIndex(i => i.key === command.key);
					if (ix >= 0)
						newState.splice(ix, 1);
				}
				return { order: state.order, commands: newState };
			}
	}

	return state;
}

export function useCommandBarItems() {
	const { state: { commands } } = useContext(CommandBarContext);
	return commands;
}

export function CommandBarProvider(props: React.PropsWithChildren<unknown>): JSX.Element {

	const [state, dispatch] = useReducer(reducer, initialState);
	const value: ICommandBarContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <CommandBarContext.Provider value={value}>
		{props.children}
	</CommandBarContext.Provider>;
}

export function useCommandBar(commands: ICommandBarItemProps[]): void {
	const { dispatch } = useContext(CommandBarContext);
	useEffect(() => {
		if (dispatch) {
			dispatch({ type: "add", payload: { commands } });
			return () => dispatch({ type: "remove", payload: { commands } });
		}
	}, [commands, dispatch]);
}
