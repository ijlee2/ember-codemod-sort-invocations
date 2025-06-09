import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns false (2)', function () {
  const file = [
    `<div`,
    `  {{on "mouseleave" (fn this.setFocus false)}}`,
    `  {{on "click" this.trackEvent}}`,
    `  {{on "mouseenter" (fn this.setFocus true)}}`,
    `  {{on "click" this.submitForm}}`,
    `>`,
    `  Submit form`,
    `</div>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), false);
});
