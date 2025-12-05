import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > canSkip returns false (1)', function () {
  const file = normalizeFile([
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `  {{autofocus}}`,
    `  {{on "click" @onSubmit}}`,
    `/>`,
  ]);

  assert.strictEqual(canSkip(file), false);
});
