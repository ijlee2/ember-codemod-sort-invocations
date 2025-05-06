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
    @label="Submit form" @type="submit" data-test-button {{on "click" @onSubmit}} ...attributes
  />

  <UiButton
    @type="submit" data-test-button {{on "click" @onSubmit}} ...attributes
  >
    Submit form
  </UiButton>
</template>;

export default ExampleComponent;
