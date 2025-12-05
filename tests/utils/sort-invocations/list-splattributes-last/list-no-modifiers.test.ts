import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > list (no modifiers)', function () {
  let file = normalizeFile([
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `/>`,
  ]);

  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button`,
      `  ...attributes`,
      `/>`,
    ]),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button`,
      `  ...attributes`,
      `/>`,
    ]),
  );
});
