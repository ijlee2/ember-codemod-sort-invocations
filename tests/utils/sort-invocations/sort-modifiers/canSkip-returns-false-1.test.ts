import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { canSkipSortModifiers } from '../../../../src/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns false (1)', function () {
  const oldFile = [
    `<button`,
    `  {{on "click" @onSubmit}}`,
    `  {{autofocus}}`,
    `>`,
    `  Submit form`,
    `</button>`,
  ].join('\n');

  const traverse = AST.traverse();

  traverse(oldFile, {
    ElementNode(node) {
      const { modifiers } = node;

      assert.strictEqual(canSkipSortModifiers(modifiers), false);
    },
  });
});
