import { AST } from '@codemod-utils/ast-template';

type AttrNode = ReturnType<typeof AST.builders.attr>;
type ElementModifierStatement = ReturnType<typeof AST.builders.elementModifier>;
type ElementNode = ReturnType<typeof AST.builders.element>;

export function canSkipListSplattributesLast(node: ElementNode): boolean {
  const { attributes, modifiers } = node;

  const splattributes = attributes.at(-1);
  const lastModifier = modifiers.at(-1);

  if (splattributes?.name !== '...attributes' || !lastModifier) {
    return true;
  }

  // Check that ...attributes appears after the last modifier
  const splattributesPosition = splattributes.loc.start;
  const lastModifierPosition = lastModifier.loc.start;

  if (splattributesPosition.line > lastModifierPosition.line) {
    return true;
  }

  return splattributesPosition.column > lastModifierPosition.column;
}

export function listSplattributesLast(node: ElementNode): {
  attributes: AttrNode[];
  modifiers: ElementModifierStatement[];
} {
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
