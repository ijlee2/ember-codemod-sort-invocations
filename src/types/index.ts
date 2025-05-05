type CodemodOptions = {
  projectRoot: string;
  projectType: 'app' | 'v1-addon' | 'v2-addon';
};

type Options = {
  projectRoot: string;
  src: string[];
};

export type { CodemodOptions, Options };
