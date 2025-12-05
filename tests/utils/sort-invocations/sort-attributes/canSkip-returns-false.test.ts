import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > canSkip returns false', function () {
  const file = normalizeFile([
    `<Ui::Button`,
    `  {{on "click" this.doSomething}}`,
    `  @type="submit"`,
    `  ...attributes`,
    `  data-test-button`,
    `  @label="Submit form"`,
    `/>`,
  ]);

  assert.strictEqual(canSkip(file), false);
});
