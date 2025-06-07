import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-attributes.js';

test('utils | sort-invocations | sort-attributes > canSkip returns true', function () {
  const file = [
    `<Ui::Button`,
    `  @label="Submit form"`,
    `  @type="submit"`,
    `  data-test-button`,
    `  ...attributes`,
    `  {{on "click" this.doSomething}}`,
    `/>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), true);
});
