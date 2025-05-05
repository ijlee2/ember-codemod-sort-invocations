import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import { sortAttributes } from '../utils/sort-invocations/index.js';

function updateTemplate(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      if (attributes.length === 0) {
        return;
      }

      node.attributes = attributes.sort(sortAttributes).map((attribute) => {
        const { name, value } = attribute;

        return AST.builders.attr(name, value);
      });
    },
  });

  return AST.print(ast);
}

export function sortInvocations(options: Options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/**/*.hbs', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = updateTemplate(oldFile);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
