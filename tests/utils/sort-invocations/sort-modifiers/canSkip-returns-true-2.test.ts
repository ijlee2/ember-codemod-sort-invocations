import { assert, test } from '@codemod-utils/tests';

import { canSkip } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > canSkip returns true (2)', function () {
  const file = [
    `<div`,
    `  {{on "click" this.submitForm}}`,
    `  {{on "click" this.trackEvent}}`,
    `  {{on "mouseenter" (fn this.setFocus true)}}`,
    `  {{on "mouseleave" (fn this.setFocus false)}}`,
    `>`,
    `  Submit form`,
    `</div>`,
  ].join('\n');

  assert.strictEqual(canSkip(file), true);
});
