import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { canSkipSortModifiers } from '../../../../src/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns false (2)', function () {
  const oldFile = [
    `<div`,
    `  {{on "mouseleave" (fn this.setFocus false)}}`,
    `  {{on "click" this.trackEvent}}`,
    `  {{on "mouseenter" (fn this.setFocus true)}}`,
    `  {{on "click" this.submitForm}}`,
    `>`,
    `  Submit form`,
    `</div>`,
  ].join('\n');

  const traverse = AST.traverse();

  traverse(oldFile, {
    ElementNode(node) {
      const { modifiers } = node;

      assert.strictEqual(canSkipSortModifiers(modifiers), false);
    },
  });
});
