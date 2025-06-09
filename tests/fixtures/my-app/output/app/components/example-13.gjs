import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { not } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';
import autofocus from 'my-app/modifiers/autofocus';
import { UiButton } from 'my-v2-addon';

import styles from './example.css';

export default class ExampleComponent extends Component {
  @tracked enableSubmit = true;

  <template>
    <UiButton
      @isDisabled={{not this.enableSubmit}} @label="Submit form" @type="submit" class={{local
        styles
        "button"
        (unless this.enableSubmit "disabled")
      }} data-cucumber-button="Submit form" data-test-button {{autofocus}} {{on "click" @onSubmit}} ...attributes
    />

    <UiButton
      @isDisabled={{not this.enableSubmit}} @type="submit" class={{local
        styles
        "button"
        (unless this.enableSubmit "disabled")
      }} data-cucumber-button="Submit form" data-test-button={{""}} {{autofocus}} {{on "click" @onSubmit}} ...attributes
    >
      Submit form
    </UiButton>
  </template>
}
