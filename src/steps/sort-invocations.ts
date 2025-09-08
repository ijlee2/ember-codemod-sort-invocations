import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { updateTemplates } from '@codemod-utils/ast-template-tag';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import {
  canSkipListSplattributesLast,
  canSkipSortAttributes,
  canSkipSortHash,
  canSkipSortModifiers,
  listSplattributesLast,
  sortAttributes,
  sortHash,
  sortModifiers,
} from '../utils/sort-invocations/index.js';

function updateTemplate(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    BlockStatement(node) {
      const { hash, params, path } = node;

      if (canSkipSortHash(hash)) {
        return;
      }

      node = AST.builders.block(
        path,
        params,
        sortHash(hash),
        AST.builders.blockItself(),
      );
    },

    ElementNode(node) {
      const { attributes, modifiers } = node;

      if (!canSkipSortAttributes(attributes)) {
        node.attributes = sortAttributes(attributes);
      }

      if (!canSkipSortModifiers(modifiers)) {
        node.modifiers = sortModifiers(modifiers);
      }

      if (!canSkipListSplattributesLast(node)) {
        const { attributes, modifiers } = listSplattributesLast(node);

        node.attributes = attributes;
        node.modifiers = modifiers;
      }
    },

    MustacheStatement(node) {
      const { hash } = node;

      if (canSkipSortHash(hash)) {
        return;
      }

      node.hash = sortHash(hash);
    },

    SubExpression(node) {
      const { hash, params, path } = node;

      if (canSkipSortHash(hash)) {
        return;
      }

      node = AST.builders.sexpr(path, params, sortHash(hash));
    },
  });

  return AST.print(ast);
}

export function sortInvocations(options: Options) {
  const { projectRoot, src } = options;

  const filePaths = findFiles(src, {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    let newFile = oldFile;

    if (filePath.endsWith('.hbs')) {
      newFile = updateTemplate(newFile);
    } else {
      newFile = updateTemplates(oldFile, updateTemplate);
    }

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
