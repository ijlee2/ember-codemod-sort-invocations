import { AST } from '@codemod-utils/ast-template';

import {
  canSkipSortAttributes,
  sortAttributes,
} from '../../../../src/utils/sort-invocations/sort-attributes.js';

export function canSkip(file: string): boolean | undefined {
  const traverse = AST.traverse();
  let canSkip: boolean | undefined = undefined;

  traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      canSkip = canSkipSortAttributes(attributes);
    },
  });

  return canSkip;
}

export function updateFile(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      node.attributes = sortAttributes(attributes);
    },
  });

  return AST.print(ast);
}
