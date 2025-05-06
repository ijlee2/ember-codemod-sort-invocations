import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import { parse, replaceTemplate } from '../utils/ast/template-tag.js';
import {
  canSkipSortAttributes,
  canSkipSortHash,
  canSkipSortModifiers,
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
      let isSorted = false;

      if (!canSkipSortAttributes(attributes)) {
        node.attributes = sortAttributes(attributes);
        isSorted = true;
      }

      if (!canSkipSortModifiers(modifiers)) {
        node.modifiers = sortModifiers(modifiers);
        isSorted = true;
      }

      if (!isSorted) {
        return;
      }

      const lastAttribute = node.attributes.at(-1)!;
      const hasSplattributes = lastAttribute.name === '...attributes';

      if (!hasSplattributes) {
        return;
      }

      // The originally last attribute's location has the highest line number
      const lineNumber = attributes.at(-1)!.loc.start.line;

      node.attributes.splice(
        -1,
        1,
        AST.builders.attr('...attributes', AST.builders.text(''), {
          start: {
            column: 0,
            line: lineNumber + node.modifiers.length + 1,
          },
          end: {
            column: '...attributes'.length,
            line: lineNumber + node.modifiers.length + 1,
          },
        }),
      );

      node.modifiers = node.modifiers.map((modifier) => {
        const { hash, loc, params, path } = modifier;

        return AST.builders.elementModifier(path, params, hash, {
          start: {
            column: loc.start.column,
            line: loc.start.line - 1,
          },
          end: {
            column: loc.end.column,
            line: loc.end.line - 1,
          },
        });
      });
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
      const contentTags = parse(newFile);

      contentTags.reverse().forEach((contentTag) => {
        const contents = updateTemplate(contentTag.contents);

        newFile = replaceTemplate(newFile, {
          contents,
          range: contentTag.range,
        });
      });
    }

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
