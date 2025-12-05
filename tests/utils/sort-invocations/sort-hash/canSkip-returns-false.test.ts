import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-hash.js';

test('utils | sort-invocations | sort-hash > canSkip returns false', function () {
  const file = normalizeFile([
    `{{t`,
    `  "my-component.description"`,
    `  packageVersion="6.0.0"`,
    `  packageName="ember-source"`,
    `  installedOn=this.installationDate`,
    `}}`,
  ]);

  assert.strictEqual(canSkip(file), false);
});
