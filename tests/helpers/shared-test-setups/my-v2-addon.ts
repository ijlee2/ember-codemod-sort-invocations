import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-v2-addon',
  projectType: 'v2-addon',
};

const options: Options = {
  projectRoot: 'tmp/my-v2-addon',
  src: ['src/**/*.{gjs,gts,hbs}'],
};

export { codemodOptions, options };
