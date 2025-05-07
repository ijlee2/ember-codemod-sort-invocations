import { AST } from '@codemod-utils/ast-template';

type Attribute = ReturnType<typeof AST.builders.attr>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type TextNode = ReturnType<typeof AST.builders.text>;

function cloneIfTextNode(
  node: MustacheStatement | TextNode,
): MustacheStatement | TextNode {
  if (node.type === 'MustacheStatement') {
    return node;
  }

  return AST.builders.text(node.chars);
}

function getName(node: Attribute): string {
  return node.name;
}

function getPosition(node: Attribute): number {
  const name = getName(node);

  if (name.startsWith('@')) {
    return 1;
  }

  if (name === '...attributes') {
    return 3;
  }

  return 2;
}

function compareAttributes(a: Attribute, b: Attribute): number {
  const positionA = getPosition(a);
  const positionB = getPosition(b);

  if (positionA > positionB) {
    return 1;
  }

  if (positionB > positionA) {
    return -1;
  }

  const nameA = getName(a);
  const nameB = getName(b);

  if (nameA > nameB) {
    return 1;
  }

  if (nameB > nameA) {
    return -1;
  }

  return 0;
}

export function canSkipSortAttributes(attributes: Attribute[]): boolean {
  let canSkip = true;

  for (let i = 0; i < attributes.length - 1; i++) {
    if (compareAttributes(attributes[i]!, attributes[i + 1]!) === 1) {
      canSkip = false;

      break;
    }
  }

  return canSkip;
}

export function sortAttributes(attributes: Attribute[]): Attribute[] {
  return attributes.sort(compareAttributes).map((attribute) => {
    const { name, value } = attribute;

    switch (value.type) {
      case 'ConcatStatement': {
        // Bug in ember-template-recast@6.1.5 (it removes the single character before or after a MustacheStatement)
        const parts = value.parts.map(cloneIfTextNode);

        return AST.builders.attr(name, AST.builders.concat(parts));
      }

      case 'TextNode': {
        // Bug in ember-template-recast@6.1.5 (it removes values that are an empty string)
        if (value.chars === '') {
          const { start, end } = value.loc;

          const isValueUndefined =
            start.line === end.line && start.column === end.column;

          if (!isValueUndefined) {
            return AST.builders.attr(
              name,
              AST.builders.mustache(AST.builders.string('')),
            );
          }
        }

        break;
      }
    }

    return AST.builders.attr(name, value);
  });
}
