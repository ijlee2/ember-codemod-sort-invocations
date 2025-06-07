import { AST } from '@codemod-utils/ast-template';

type ElementNode = ReturnType<typeof AST.builders.element>;

export function canSkipListSplattributesLast(node: ElementNode): boolean {
  const { attributes, modifiers } = node;

  const splattributes = attributes.at(-1);

  if (splattributes?.name !== '...attributes') {
    return true;
  }

  const splattributesPosition = splattributes.loc.start;

  return modifiers.every((modifier) => {
    const modifierPosition = modifier.loc.start;

    if (splattributesPosition.line > modifierPosition.line) {
      return true;
    }

    if (splattributesPosition.column > modifierPosition.column) {
      return true;
    }

    return false;
  });
}

export function listSplattributesLast(node: ElementNode) {
  let { attributes, modifiers } = node;

  const splattributes = attributes.at(-1)!;
  let start = splattributes.loc.start;

  modifiers = modifiers.map((modifier) => {
    const { hash, loc, params, path } = modifier;

    const newLocation = {
      start,
      end: {
        column: start.column + (loc.end.column - loc.start.column) + 1,
        line: start.line + (loc.end.line - loc.start.line) + 1,
      },
    };

    start = newLocation.end;

    return AST.builders.elementModifier(path, params, hash, newLocation);
  });

  attributes.splice(
    -1,
    1,
    AST.builders.attr('...attributes', AST.builders.text(''), {
      start,
      end: {
        column: start.column + '...attributes'.length + 1,
        line: start.line,
      },
    }),
  );

  return {
    attributes,
    modifiers,
  };
}
