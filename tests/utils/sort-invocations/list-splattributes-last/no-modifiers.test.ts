import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > mod modifiers', function () {
  let file = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `/>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button ...attributes`,
      `/>`,
    ].join('\n'),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button ...attributes`,
      `/>`,
    ].join('\n'),
  );
});
