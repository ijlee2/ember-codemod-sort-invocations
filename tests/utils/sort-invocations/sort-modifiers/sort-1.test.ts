import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > sort (1)', function () {
  let file = [
    `<button`,
    `  {{on "click" @onSubmit}}`,
    `  {{autofocus}}`,
    `>`,
    `  Submit form`,
    `</button>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<button`,
      `  {{autofocus}} {{on "click" @onSubmit}}`,
      `>`,
      `  Submit form`,
      `</button>`,
    ].join('\n'),
  );
});
