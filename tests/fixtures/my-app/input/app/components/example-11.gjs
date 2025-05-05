import { on } from '@ember/modifier';
import { UiButton } from 'my-v2-addon';

const ExampleComponent = <template>
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
