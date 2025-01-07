import { useEffect, useRef, useState } from "react";
import type { JestExecError, TestsByFile } from "../../types";

interface TestListState {
	error?: JestExecError;
	data: TestsByFile[];
	loading: boolean;
}

export function useTestsList(promise: Promise<TestsByFile[]>) {
	const [state, setState] = useState<TestListState>({
		loading: true,
		data: [],
	});

	useEffect(() => {
		let valid = true;

		promise
			.then((results) => {
				if (valid) {
					setState({ loading: false, data: results });
				}
			})
			.catch((error) => {
				if (valid) {
					setState({ loading: false, data: [], error });
				}
			});

		return () => {
			valid = false;
		};
	}, [promise]);

	return state;
}
