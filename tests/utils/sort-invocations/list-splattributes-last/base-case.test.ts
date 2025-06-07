import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > base case', function () {
  let file = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `  {{autofocus}}`,
    `  {{on "click" @onSubmit}}`,
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
      `  {{autofocus}}`,
      `  {{on "click" @onSubmit}} ...attributes`,
      `/>`,
    ].join('\n'),
  );
});
