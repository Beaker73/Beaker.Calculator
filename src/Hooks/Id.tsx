import { useState } from "react";

let number = 0;

export function useId(prefix: string) {
	const [id] = useState<string>(`${prefix}:${number++}`);
	return id;
}