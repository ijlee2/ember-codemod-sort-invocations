import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-hash.js';

test('utils | sort-invocations | sort-hash > sort', function () {
  let file = normalizeFile([
    `{{t`,
    `  "my-component.description"`,
    `  packageVersion="6.0.0"`,
    `  packageName="ember-source"`,
    `  installedOn=this.installationDate`,
    `}}`,
  ]);

  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `{{t`,
      `  "my-component.description"`,
      `  installedOn=this.installationDate`,
      `  packageName="ember-source"`,
      `  packageVersion="6.0.0"`,
      `}}`,
    ]),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `{{t`,
      `  "my-component.description"`,
      `  installedOn=this.installationDate`,
      `  packageName="ember-source"`,
      `  packageVersion="6.0.0"`,
      `}}`,
    ]),
  );
});
