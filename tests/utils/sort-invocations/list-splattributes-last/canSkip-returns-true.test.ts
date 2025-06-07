import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > canSkip returns true', function () {
  const file = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  {{autofocus}}`,
    `  {{on "click" @onSubmit}}`,
    `  ...attributes`,
    `/>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), true);
});
