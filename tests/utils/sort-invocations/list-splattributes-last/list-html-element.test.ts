import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > base case (HTML element)', function () {
  let file = normalizeFile([
    `<iframe`,
    `  class="full-screen"`,
    `  data-test-id="my-iframe"`,
    `  id={{@id}}`,
    `  src={{this.url}}`,
    `  ...attributes`,
    `  {{did-insert this.doSomething1}}`,
    `  {{on "load" this.doSomething2}}`,
    `></iframe>`,
  ]);

  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<iframe`,
      `  class="full-screen"`,
      `  data-test-id="my-iframe"`,
      `  id={{@id}}`,
      `  src={{this.url}} {{did-insert this.doSomething1}}`,
      `  {{on "load" this.doSomething2}}`,
      `...attributes`,
      `></iframe>`,
    ]),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    normalizeFile([
      `<iframe`,
      `  class="full-screen"`,
      `  data-test-id="my-iframe"`,
      `  id={{@id}}`,
      `  src={{this.url}} {{did-insert this.doSomething1}}`,
      `  {{on "load" this.doSomething2}} ...attributes`,
      `></iframe>`,
    ]),
  );
});
