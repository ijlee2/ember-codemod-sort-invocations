import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { canSkipSortAttributes } from '../../../../src/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > canSkip returns false', function () {
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

  traverse(oldFile, {
    ElementNode(node) {
      const { attributes } = node;

      assert.strictEqual(canSkipSortAttributes(attributes), false);
    },
  });
});
