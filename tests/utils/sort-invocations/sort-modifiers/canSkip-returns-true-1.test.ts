import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns true (1)', function () {
  const file = [
    `<button`,
    `  {{autofocus}}`,
    `  {{on "click" @onSubmit}}`,
    `>`,
    `  Submit form`,
    `</button>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), true);
});
