[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml)

# ember-codemod-sort-invocations

_Codemod to sort invocations in templates_

1. [Features](#features)
1. [Examples](#examples)
1. [Usage](#usage)
    - [Arguments](#arguments)
    - [Limitations](#limitations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)

> [!TIP]
>
> You can use [`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint/blob/v7.7.0-ember-template-lint/docs/rule/sort-invocations.md) to integrate sorting into CI.
>
> ```js
> /* .template-lintrc.js */
> module.exports = {
>   extends: ['recommended'],
>   rules: {
>     'sort-invocations': true,
>   },
> };
> ```


## Features

The codemod helps you standardize templates:

- Component invocations
- Helper invocations
- Modifier invocations

By sorting things that are order-independent, you can more easily refactor code. In addition, sorting removes style differences, so you can review another person's code more effectively.


## Examples

### Components

The codemod lists things in the following order:

1. Arguments
2. Attributes
3. Modifiers
4. Splattributes

The order clearly shows how the component is customized more and more. Things are alphabetized within each group.

```hbs
<Ui::Button
  @label="Submit form"
  @type="submit"
  data-test-button
  {{on "click" this.doSomething}}
  ...attributes
/>
```

> [!NOTE]
>
> In rare cases, the order of [`...attributes`](https://guides.emberjs.com/release/components/component-arguments-and-html-attributes/#toc_html-attributes) can matter. Similarly, the order can matter when an [ARIA attribute has multiple values](https://github.com/ijlee2/ember-container-query/issues/38#issuecomment-647017665).


### Helpers

The codemod lists the named arguments in alphabetical order.

```hbs
{{t
  "my-component.description"
  installedOn=this.installationDate
  packageName="ember-source"
  packageVersion="6.0.0"
}}
```


### Modifiers

Similarly for helpers, the codemod lists the named arguments in alphabetical order.


## Usage

Step 1. Run codemod.

```sh
cd <path/to/your/project>
npx ember-codemod-sort-invocations <arguments>
```

Step 2. Fix formatting. You can use `prettier`, [`prettier-plugin-ember-hbs-tag`](https://github.com/ijlee2/prettier-plugin-ember-hbs-tag), and [`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag) to format templates in `*.hbs`, `hbs` tags, and `<template>` tags, respectively.

```sh
pnpm lint:fix
```


### Arguments

You must pass `--type` to indicate what type of project you have.

```sh
npx ember-codemod-sort-invocations --type app
npx ember-codemod-sort-invocations --type v1-addon
npx ember-codemod-sort-invocations --type v2-addon
```

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-sort-invocations --root <path/to/your/project>
```

</details>


### Limitations

It's intended that there are no options for sorting. Alphabetical sort is the simplest for everyone to understand and to apply across different projects. It's also the easiest to maintain.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-sort-invocations.js --root <path/to/your/project>
```


## Known issues

1\. If you passed an empty string as an argument's value, it has been replaced with `{{""}}`. Let [`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-unnecessary-curly-strings.md) fix the formatting change, or do a find-and-replace-all to restore the value.

```diff
- <MyComponent @description={{""}} />
+ <MyComponent @description="" />
```

2\. Comments such as `{{! @glint-expect-error }}` may have shifted. Move them to the correct location.


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
