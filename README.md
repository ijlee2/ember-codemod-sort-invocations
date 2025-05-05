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

- Sort arguments, attributes, and modifiers in component invocations
- Sort keys in helper invocations
- Sort keys in modifier invocations

By sorting things that are order-independent, you can more easily refactor code. In addition, sorting removes style differences, so you can review another person's code more effectively.


## Usage

Step 1. Run codemod.

```sh
cd <path/to/your/project>
npx ember-codemod-sort-invocations <arguments>
```

Step 2. Replace all `<EMPTY STRING>`'s with the empty string.

Step 3. Fix formatting issues (with [`ember-template-lint-plugin-prettier`](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier)).

```sh
pnpm lint:hbs:fix
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

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-sort-invocations.js --root <path/to/your/project>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
