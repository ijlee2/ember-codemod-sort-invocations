import { AST } from '@codemod-utils/ast-template';
import { assert, test } from '@codemod-utils/tests';

import { canSkipSortHash } from '../../../../src/utils/sort-invocations/sort-hash.js';

test('utils | sort-invocations | sort-hash > canSkip returns false', function () {
  const oldFile = [
    `{{t`,
    `  "my-component.description"`,
    `  packageVersion="6.0.0"`,
    `  packageName="ember-source"`,
    `  installedOn=this.installationDate`,
    `}}`,
  ].join('\n');

  const traverse = AST.traverse();

  traverse(oldFile, {
    MustacheStatement(node) {
      const { hash } = node;

      assert.strictEqual(canSkipSortHash(hash), false);
    },
  });
});
