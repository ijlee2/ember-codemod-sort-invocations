import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { sortAttributes } from '../../../../src/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > sort', function () {
  const oldFile = [
    `<Ui::Button`,
    `  {{on "click" this.doSomething}}`,
    `  @type="submit"`,
    `  ...attributes`,
    `  data-test-button`,
    `  @label="Submit form"`,
    `/>`,
  ].join('\n');

  const traverse = AST.traverse();

  const ast = traverse(oldFile, {
    ElementNode(node) {
      const { attributes } = node;

      node.attributes = sortAttributes(attributes);
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `<Ui::Button`,
      `  @label="Submit form" @type="submit" data-test-button ...attributes {{on "click" this.doSomething}}`,
      `/>`,
    ].join('\n'),
  );
});
