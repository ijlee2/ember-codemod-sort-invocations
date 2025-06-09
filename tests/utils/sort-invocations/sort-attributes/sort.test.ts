import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > sort', function () {
  let file = [
    `<Ui::Button`,
    `  {{on "click" this.doSomething}}`,
    `  @type="submit"`,
    `  ...attributes`,
    `  data-test-button`,
    `  @label="Submit form"`,
    `/>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<Ui::Button`,
      `  @label="Submit form" @type="submit" data-test-button ...attributes {{on "click" this.doSomething}}`,
      `/>`,
    ].join('\n'),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<Ui::Button`,
      `  @label="Submit form" @type="submit" data-test-button ...attributes {{on "click" this.doSomething}}`,
      `/>`,
    ].join('\n'),
  );
});
