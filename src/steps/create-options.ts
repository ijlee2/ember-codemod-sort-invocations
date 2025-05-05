import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(projectType: CodemodOptions['projectType']): string[] {
  switch (projectType) {
    case 'app': {
      return ['app/**/*.hbs'];
    }

    case 'v1-addon': {
      return ['addon/**/*.hbs'];
    }

    case 'v2-addon': {
      return ['src/**/*.hbs'];
    }
  }
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot, projectType } = codemodOptions;

  return {
    projectRoot,
    src: getSrc(projectType),
  };
}
