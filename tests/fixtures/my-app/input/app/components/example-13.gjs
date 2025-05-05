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
      data-cucumber-button="Submit form"
      {{on "click" @onSubmit}}
      @type="submit"
      @isDisabled={{not this.enableSubmit}}
      class={{local
        styles
        "button"
        (unless this.enableSubmit "disabled")
      }}
      ...attributes
      data-test-button
      @label="Submit form"
      {{autofocus}}
    />

    <UiButton
      data-cucumber-button="Submit form"
      {{on "click" @onSubmit}}
      @type="submit"
      @isDisabled={{not this.enableSubmit}}
      class={{local
        styles
        "button"
        (unless this.enableSubmit "disabled")
      }}
      ...attributes
      data-test-button=""
      {{autofocus}}
    >
      Submit form
    </UiButton>
  </template>
}
