import { AST } from '@codemod-utils/ast-template';

import { listSplattributesLast } from '../../../../src/utils/sort-invocations/list-splattributes-last.js';

export function updateFile(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      // The originally last attribute's location has the highest line number
      const lineNumber = attributes.at(-1)!.loc.start.line;

      listSplattributesLast(node, lineNumber);
    },
  });

  return AST.print(ast);
}
