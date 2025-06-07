import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns false (1)', function () {
  const file = [
    `<button`,
    `  {{on "click" @onSubmit}}`,
    `  {{autofocus}}`,
    `>`,
    `  Submit form`,
    `</button>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), false);
});
