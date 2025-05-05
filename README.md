[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-sort-invocations/actions/workflows/ci.yml)

# ember-codemod-sort-invocations

_Codemod to sort invocations in templates_


## Usage

### Arguments

[PROVIDE REQUIRED AND OPTIONAL ARGUMENTS.]

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
