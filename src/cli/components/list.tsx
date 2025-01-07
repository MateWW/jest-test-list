import { Box } from "ink";
import type { TestsByFile } from "../../types";
import { useMemo } from "react";
import { format } from "../format";
import path from "node:path";
import { flags } from "../args";
import { Text } from "./Text";

interface ListProps {
	items: TestsByFile[];
}

export function List({ items }: ListProps) {
	const formattedItems = useMemo(
		() =>
			items.map((file) => ({
				fileName: path.relative(flags.workingDir, file.filePath),
				tests: format(file.testsTree),
			})),
		[items],
	);

	return (
		<>
			{formattedItems.map((item) => (
				<>
					<Text key={item.fileName} dimColor>
						{item.fileName}
					</Text>
					<Box
						key={`${item.fileName}_box`}
						paddingLeft={2}
						paddingBottom={1}
						flexDirection="column"
					>
						{item.tests?.map(({ depth, parts }, itemIndex) => (
							<Box
								key={`${item.fileName}_${itemIndex}`}
								paddingLeft={depth * 2}
							>
								<Text>
									{parts.map((part, testIndex) => (
										<Text
											key={`${item.fileName}_${itemIndex}_${testIndex}`}
											color={part.color}
										>
											{part.text}
											&nbsp;
										</Text>
									))}
								</Text>
							</Box>
						))}
					</Box>
				</>
			))}
		</>
	);
}
