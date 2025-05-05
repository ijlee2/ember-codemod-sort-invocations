[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml)

# ember-codemod-sort-invocations

_Codemod to sort invocations in templates_

1. [Features](#features)
1. [Usage](#usage)
    - [Arguments](#arguments)
    - [Limitations](#limitations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## Features

The codemod helps you standardize templates:

- Component invocations
- Helper invocations
- Modifier invocations

By sorting things that are order-independent, you can more easily refactor code. In addition, sorting removes style differences, so you can review another person's code more effectively.

> [!NOTE]
>
> For components, the codemod lists arguments, attributes, modifiers, then splattributes. The order clearly shows how the component is customized more and more. Things are alphabetized within each group.
>
> For helpers and modifiers, the codemod lists the named arguments in alphabetical order.


## Usage

Step 1. Run codemod.

```sh
cd <path/to/your/project>
npx ember-codemod-sort-invocations <arguments>
```

Step 2. Fix formatting. You can use [`ember-template-lint-plugin-prettier`](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier) and [`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag) to format `*.hbs` and `*.{gjs,gts}`, respectively.

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

1\. If you passed an empty string as an argument's value, it has been replaced with the placeholder text `<EMPTY STRING>`. Do a find-and-replace-all to restore the value.

```diff
- <MyComponent @description="<EMPTY STRING>" />
+ <MyComponent @description="" />
```

2\. Comments such as `{{! @glint-expect-error }}` may have shifted. Move them to the correct location.

3\. If you passed a concatenated string that has exactly 1 character before or after a "mustache," you will need to add back the missing character.

```diff
<MyComponent
  @isOpen={{this.isOpen}}
-   @parentContainerId="{{@parentId}}"
+   @parentContainerId="#{{@parentId}}"
/>
```

Better yet, use the `{{concat}}` helper instead (this helps codemods).

```hbs
<MyComponent
  @isOpen={{this.isOpen}}
  @parentContainerId={{concat "#" @parentId}}
/>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
