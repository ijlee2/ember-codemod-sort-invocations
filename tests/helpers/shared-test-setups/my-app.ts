import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-app',
  projectType: 'app',
};

const options: Options = {
  projectRoot: 'tmp/my-app',
  src: ['app/**/*.{gjs,gts,hbs}'],
};

export { codemodOptions, options };
