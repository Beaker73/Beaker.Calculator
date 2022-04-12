import { createContext, Dispatch, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ContextualMenu, IContextualMenuItem, Target } from "@fluentui/react";
import { useId } from "./Id";

interface MenuState {
	id: string,
	items: IContextualMenuItem[],
	element?: HTMLElement,
	target?: Target,
	visible: boolean,
}
interface State {
	menus: Record<string, MenuState>,
}

interface Context {
	state: State,
	dispatch?: Dispatch<Action>,
}

const initialState: State = { menus: {} };
const initialContext: Context = { state: initialState };

const context = createContext(initialContext);

export function useContextMenu(menuItems: IContextualMenuItem[]) {

	const id = useId("context");

	const { dispatch } = useContext(context);
	useEffect(() => {
		if (dispatch && menuItems) {
			dispatch({ type: "add", payload: { id, items: menuItems } });
			return () => dispatch({ type: "remove", payload: { id, items: menuItems } });
		}
	}, [dispatch, id, menuItems]);

	const [element, setElement] = useState<HTMLElement | null>(null);

	const show = useCallback((event: MouseEvent) => {
		if (dispatch)
			dispatch({ type: "show", payload: { id, event } });
	}, [dispatch, id]);

	useEffect(() => {
		if (element) {
			element.addEventListener("contextmenu", show);
			if (dispatch)
				dispatch({ type: "setElement", payload: { id, element } });
			return () => element.removeEventListener("contextmenu", show);
		}
	}, [dispatch, element, id, show]);

	return [setElement];
}

export function ContextMenuProvider(props: PropsWithChildren<object>) {

	// suppress any context menus
	useEffect(() => {
		document.body.addEventListener("contextmenu", suppress);
		return () => document.body.removeEventListener("contextmenu", suppress);

		function suppress(event: MouseEvent) {
			event.preventDefault();
			return false;
		}
	}, []);

	const [state, dispatch] = useReducer(reduce, initialState);

	const contextValue = useMemo<Context>(() => ({ state, dispatch }), [state]);
	const visibleMenu = Object.values(contextValue.state.menus).find(m => m.visible === true);

	const dismiss = useCallback(() => {
		if (dispatch && visibleMenu)
			dispatch({ type: "hide", payload: { id: visibleMenu.id } });
	}, [dispatch, visibleMenu]);

	return <context.Provider value={contextValue}>
		{props.children}
		{visibleMenu && <ContextualMenu key={visibleMenu.id} target={visibleMenu.target ?? visibleMenu.element} hidden={false} items={visibleMenu.items} onDismiss={dismiss} />}
	</context.Provider>;
}

type ActionAdd = {
	type: "add",
	payload: { id: string, items: IContextualMenuItem[] },
};

type ActionRemove = {
	type: "remove",
	payload: { id: string, items: IContextualMenuItem[] },
};

type ActionSetElement = {
	type: "setElement",
	payload: { id: string, element: HTMLElement },
};

type ActionShow = {
	type: "show",
	payload: { id: string, event: MouseEvent },
}

type ActionHide = {
	type: "hide",
	payload: { id: string },
}

type Action = ActionAdd | ActionRemove | ActionSetElement | ActionShow | ActionHide;

function reduce(state: State, action: Action) {
	switch (action.type) {
		case "add": return reduceAdd(state, action);
		case "remove": return reduceRemove(state, action);
		case "setElement": return reduceSetElement(state, action);
		case "show": return reduceShow(state, action);
		case "hide": return reduceHide(state, action);
	}
}

function reduceAdd(state: State, action: ActionAdd) {
	return {
		...state,
		menus: {
			...state.menus,
			[action.payload.id]: {
				...state.menus[action.payload.id],
				id: action.payload.id,
				items: [
					...state.menus[action.payload.id]?.items ?? [],
					...action.payload.items,
				]
			}
		},
	};
}

function reduceRemove(state: State, action: ActionRemove) {
	return {
		...state,
		menus: {
			...state.menus,
			[action.payload.id]: {
				...state.menus[action.payload.id],
				items: (state.menus[action.payload.id].items ?? []).filter(i => action.payload.items.some(si => si.key === i.key)),
			}
		},
	};
}

function reduceSetElement(state: State, action: ActionSetElement) {
	return {
		...state,
		menus: {
			...state.menus,
			[action.payload.id]: {
				...state.menus[action.payload.id],
				reference: action.payload.element,
			},
		},
	};
}

function reduceShow(state: State, action: ActionShow): State {
	return {
		...state,
		menus:
			// set all visibilities to false, except the one being shown
			Object.fromEntries(
				Object.entries(state.menus)
					.map(([id, menu]) => [id, ({
						...menu,
						visible: id === action.payload.id,
						target: id === action.payload.id ? action.payload.event : undefined,
					})]) ?? []),
	};
}

function reduceHide(state: State, action: ActionHide): State {
	return {
		...state,
		menus: {
			...state.menus,
			[action.payload.id]: {
				...state.menus[action.payload.id],
				visible: false,
			}
		},
	};
}