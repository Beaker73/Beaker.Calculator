import { useEffect, useState } from "react";
import { LoadingPage } from "./LoadingPage";

export type PageName = "CalculatorPage" | "HomePage" | "EncyclopediaPage" | "MapPage";

export interface AsyncPageProps {
	page: PageName,
	pageProps?: Record<string, unknown>,
}

type PageComponent = (props: Record<string, unknown>) => JSX.Element;

interface AsyncComponent {
	value?: PageComponent;
}

// Vite does not seem to handle the dynamic import using variable to well,
// so we for now we hanlde it explicitly on a one-by-one base
const importers: Record<PageName | "default", () => Promise<PageComponent>> = {
	HomePage: () => import("./HomePage").then(module => module.HomePage),
	CalculatorPage: () => import("./CalculatorPage").then(module => module.CalculatorPage),
	EncyclopediaPage: () => import("./EncyclopediaPage").then(module => module.EncyclopediaPage),
	MapPage: () => import("./MapPage").then(module => module.MapPage),
	default: () => import("./NotFoundPage").then(module => module.NotFoundPage),
};

export function AsyncPage(props: AsyncPageProps) {

	const { page } = props;
	const [component, setComponent] = useState<AsyncComponent>({});

	useEffect(() => {
		const promise = importers[page] ?? importers["default"];
		promise().then(control => {
			setComponent(({ value: control }));
		});
	}, [page]);

	if (!component.value)
		return <LoadingPage />;

	return <component.value {...props.pageProps} />;
}