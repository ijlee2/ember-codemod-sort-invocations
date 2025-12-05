import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/sort-modifiers.js';

test('utils | sort-invocations | sort-modifiers > sort (1)', function () {
  let file = normalizeFile([
    `<button`,
    `  {{on "click" @onSubmit}}`,
    `  {{autofocus}}`,
    `>`,
    `  Submit form`,
    `</button>`,
  ]);

  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<button`,
      `  {{autofocus}} {{on "click" @onSubmit}}`,
      `>`,
      `  Submit form`,
      `</button>`,
    ]),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<button`,
      `  {{autofocus}} {{on "click" @onSubmit}}`,
      `>`,
      `  Submit form`,
      `</button>`,
    ]),
  );
});
