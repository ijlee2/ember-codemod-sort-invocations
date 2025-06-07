import { AST } from '@codemod-utils/ast-template';

import {
  canSkipSortModifiers,
  sortModifiers,
} from '../../../../src/utils/sort-invocations/sort-modifiers.js';

export function canSkip(file: string): boolean | undefined {
  const traverse = AST.traverse();
  let canSkip: boolean | undefined = undefined;

  traverse(file, {
    ElementNode(node) {
      const { modifiers } = node;

      canSkip = canSkipSortModifiers(modifiers);
    },
  });

  return canSkip;
}

export function updateFile(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      const { modifiers } = node;

      node.modifiers = sortModifiers(modifiers);
    },
  });

  return AST.print(ast);
}
