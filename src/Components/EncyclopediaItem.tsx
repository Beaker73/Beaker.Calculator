import { DetailsList, Stack } from "@fluentui/react";
import { makeStyles, makeThemedObjects } from "../Hooks";
import { useStoreState } from "../Store";
import { Card } from "./Card";
import { Divider } from "./Divider";
import { Heading } from "./Heading";
import { ItemIcon } from "./ItemIcon";

export interface EncyclopediaItemProps {
	itemKey: string,
}

const useThemed = makeThemedObjects(theme => ({
	stack: {
		childrenGap: theme.spacing.l1,
	}
}));

export function EncyclopediaItem(props: EncyclopediaItemProps) {

	const { itemKey } = props;
	const item = useStoreState(state => state.items.data[itemKey]);
	const themed = useThemed();

	return <Stack horizontal tokens={themed.stack}>
		<Stack.Item grow>
			<Stack>
				{item.description && <p>{item.description}</p>}
				<Heading level={2} text="Creation" />
				<Heading level={2} text="Usage" />
			</Stack>
		</Stack.Item>
		<Stack>
			<Card title={item.name}>
				<ItemIcon size={128} item={item} />
				<Divider />
				<ItemCardLine label="Sink value" value={item.sinkValue} />
				<ItemCardLine label="Stack size" value={item.stackSize} />
				<ItemCardLine label="Energy" value={item.energy} ext="MJ" />
			</Card>
		</Stack>
	</Stack>;

}

interface ItemCardLineProps {
	label: string,
	value: string | number | undefined,
	ext?: string,
}

const useItemCardLineStyles = makeStyles(theme => ({
	rowLabel: {
		display: "block",
		...theme.fonts.xSmall,
		color: theme.semanticColors.bodySubtext,
		padding: 0,
		margin: 0,
		textTransform: "uppercase"
	},
	rowValue: {
		display: "block",
		...theme.fonts.medium,
		padding: 0,
		margin: 0,
	},
}));

function ItemCardLine(props: ItemCardLineProps) {

	const { label, value, ext } = props;
	const styles = useItemCardLineStyles();

	if (!value)
		return <></>;

	return <dl>
		<dt className={styles.rowLabel}>{label}</dt>
		<dd className={styles.rowValue}>{value} {ext}</dd>
	</dl>;
}