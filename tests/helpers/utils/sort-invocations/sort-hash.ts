import { AST } from '@codemod-utils/ast-template';

import {
  canSkipSortHash,
  sortHash,
} from '../../../../src/utils/sort-invocations/sort-hash.js';

export function canSkip(file: string): boolean | undefined {
  let canSkip: boolean | undefined = undefined;

  AST.traverse(file, {
    MustacheStatement(node) {
      const { hash } = node;

      canSkip = canSkipSortHash(hash);
    },
  });

  return canSkip;
}

export function updateFile(file: string): string {
  const ast = AST.traverse(file, {
    MustacheStatement(node) {
      const { hash } = node;

      node.hash = sortHash(hash);
    },
  });

  return AST.print(ast);
}
