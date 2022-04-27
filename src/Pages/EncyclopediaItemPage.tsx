import { Page } from "../Components";
import { EncyclopediaItem } from "../Components/EncyclopediaItem";
import { useStoreState } from "../Store";

export interface EncyclopediaItemPageProps {
	itemKey?: string,
}

export function EncyclopediaItemPage(props: EncyclopediaItemPageProps) {

	const { itemKey } = props;
	const item = useStoreState(state => itemKey ? state.items.data[itemKey] : undefined);

	return <Page title={item?.name}>
		{itemKey && item && <EncyclopediaItem itemKey={itemKey} />}
	</Page>;
}