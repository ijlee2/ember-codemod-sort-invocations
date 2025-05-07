import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { listSplattributesLast } from '../../../../src/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > mod modifiers', function () {
  const oldFile = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `/>`,
  ].join('\n');

  const traverse = AST.traverse();

  const ast = traverse(oldFile, {
    ElementNode(node) {
      const { attributes } = node;

      // The originally last attribute's location has the highest line number
      const lineNumber = attributes.at(-1)!.loc.start.line;

      listSplattributesLast(node, lineNumber);
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button ...attributes`,
      `/>`,
    ].join('\n'),
  );
});
