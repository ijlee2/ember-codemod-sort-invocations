import Component from '@glimmer/component';

import styles from './example.css';

export default class RouteExample extends Component {
  get someGetter() {
    return '😀😀😀Hello world!🎉🎉🎉';
  }

  <template>
    <div
      class={{local styles "message" "highlight"}} data-test-field="😀😀route🎉🎉"
    >
      {{@model.message}}
    </div>

    <div class={{styles.message}} data-test-field="controller">
      😀 - {{@controller.someField}} - 🎉!
    </div>

    <div data-test-field="component">
      {{this.someGetter}}
    </div>
  </template>
}
