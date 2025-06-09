import { AST } from '@codemod-utils/ast-template';

import {
  canSkipListSplattributesLast,
  listSplattributesLast,
} from '../../../../src/utils/sort-invocations/list-splattributes-last.js';

export function canSkip(file: string): boolean | undefined {
  const traverse = AST.traverse();
  let canSkip: boolean | undefined = undefined;

  traverse(file, {
    ElementNode(node) {
      canSkip = canSkipListSplattributesLast(node);
    },
  });

  return canSkip;
}

export function updateFile(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      listSplattributesLast(node);
    },
  });

  return AST.print(ast);
}
