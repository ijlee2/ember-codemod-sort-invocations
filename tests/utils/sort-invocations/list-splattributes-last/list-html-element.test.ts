import { assert, test } from '@codemod-utils/tests';

import { updateFile } from '../../../helpers/utils/sort-invocations/list-splattributes-last.js';

test('utils | sort-invocations | list-splattributes-last > base case (HTML element)', function () {
  let file = [
    `<iframe`,
    `  class="full-screen"`,
    `  data-test-id="my-iframe"`,
    `  id={{@id}}`,
    `  src={{this.url}}`,
    `  ...attributes`,
    `  {{did-insert this.doSomething1}}`,
    `  {{on "load" this.doSomething2}}`,
    `></iframe>`,
  ].join('\n');

  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<iframe`,
      `  class="full-screen"`,
      `  data-test-id="my-iframe"`,
      `  id={{@id}}`,
      `  src={{this.url}} {{did-insert this.doSomething1}}`,
      `  {{on "load" this.doSomething2}}`,
      `...attributes`,
      `></iframe>`,
    ].join('\n'),
  );

  // Check idempotency
  file = updateFile(file);

  assert.strictEqual(
    file,
    [
      `<iframe`,
      `  class="full-screen"`,
      `  data-test-id="my-iframe"`,
      `  id={{@id}}`,
      `  src={{this.url}} {{did-insert this.doSomething1}}`,
      `  {{on "load" this.doSomething2}} ...attributes`,
      `></iframe>`,
    ].join('\n'),
  );
});
