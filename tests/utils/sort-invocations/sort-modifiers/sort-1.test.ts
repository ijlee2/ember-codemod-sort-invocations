import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { sortModifiers } from '../../../../src/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > sort (2)', function () {
  const oldFile = [
    `<button`,
    `  {{on "click" @onSubmit}}`,
    `  {{autofocus}}`,
    `>`,
    `  Submit form`,
    `</button>`,
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
      `<button`,
      `  {{autofocus}} {{on "click" @onSubmit}}`,
      `>`,
      `  Submit form`,
      `</button>`,
    ].join('\n'),
  );
});
