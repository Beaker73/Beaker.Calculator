import { Stack } from "@fluentui/react";
import { Card, Page, TargetItemList } from "../Components";
import { makeThemedObjects } from "../Hooks";

const useTokens = makeThemedObjects(theme => ({
	stack: {
		childrenGap: theme.spacing.m,
	}
}));
export function CalculatorPage() {

	const tokens = useTokens();

	return <Page title="Calculator">
		<Stack tokens={tokens.stack}>
			<Card title="Items to manufacture">
				<TargetItemList />
			</Card>
			<Card title="Resources" />
		</Stack>
	</Page>;
}


if (import.meta.env.DEV)
	CalculatorPage.whydidyourender = true;

export default CalculatorPage;