import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > canSkip returns true (no splattributes)', function () {
  const file = normalizeFile([
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  {{autofocus}}`,
    `  {{on "click" @onSubmit}}`,
    `/>`,
  ]);

  assert.strictEqual(canSkip(file), true);
});
