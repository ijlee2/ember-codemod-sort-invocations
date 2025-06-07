import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > sort (2)', function () {
  let file = [
    `<div`,
    `  {{on "mouseleave" (fn this.setFocus false)}}`,
    `  {{on "click" this.trackEvent}}`,
    `  {{on "mouseenter" (fn this.setFocus true)}}`,
    `  {{on "click" this.submitForm}}`,
    `>`,
    `  Submit form`,
    `</div>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<div`,
      `  {{on "click" this.trackEvent}} {{on "click" this.submitForm}} {{on "mouseenter" (fn this.setFocus true)}} {{on "mouseleave" (fn this.setFocus false)}}`,
      `>`,
      `  Submit form`,
      `</div>`,
    ].join('\n'),
  );
});
