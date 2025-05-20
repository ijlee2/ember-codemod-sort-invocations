import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { sortHash } from '../../../../src/utils/sort-invocations/sort-hash.js';

test('utils | sort-invocations | sort-hash > sort', function () {
  const oldFile = [
    `{{t`,
    `  "my-component.description"`,
    `  packageVersion="6.0.0"`,
    `  packageName="ember-source"`,
    `  installedOn=this.installationDate`,
    `}}`,
  ].join('\n');

  const traverse = AST.traverse();

  const ast = traverse(oldFile, {
    MustacheStatement(node) {
      const { hash } = node;

      node.hash = sortHash(hash);
    },
  });

  const newFile = AST.print(ast);

  assert.strictEqual(
    newFile,
    [
      `{{t`,
      `  "my-component.description"`,
      `  installedOn=this.installationDate`,
      `  packageName="ember-source"`,
      `  packageVersion="6.0.0"`,
      `}}`,
    ].join('\n'),
  );
});
