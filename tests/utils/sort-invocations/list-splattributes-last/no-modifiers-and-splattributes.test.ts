import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > no modifiers and splattributes', function () {
  let file = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `/>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<Ui::Button`,
      `  @label="Submit form"`,
      `  @type="submit"`,
      `  data-test-button`,
      `/>`,
    ].join('\n'),
  );
});
