import type { AST } from '@codemod-utils/ast-template';

type Attribute = ReturnType<typeof AST.builders.attr>;

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

export function sortAttributes(a: Attribute, b: Attribute): number {
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
