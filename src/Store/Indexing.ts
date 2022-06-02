export type Index<TKey extends PropertyKey> = Partial<Record<TKey, IndexNode>>;
export type IndexNode = Record<string, null>;

/** Builds a new index from the ground up */
export function buildIndex<TItem extends { key: string }, TKey extends PropertyKey>(items: TItem[], getIndexKey: (item: TItem) => TKey): Index<TKey> {
	const index: Index<TKey> = {};
	for (const item of items) {
		const key = getIndexKey(item);
		let values = index[key];
		if (values === undefined) {
			values = {};
			index[key] = values;
		}
		values[item.key] = null;
	}
	return index;
}
