import { Page } from "../Components";

export interface EncyclopediaPageProps {
	subSection?: "factories" | "structures" | "resources",
	itemKey?: string,
}

export function EncyclopediaPage(props: EncyclopediaPageProps) {
	const { subSection } = props;

	return <Page title="Encyclopedia" subTitle={subSection}>
		<p>TODO</p>
	</Page>;
}

if (import.meta.env.DEV)
	EncyclopediaPage.whydidyourender = true;

export default EncyclopediaPage;