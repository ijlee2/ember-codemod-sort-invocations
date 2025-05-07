import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { canSkipSortAttributes } from '../../../../src/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > canSkip returns true', function () {
  const oldFile = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `  {{on "click" this.doSomething}}`,
    `/>`,
  ].join('\n');

  const traverse = AST.traverse();

  traverse(oldFile, {
    ElementNode(node) {
      const { attributes } = node;

      assert.strictEqual(canSkipSortAttributes(attributes), true);
    },
  });
});
