import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { sortModifiers } from '../../../../src/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > sort (2)', function () {
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

  const ast = traverse(oldFile, {
    ElementNode(node) {
      const { modifiers } = node;

      node.modifiers = sortModifiers(modifiers);
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `<div`,
      `  {{on "click" this.trackEvent}} {{on "click" this.submitForm}} {{on "mouseenter" (fn this.setFocus true)}} {{on "mouseleave" (fn this.setFocus false)}}`,
      `>`,
      `  Submit form`,
      `</div>`,
    ].join('\n'),
  );
});
