import { AST } from '@codemod-utils/ast-template';

type ElementNode = ReturnType<typeof AST.builders.element>;

export function canSkipListSplattributesLast(node: ElementNode): boolean {
  const { attributes, modifiers } = node;
  const splattributes = attributes.at(-1);

  if (splattributes?.name !== '...attributes') {
    return true;
  }

  // Check that ...attributes appears after modifiers
  const splattributesPosition = splattributes.loc.start;

  return modifiers.every((modifier) => {
    const modifierPosition = modifier.loc.start;

    if (splattributesPosition.line > modifierPosition.line) {
      return true;
    }

    return splattributesPosition.column > modifierPosition.column;
  });
}

export function listSplattributesLast(node: ElementNode) {
  // eslint-disable-next-line prefer-const
  let { attributes, modifiers } = node;
  const splattributes = attributes.at(-1)!;

  // Assign each modifier the location of its predecessor
  let start = splattributes.loc.start;

  modifiers = modifiers.map((modifier) => {
    const { hash, loc, params, path } = modifier;

    const newLocation = {
      start,
      end: {
        column: start.column + (loc.end.column - loc.start.column),
        line: start.line + (loc.end.line - loc.start.line) + 1,
      },
    };

    start = newLocation.end;

    return AST.builders.elementModifier(path, params, hash, newLocation);
  });

  // Assign ...attributes the original location of the last modifier
  attributes.splice(
    -1,
    1,
    AST.builders.attr('...attributes', AST.builders.text(''), {
      start,
      end: {
        column: start.column + '...attributes'.length,
        line: start.line,
      },
    }),
  );

  return {
    attributes,
    modifiers,
  };
}
