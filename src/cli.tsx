import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

// import {extractTree} from './api'
// import arg from 'arg'
// import type { ExtendedTreeItem, TestsByFile } from './types';

// const args = arg({
//   '--format': String,
// }, {argv: process.argv});

// const format = args['--format'] ?? 'inline';

// if(!['inline', 'tree'].includes(format)) {
//   console.error(`Invalid format "${format}", must be one of "inline" or "tree"`);
//   process.exit(1);
// }

// function printTree(result: TestsByFile[]) {
//   function printChildren(children: ExtendedTreeItem[], indent: number = 0) {
//     children.forEach((child) => {
//       console.log(`${' '.repeat(indent * 2)}${child.describe}`);
//       if('children' in child && child.children) {
//         printChildren(child.children, indent + 1);
//       }
//     });
//   }

//   result.forEach((file) => {
//     console.log(file.filePath);
//     printChildren(file.testsTree);
//   });
// } 

// function printInline(result: TestsByFile[]) {
//   function printChildren(children: ExtendedTreeItem[], ancestors: string = '') {
//     children.forEach((child) => {
//       const title = `${ancestors} ${child.describe}`;
//       if('children' in child && child.children) {
//         printChildren(child.children, title);
//       } else {
//         console.log(title);
//       }
//     });
//   }

//   result.forEach((file) => {
//     console.log(file.filePath);
//     printChildren(file.testsTree);
//   });
// } 

// function printResults(results: TestsByFile[]) {
//   if(format === 'inline'){
//     printInline(results);
//   } else {
//     printTree(results);
//   }
// }

// extractTree().then((result) => {
//   printResults(result);
// }).finally(() => {process.exit(0)});

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);