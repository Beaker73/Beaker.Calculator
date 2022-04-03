import { Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { Page } from "../Components";

export function LoadingPage() {
	return <Page verticalFill>
		<Stack verticalFill verticalAlign="center" horizontalAlign="center">
			<Spinner size={SpinnerSize.large} label="Lading..." />
		</Stack>
	</Page>;
}