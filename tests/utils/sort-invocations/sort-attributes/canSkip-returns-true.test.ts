import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > canSkip returns true', function () {
  const file = normalizeFile([
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `  {{on "click" this.doSomething}}`,
    `/>`,
  ]);

  assert.strictEqual(canSkip(file), true);
});
