import { AST } from '@codemod-utils/ast-template';

type ElementNode = ReturnType<typeof AST.builders.element>;

export function listSplattributesLast(node: ElementNode, lineNumber: number) {
  const lastAttribute = node.attributes.at(-1)!;
  const hasSplattributes = lastAttribute.name === '...attributes';

  if (!hasSplattributes) {
    return;
  }

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
}
