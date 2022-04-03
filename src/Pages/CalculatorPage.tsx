import { Card, Page, TargetItemList } from "../Components";

export function CalculatorPage() {
	return <Page title="Calculator">
		<Card title="Input">
			<TargetItemList />
		</Card>
	</Page>;
}


if (import.meta.env.DEV)
	CalculatorPage.whydidyourender = true;

export default CalculatorPage;