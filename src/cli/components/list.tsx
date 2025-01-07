import { Box } from "ink";
import { Text } from "./Text";
import type { FormattedLinesByFile } from "../hooks/useFormattedLinesByFile";

interface ListProps {
	formattedItems: FormattedLinesByFile[];
}

export function List({ formattedItems }: ListProps) {
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
						{item.lines?.map(({ depth, parts }, itemIndex) => (
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
