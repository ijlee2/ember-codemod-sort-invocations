import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import {
  sortAttributes,
  sortHashPairs,
  sortModifiers,
} from '../utils/sort-invocations/index.js';

function updateTemplate(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    BlockStatement(node) {
      const { hash, params, path } = node;

      if (hash.pairs.length === 0) {
        return;
      }

      hash.pairs.sort(sortHashPairs);

      node = AST.builders.block(
        path,
        params,
        AST.builders.hash(hash.pairs),
        AST.builders.blockItself(),
      );
    },

    ElementNode(node) {
      const { attributes, modifiers } = node;

      if (attributes.length === 0) {
        return;
      }

      node.attributes = attributes.sort(sortAttributes).map((attribute) => {
        const { name, value } = attribute;

        return AST.builders.attr(name, value);
      });

      node.modifiers = modifiers.sort(sortModifiers).map((modifier) => {
        const { hash, params, path } = modifier;

        return AST.builders.elementModifier(path, params, hash);
      });
    },

    MustacheStatement(node) {
      const { hash } = node;

      if (hash.pairs.length === 0) {
        return;
      }

      hash.pairs.sort(sortHashPairs);

      node.hash = AST.builders.hash(hash.pairs);
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
