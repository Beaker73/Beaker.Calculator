import React, { useContext, createContext, useEffect, useReducer, useMemo, Dispatch, useCallback, MouseEventHandler } from "react";
import { IPanelProps, PanelBase } from "@fluentui/react";
import { useId } from "./Id";

export type PanelComponent = (props: { panelProps?: IPanelProps }) => JSX.Element;

export interface PanelContextState {
	key: string,
	component: PanelComponent,
	panelProps: IPanelProps,
}

export interface PanelContext {
	state: PanelContextState[];
	dispatch: Dispatch<PanelAction> | null;
}

type PanelAction = { type: "add", payload: { key: string, panelComponent: PanelComponent } }
	| { type: "remove", payload: { key: string } }
	| { type: "show", payload: { key: string, resolve: () => void, cancelContext: MouseEventHandler<PanelBase>, } }
	| { type: "hide", payload: { key: string } };

const panelContext = createContext<PanelContext>({ state: [], dispatch: null });

function reducer(state: PanelContextState[], action: PanelAction): PanelContextState[] {

	const existing = state.find(s => s.key === action.payload.key);
	const newState = state.filter(i => i.key !== action.payload.key);

	switch (action.type) {

		case "add":
			return [
				...newState,
				{
					key: action.payload.key,
					component: action.payload.panelComponent,
					panelProps: {
						isOpen: false,
						isBlocking: true,
						isLightDismiss: true,
					},
				},
			];

		case "remove": {
			return newState;
		}

		case "show":
			if (existing)
				return [
					...newState,
					{
						...existing,
						panelProps: {
							...existing.panelProps,
							isOpen: true,
							onContextMenu: action.payload.cancelContext,
							onDismiss: action.payload.resolve,
						}
					}];
			break;

		case "hide":
			if (existing)
				return [
					...newState,
					{
						...existing,
						panelProps: {
							...existing.panelProps,
							isOpen: false,
							onContextMenu: undefined,
							onDismiss: undefined,
						},
					}];
			break;
	}

	return state;
}

export function PanelProvider(props: React.PropsWithChildren<unknown>): JSX.Element {

	const [state, dispatch] = useReducer(reducer, []);
	const value: PanelContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <panelContext.Provider value={value}>
		{props.children}
		{state.map(context => {
			if (!context.panelProps.isOpen)
				return null;

			return <context.component key={context.key} panelProps={context.panelProps} />;
		})}
	</panelContext.Provider>;
}


export interface PanelManager {
	show(): Promise<void>,
	hide(): void,
}

export function usePanel(panelComponent: PanelComponent): PanelManager {

	const key = useId("panel");

	const { dispatch } = useContext(panelContext);

	const cancelContext = useCallback<MouseEventHandler<PanelBase>>(event => {
		if (event) {
			event.preventDefault();
			return false;
		}
	}, []);

	const show = useCallback(() => {
		if (dispatch) {
			return new Promise<void>((resolve) => {
				dispatch({ type: "show", payload: { key, resolve: close, cancelContext } });
				function close() {
					if (dispatch)
						dispatch({ type: "hide", payload: { key } });
					resolve();
				}
			});
		}
		return Promise.resolve();
	}, [cancelContext, dispatch, key]);

	const hide = useCallback(() => {
		if (dispatch)
			dispatch({ type: "hide", payload: { key } });
	}, [dispatch, key]);

	const manager = useMemo<PanelManager>(() => ({ show, hide }), [show, hide]);

	useEffect(() => {
		if (dispatch) {
			dispatch({ type: "add", payload: { key, panelComponent } });
			return () => dispatch({ type: "remove", payload: { key } });
		}
	}, [dispatch, key, panelComponent]);

	return manager;
}
