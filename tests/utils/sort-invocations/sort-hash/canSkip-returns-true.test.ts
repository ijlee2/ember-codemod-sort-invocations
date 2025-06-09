import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-hash.js';

test('utils | sort-invocations | sort-hash > canSkip returns true', function () {
  const file = [
    `{{t`,
    `  "my-component.description"`,
    `  installedOn=this.installationDate`,
    `  packageName="ember-source"`,
    `  packageVersion="6.0.0"`,
    `}}`,
  ].join('\n');

  assert.strictEqual(canSkip(file), true);
});
