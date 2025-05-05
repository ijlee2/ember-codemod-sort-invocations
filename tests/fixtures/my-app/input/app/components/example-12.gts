import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { UiButton } from 'my-v2-addon';

interface ExampleSignature {
  Args: {
    onSubmit: () => void;
  };
}

const ExampleComponent: TOC<ExampleSignature> = <template>
  {{! Ideal case }}
  <UiButton
    @label="Submit form"
    @type="submit"
    data-test-button
    {{on "click" this.doSomething}}
    ...attributes
  />

  {{! Angle bracket syntax }}
  <UiButton
    {{on "click" @onSubmit}}
    @type="submit"
    ...attributes
    data-test-button
    @label="Submit form"
  />

  <UiButton
    {{on "click" @onSubmit}}
    @type="submit"
    ...attributes
    data-test-button
  >
    Submit form
  </UiButton>
</template>;

export default ExampleComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Example: typeof ExampleComponent;
    example: typeof ExampleComponent;
  }
}
