import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(projectType: CodemodOptions['projectType']): string[] {
  switch (projectType) {
    case 'app': {
      return ['app/**/*.{gjs,gts,hbs}'];
    }

    case 'v1-addon': {
      return ['addon/**/*.{gjs,gts,hbs}'];
    }

    case 'v2-addon': {
      return ['src/**/*.{gjs,gts,hbs}'];
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
