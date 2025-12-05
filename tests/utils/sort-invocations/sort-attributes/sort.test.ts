import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > sort', function () {
  let file = normalizeFile([
    `<Ui::Button`,
    `  {{on "click" this.doSomething}}`,
    `  @type="submit"`,
    `  ...attributes`,
    `  data-test-button`,
    `  @label="Submit form"`,
    `/>`,
  ]);

  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<Ui::Button`,
      `  @label="Submit form" @type="submit" data-test-button ...attributes {{on "click" this.doSomething}}`,
      `/>`,
    ]),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<Ui::Button`,
      `  @label="Submit form" @type="submit" data-test-button ...attributes {{on "click" this.doSomething}}`,
      `/>`,
    ]),
  );
});
